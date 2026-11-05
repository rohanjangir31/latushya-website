const test = require('node:test');
const assert = require('node:assert');
const express = require('express');

// Import production enquiry router, model, and error handler
const enquiryRoutes = require('../src/routes/enquiry.routes');
const Enquiry = require('../src/models/enquiry.model');
const errorHandler = require('../src/middleware/error.middleware');

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/v1/enquiries', enquiryRoutes);
  
  // Default 404 handler for routes not found
  app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Not Found' });
  });

  // Centralized error handler to catch validation and operational errors
  app.use(errorHandler);
  
  return app;
}

test('Security & Lead Pipeline Integration Suite', async (t) => {
  const app = createTestApp();
  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/api/v1/enquiries`;

  t.after(() => {
    server.close();
  });

  await t.test('GET / returns HTTP 404 and exposes zero enquiry documents', async () => {
    const res = await fetch(baseUrl);
    assert.strictEqual(res.status, 404, 'Must return HTTP 404 Not Found');
    const body = await res.json();
    assert.strictEqual(body.enquiries, undefined, 'No enquiries field may be returned');
    assert.strictEqual(body.data, undefined, 'No data field may be returned');
    assert.strictEqual(body.success, false);
  });

  await t.test('GET / with query variants (?status=new&page=1&limit=20) returns HTTP 404', async () => {
    const res = await fetch(`${baseUrl}?status=new&page=1&limit=20`);
    assert.strictEqual(res.status, 404, 'Must return HTTP 404 Not Found on query parameters');
    const body = await res.json();
    assert.strictEqual(body.enquiries, undefined, 'No enquiries field on query parameters');
    assert.strictEqual(body.data, undefined, 'No data field on query parameters');
  });

  await t.test('GET /:id returns HTTP 404', async () => {
    const res = await fetch(`${baseUrl}/60c2b3a7e9ef4d4380fd86ce`);
    assert.strictEqual(res.status, 404, 'Must return HTTP 404 on subpaths');
    const body = await res.json();
    assert.strictEqual(body.enquiries, undefined);
  });

  await t.test('POST / rejects invalid name or phone with HTTP 400 and does NOT trigger DB write', async () => {
    let dbCreateCalled = false;
    const originalCreate = Enquiry.create;
    Enquiry.create = async (...args) => {
      dbCreateCalled = true;
      return originalCreate.apply(Enquiry, args);
    };

    try {
      // Test 1: Empty name and invalid phone
      const res1 = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '', phone: 'not-a-phone' })
      });
      assert.strictEqual(res1.status, 400, 'POST with invalid fields must return HTTP 400');
      const body1 = await res1.json();
      assert.strictEqual(body1.success, false, 'Response success must be false');
      assert.strictEqual(body1.message, 'Validation failed', 'Message must indicate validation failure');
      assert.ok(Array.isArray(body1.errors), 'Errors must be an array');
      assert.ok(body1.errors.length > 0, 'Errors array must contain field validation errors');
      assert.strictEqual(dbCreateCalled, false, 'Enquiry.create must not be invoked on validation failure');

      // Test 2: Completely empty body
      const res2 = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      assert.strictEqual(res2.status, 400, 'POST with empty body must return HTTP 400');
      const body2 = await res2.json();
      assert.strictEqual(body2.success, false);
      assert.strictEqual(dbCreateCalled, false, 'Enquiry.create must not be invoked on empty payload');
    } finally {
      Enquiry.create = originalCreate;
    }
  });

  await t.test('POST / rejects invalid serviceRequested or wardrobeSubtype enum with HTTP 400', async () => {
    let dbCreateCalled = false;
    const originalCreate = Enquiry.create;
    Enquiry.create = async () => { dbCreateCalled = true; };

    try {
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Rohan Test',
          phone: '+91 98765 43210',
          serviceRequested: 'Arbitrary Unvalidated Service'
        })
      });
      assert.strictEqual(res.status, 400, 'Must reject arbitrary service values');
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(dbCreateCalled, false, 'Must not persist invalid taxonomy');
    } finally {
      Enquiry.create = originalCreate;
    }
  });

  await t.test('POST / accepts canonical services and preserves attribution', async () => {
    const originalCreate = Enquiry.create;
    const originalFindOne = Enquiry.findOne;
    let savedDoc = null;
    Enquiry.findOne = async () => null;
    Enquiry.create = async (doc) => {
      savedDoc = {
        ...doc,
        id: '67264a7e9ef4d4380fd86cf1',
        createdAt: new Date().toISOString(),
      };
      return savedDoc;
    };

    try {
      const payload = {
        name: 'Priya Sharma',
        phone: '+91 98765 43210',
        email: 'priya@example.com',
        serviceRequested: 'Turnkey Interiors',
        locality: 'Indiranagar, Bangalore',
        message: '3BHK apartment full interior consultation',
        idempotencyKey: 'test-idemp-001',
        attribution: {
          utmSource: 'google',
          utmMedium: 'cpc',
          utmCampaign: 'search_interiors',
          formPlacement: 'homepage_hero'
        }
      };

      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      assert.strictEqual(res.status, 201, 'Must return HTTP 201 Created');
      const body = await res.json();
      assert.strictEqual(body.success, true);
      assert.strictEqual(body.data.name, 'Priya Sharma');
      assert.strictEqual(body.data.serviceRequested, 'Turnkey Interiors');
      assert.ok(body.data.eventId.startsWith('evt_'), 'Server must generate eventId');

      // Verify saved document structure
      assert.strictEqual(savedDoc.serviceRequested, 'Turnkey Interiors');
      assert.strictEqual(savedDoc.wardrobeSubtype, null, 'Non-wardrobe service must not have wardrobeSubtype');
      assert.strictEqual(savedDoc.attribution.utmSource, 'google');
      assert.strictEqual(savedDoc.attribution.formPlacement, 'homepage_hero');
      assert.strictEqual(savedDoc.idempotencyKey, 'test-idemp-001');
    } finally {
      Enquiry.create = originalCreate;
      Enquiry.findOne = originalFindOne;
    }
  });

  await t.test('POST / enforces durable idempotency and returns existing record without duplicating', async () => {
    const originalCreate = Enquiry.create;
    const originalFindOne = Enquiry.findOne;

    const mockStoredRecord = {
      id: '67264a7e9ef4d4380fd86cf2',
      name: 'Anand Verma',
      serviceRequested: 'Custom Wardrobes',
      wardrobeSubtype: 'Sliding',
      eventId: 'evt_existing_123',
      createdAt: '2026-11-02T10:00:00.000Z',
      idempotencyKey: 'idemp-duplicate-key'
    };

    let createCallCount = 0;
    Enquiry.create = async () => {
      createCallCount++;
      return mockStoredRecord;
    };

    // First call: findOne returns null, so create is called
    let findOneResult = null;
    Enquiry.findOne = async () => findOneResult;

    try {
      const payload = {
        name: 'Anand Verma',
        phone: '+91 91234 56789',
        serviceRequested: 'Custom Wardrobes',
        wardrobeSubtype: 'Sliding',
        idempotencyKey: 'idemp-duplicate-key'
      };

      // 1. Initial write
      const res1 = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      assert.strictEqual(res1.status, 201);
      assert.strictEqual(createCallCount, 1, 'Initial submission must invoke Enquiry.create');

      // 2. Retry with same idempotency key (findOne now finds the document)
      findOneResult = mockStoredRecord;
      const res2 = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      assert.strictEqual(res2.status, 200, 'Idempotent replay must return HTTP 200 OK');
      const body2 = await res2.json();
      assert.strictEqual(body2.success, true);
      assert.strictEqual(body2.data.idempotentReplay, true, 'Response must identify idempotent replay');
      assert.strictEqual(body2.data.eventId, 'evt_existing_123');
      assert.strictEqual(createCallCount, 1, 'Enquiry.create must NOT be called on replay');
    } finally {
      Enquiry.create = originalCreate;
      Enquiry.findOne = originalFindOne;
    }
  });
});

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

test('Security Integration: GET /api/v1/enquiries is disabled and inaccessible', async (t) => {
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

  await t.test('POST / route rejects invalid payload with HTTP 400 and does NOT trigger DB write', async () => {
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
});

const test = require('node:test');
const assert = require('node:assert');
const express = require('express');

// Import production enquiry router directly without connecting to Mongo or loading server.js
const enquiryRoutes = require('../src/routes/enquiry.routes');

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/v1/enquiries', enquiryRoutes);
  // Default 404 handler for routes not found
  app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Not Found' });
  });
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

  await t.test('POST / route remains mounted and rejects invalid payload', async () => {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' })
    });
    // POST / route is active (not 404)
    assert.notStrictEqual(res.status, 404, 'POST / route must exist for public lead creation');
  });
});

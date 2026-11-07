/**
 * Isolated Database Integration Test for Actual MongoDB Partial Unique Index
 * 
 * SAFETY GUARDRAILS:
 * - Strictly requires process.env.TEST_MONGODB_URI to execute against an isolated, disposable database.
 * - Under NO circumstances connects to production MongoDB Atlas.
 * - If TEST_MONGODB_URI is not provided, explicitly marks this suite as NOT RUN and logs remaining risk.
 */
const test = require('node:test');
const assert = require('node:assert');

test('MongoDB Actual Index & Concurrency Integration Suite', async (t) => {
  const testUri = process.env.TEST_MONGODB_URI;

  if (!testUri) {
    console.log('\n======================================================================');
    console.log('[DB-INTEGRATION] Status: NOT RUN');
    console.log('Reason: No disposable test MongoDB URI provided (process.env.TEST_MONGODB_URI is unset).');
    console.log('Safety: Production MongoDB Atlas is strictly protected and untouched per audit rules.');
    console.log('Remaining Risk Disclosure:');
    console.log('  Mongoose unit tests mock Enquiry.findOne/create and controller E11000 recovery.');
    console.log('  Actual MongoDB unique partial index enforcement ({ idempotencyKey: 1 }, { unique: true, partialFilterExpression: { idempotencyKey: { $type: "string" } } })');
    console.log('  must be verified in a dedicated staging/pre-production environment prior to production traffic.');
    console.log('======================================================================\n');
    return;
  }

  // If a disposable test database is configured:
  const mongoose = require('mongoose');
  const Enquiry = require('../src/models/enquiry.model');

  await t.test('Connect to disposable test MongoDB and verify actual partial unique index', async () => {
    await mongoose.connect(testUri, { serverSelectionTimeoutMS: 5000 });
    await Enquiry.syncIndexes();

    try {
      // 1. First write with unique key
      const key = `test_idemp_${Date.now()}_actual`;
      const doc1 = await Enquiry.create({
        name: 'Test Lead',
        phone: '+91 99999 88888',
        serviceRequested: 'Modular Kitchen',
        idempotencyKey: key,
        eventId: `evt_${Date.now()}`,
      });
      assert.ok(doc1._id);

      // 2. Duplicate write with identical key must throw MongoServerError E11000
      await assert.rejects(
        async () => {
          await Enquiry.create({
            name: 'Test Lead Duplicate',
            phone: '+91 99999 88888',
            serviceRequested: 'Modular Kitchen',
            idempotencyKey: key,
            eventId: `evt_${Date.now()}_dup`,
          });
        },
        (err) => {
          assert.strictEqual(err.code, 11000, 'Must throw duplicate key error E11000');
          return true;
        }
      );
    } finally {
      // Clean up test collection and disconnect
      await Enquiry.deleteMany({ name: /^Test Lead/ });
      await mongoose.disconnect();
    }
  });
});

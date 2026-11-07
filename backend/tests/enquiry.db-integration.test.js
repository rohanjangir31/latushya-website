/**
 * Isolated Database Integration Test for Actual MongoDB Partial Unique Index
 * 
 * SAFETY GUARDRAILS:
 * - Strictly requires process.env.TEST_MONGODB_URI to execute against an isolated, disposable database.
 * - Under NO circumstances connects to production MongoDB Atlas.
 * - Hard safety gate verifies DB name has an explicit test suffix (_test / _integration_test)
 *   and is not a production database name.
 * - If TEST_MONGODB_URI is not provided or fails safety validation, explicitly marks this suite as NOT RUN and logs remaining risk.
 * - Logs only sanitized metadata (host, db name), never URI credentials.
 * - Non-destructive index inspection: avoids syncIndexes() which could drop indexes.
 * - Targeted cleanup: tracks exact document IDs and keys created during test; never drops indexes or broad prefixes.
 */
const test = require('node:test');
const assert = require('node:assert');
const express = require('express');

/**
 * Validates that the provided MongoDB URI points strictly to a disposable test database.
 * @param {string|undefined} uri 
 * @returns {{ valid: boolean, reason?: string, safeHost?: string, dbName?: string }}
 */
function validateDisposableTestUri(uri) {
  if (!uri || typeof uri !== 'string' || !uri.trim()) {
    return {
      valid: false,
      reason: 'No disposable test MongoDB URI provided (process.env.TEST_MONGODB_URI is unset).',
    };
  }

  let parsedUrl;
  try {
    const normalized = uri.trim().replace(/^mongodb(\+srv)?:\/\//, 'http://');
    parsedUrl = new URL(normalized);
  } catch (err) {
    return {
      valid: false,
      reason: `Failed to parse TEST_MONGODB_URI: ${err.message}`,
    };
  }

  const rawPath = parsedUrl.pathname || '';
  const dbName = rawPath.replace(/^\//, '').split('?')[0].trim();

  if (!dbName) {
    return {
      valid: false,
      reason: 'TEST_MONGODB_URI must specify an explicit database name in its path (e.g., /latushya_integration_test).',
    };
  }

  // Reject known production or reserved database names
  const FORBIDDEN_DB_NAMES = [
    'production',
    'prod',
    'latushya',
    'latushya-prod',
    'latushya-production',
    'latushya_production',
    'main',
    'live',
    'admin',
    'config',
    'local',
  ];

  if (FORBIDDEN_DB_NAMES.includes(dbName.toLowerCase())) {
    return {
      valid: false,
      reason: `Database name "${dbName}" matches a production or reserved name. Refusing to connect for test safety.`,
    };
  }

  // Enforce strict test naming pattern
  const TEST_DB_REGEX = /^([a-zA-Z0-9_-]+_test|[a-zA-Z0-9_-]+_integration_test|latushya_test)$/i;
  if (!TEST_DB_REGEX.test(dbName)) {
    return {
      valid: false,
      reason: `Database name "${dbName}" does not match required test database pattern (*_test, *_integration_test, latushya_test). Refusing to connect.`,
    };
  }

  // Reject production-like host names
  const hostname = (parsedUrl.hostname || '').toLowerCase();
  if (hostname.includes('production') || hostname.includes('prod-')) {
    return {
      valid: false,
      reason: `Host "${hostname}" matches production keyword patterns. Refusing to connect.`,
    };
  }

  return {
    valid: true,
    safeHost: parsedUrl.hostname,
    dbName,
  };
}

// ─────────────────────────────────────────────────────────────
// Suite 1: Safety Gate Unit Verification (Always Executes)
// ─────────────────────────────────────────────────────────────
test('Safety Gate: validateDisposableTestUri verification', async (t) => {
  await t.test('rejects empty, undefined, or whitespace-only URI', () => {
    assert.strictEqual(validateDisposableTestUri(undefined).valid, false);
    assert.strictEqual(validateDisposableTestUri('').valid, false);
    assert.strictEqual(validateDisposableTestUri('   ').valid, false);
  });

  await t.test('rejects production database names regardless of host', () => {
    const res1 = validateDisposableTestUri('mongodb://localhost:27017/production');
    assert.strictEqual(res1.valid, false);
    assert.match(res1.reason, /matches a production or reserved name/);

    const res2 = validateDisposableTestUri('mongodb://localhost:27017/latushya');
    assert.strictEqual(res2.valid, false);

    const res3 = validateDisposableTestUri('mongodb+srv://user:pass@cluster.mongodb.net/latushya_production');
    assert.strictEqual(res3.valid, false);
  });

  await t.test('rejects databases lacking explicit test pattern suffix', () => {
    const res = validateDisposableTestUri('mongodb://localhost:27017/my_app_db');
    assert.strictEqual(res.valid, false);
    assert.match(res.reason, /does not match required test database pattern/);
  });

  await t.test('rejects hosts containing production keywords', () => {
    const res = validateDisposableTestUri('mongodb://production-cluster.internal:27017/sample_test');
    assert.strictEqual(res.valid, false);
    assert.match(res.reason, /matches production keyword patterns/);
  });

  await t.test('accepts valid disposable test databases and sanitizes metadata', () => {
    const res = validateDisposableTestUri('mongodb+srv://admin_user:secret_password@cluster0.abcde.mongodb.net/latushya_integration_test?retryWrites=true&w=majority');
    assert.strictEqual(res.valid, true);
    assert.strictEqual(res.dbName, 'latushya_integration_test');
    assert.strictEqual(res.safeHost, 'cluster0.abcde.mongodb.net');
    // Ensure credentials are NOT leaked in returned metadata
    assert.strictEqual(res.safeHost.includes('secret_password'), false);
    assert.strictEqual(res.safeHost.includes('admin_user'), false);
  });
});

// ─────────────────────────────────────────────────────────────
// Suite 2: Actual MongoDB Partial Unique Index & Concurrency Suite
// (Only runs if a safe, verified disposable test DB is provided)
// ─────────────────────────────────────────────────────────────
test('MongoDB Actual Index & Concurrency Integration Suite', async (t) => {
  const validation = validateDisposableTestUri(process.env.TEST_MONGODB_URI);

  if (!validation.valid) {
    console.log('\n======================================================================');
    console.log('[DB-INTEGRATION] Status: NOT RUN');
    console.log(`Reason: ${validation.reason}`);
    console.log('Safety: Production MongoDB Atlas is strictly protected and untouched per audit rules.');
    console.log('Remaining Risk Disclosure:');
    console.log('  Mongoose unit tests mock Enquiry.findOne/create and controller E11000 recovery.');
    console.log('  Actual MongoDB unique partial index enforcement ({ idempotencyKey: 1 }, { unique: true, partialFilterExpression: { idempotencyKey: { $type: "string" } } })');
    console.log('  must be verified in a dedicated staging/pre-production environment prior to production traffic.');
    console.log('======================================================================\n');
    return;
  }

  // Safe disposable test database is verified
  console.log(`\n[DB-INTEGRATION] Connecting to verified disposable database: host=${validation.safeHost}, db=${validation.dbName}`);

  const mongoose = require('mongoose');
  const Enquiry = require('../src/models/enquiry.model');
  const enquiryRoutes = require('../src/routes/enquiry.routes');
  const errorHandler = require('../src/middleware/error.middleware');

  await mongoose.connect(process.env.TEST_MONGODB_URI, { serverSelectionTimeoutMS: 5000 });

  // Non-destructive index setup: DO NOT use syncIndexes() which drops non-schema indexes.
  // Instead, ensure the specific partial unique index exists and inspect listIndexes.
  await Enquiry.collection.createIndex(
    { idempotencyKey: 1 },
    {
      unique: true,
      partialFilterExpression: { idempotencyKey: { $type: 'string' } },
      name: 'idempotencyKey_1_partial_unique',
    }
  );

  const indexes = await Enquiry.collection.listIndexes().toArray();
  const partialIndex = indexes.find(
    (idx) => idx.key && idx.key.idempotencyKey === 1 && idx.unique === true
  );
  assert.ok(partialIndex, 'Partial unique index on idempotencyKey must exist on collection');
  assert.deepStrictEqual(
    partialIndex.partialFilterExpression,
    { idempotencyKey: { $type: 'string' } },
    'Index must have partialFilterExpression matching { idempotencyKey: { $type: "string" } }'
  );

  // Track exact documents created by this test run for targeted cleanup
  const createdDocIds = [];

  try {
    // ── Subtest A: Sequential duplicate creation throws MongoServerError E11000
    await t.test('Sequential duplicate idempotencyKey throws E11000 from MongoDB engine', async () => {
      const key = `test_idemp_${Date.now()}_seq`;
      const doc1 = await Enquiry.create({
        name: 'Test Lead Sequential',
        phone: '+91 99999 88881',
        serviceRequested: 'Modular Kitchen',
        idempotencyKey: key,
        eventId: `evt_${Date.now()}_seq1`,
      });
      assert.ok(doc1._id);
      createdDocIds.push(doc1._id);

      await assert.rejects(
        async () => {
          await Enquiry.create({
            name: 'Test Lead Sequential Duplicate',
            phone: '+91 99999 88881',
            serviceRequested: 'Modular Kitchen',
            idempotencyKey: key,
            eventId: `evt_${Date.now()}_seq2`,
          });
        },
        (err) => {
          assert.strictEqual(err.code, 11000, 'Must throw duplicate key error E11000');
          return true;
        }
      );
    });

    // ── Subtest B: True concurrent write race on the same key with Promise.allSettled
    await t.test('Concurrent writes racing on identical key: exactly one succeeds and one receives E11000', async () => {
      const concurrentKey = `test_idemp_${Date.now()}_race`;

      const write1 = Enquiry.create({
        name: 'Concurrent Lead A',
        phone: '+91 99999 88882',
        serviceRequested: 'Custom Wardrobes',
        wardrobeSubtype: 'Walk-In Wardrobe',
        idempotencyKey: concurrentKey,
        eventId: `evt_${Date.now()}_race_a`,
      });

      const write2 = Enquiry.create({
        name: 'Concurrent Lead B',
        phone: '+91 99999 88883',
        serviceRequested: 'Custom Wardrobes',
        wardrobeSubtype: 'Walk-In Wardrobe',
        idempotencyKey: concurrentKey,
        eventId: `evt_${Date.now()}_race_b`,
      });

      const results = await Promise.allSettled([write1, write2]);
      const fulfilled = results.filter((r) => r.status === 'fulfilled');
      const rejected = results.filter((r) => r.status === 'rejected');

      assert.strictEqual(fulfilled.length, 1, 'Exactly one concurrent insert must succeed');
      assert.strictEqual(rejected.length, 1, 'Exactly one concurrent insert must be rejected');
      assert.strictEqual(rejected[0].reason.code, 11000, 'Rejected insert must have MongoServerError code 11000');

      createdDocIds.push(fulfilled[0].value._id);

      // Verify database contains exactly 1 document for this key
      const docCount = await Enquiry.countDocuments({ idempotencyKey: concurrentKey });
      assert.strictEqual(docCount, 1, 'Collection must have exactly one document for raced key');
    });

    // ── Subtest C: Controller Duplicate Recovery on Racing HTTP Requests
    await t.test('Concurrent HTTP requests to controller: both return HTTP 2xx with matching eventId and graceful idempotentReplay', async () => {
      const app = express();
      app.use(express.json());
      app.use('/api/v1/enquiries', enquiryRoutes);
      app.use(errorHandler);

      const server = await new Promise((resolve) => {
        const s = app.listen(0, () => resolve(s));
      });
      const port = server.address().port;
      const baseUrl = `http://127.0.0.1:${port}/api/v1/enquiries`;

      try {
        const controllerRaceKey = `test_idemp_${Date.now()}_ctrl_race`;

        const req1 = fetch(baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Racing Controller Client 1',
            phone: '+91 99999 88884',
            serviceRequested: 'Turnkey Interiors',
            idempotencyKey: controllerRaceKey,
          }),
        });

        const req2 = fetch(baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Racing Controller Client 2',
            phone: '+91 99999 88884',
            serviceRequested: 'Turnkey Interiors',
            idempotencyKey: controllerRaceKey,
          }),
        });

        const [res1, res2] = await Promise.all([req1, req2]);
        assert.ok([200, 201].includes(res1.status), 'Request 1 must succeed with 200 or 201');
        assert.ok([200, 201].includes(res2.status), 'Request 2 must succeed with 200 or 201');

        const [body1, body2] = await Promise.all([res1.json(), res2.json()]);
        assert.strictEqual(body1.success, true);
        assert.strictEqual(body2.success, true);

        // Both clients must receive the exact same eventId and record ID
        assert.strictEqual(body1.data.eventId, body2.data.eventId, 'Both racing requests must share the same server eventId');
        assert.strictEqual(body1.data.id, body2.data.id, 'Both racing requests must reference the same persisted record ID');

        // One request created the record (201), the other safely recovered via idempotentReplay (200)
        const replayFlags = [body1.data.idempotentReplay, body2.data.idempotentReplay];
        assert.ok(replayFlags.includes(true), 'At least one response must be marked as idempotentReplay');

        createdDocIds.push(body1.data.id);

        const countInDb = await Enquiry.countDocuments({ idempotencyKey: controllerRaceKey });
        assert.strictEqual(countInDb, 1, 'Only one record may exist in MongoDB after concurrent controller requests');
      } finally {
        server.close();
      }
    });
  } finally {
    // Targeted cleanup of documents inserted by this test run
    if (createdDocIds.length > 0) {
      await Enquiry.collection.deleteMany({ _id: { $in: createdDocIds } });
    }
    await mongoose.disconnect();
  }
});

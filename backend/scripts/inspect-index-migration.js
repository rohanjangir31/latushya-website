/**
 * Read-Only Index Migration Inspection Script
 * 
 * Inspects the 'enquiries' collection indexes on a target MongoDB database
 * to verify the status of the 'idempotencyKey' index.
 * 
 * SAFETY:
 * - Strictly READ-ONLY: Never drops, creates, or alters any index or data.
 * - Sanitizes connection string: Never prints credentials to stdout.
 * 
 * Usage:
 *   MONGODB_URI="<connection-string>" node backend/scripts/inspect-index-migration.js
 */
const mongoose = require('mongoose');

async function main() {
  const uri = process.env.MONGODB_URI || process.env.TEST_MONGODB_URI;

  if (!uri) {
    console.error('Error: MONGODB_URI or TEST_MONGODB_URI environment variable is required.');
    console.error('Usage: MONGODB_URI="<connection-string>" node backend/scripts/inspect-index-migration.js');
    process.exit(1);
  }

  let safeHost = 'unknown';
  let safeDb = 'unknown';
  try {
    const normalized = uri.replace(/^mongodb(\+srv)?:\/\//, 'http://');
    const parsed = new URL(normalized);
    safeHost = parsed.hostname;
    safeDb = (parsed.pathname || '').replace(/^\//, '').split('?')[0];
  } catch {
    // ignore parse error for logging
  }

  console.log('======================================================================');
  console.log(`[INDEX-INSPECTION] Target: host=${safeHost}, db=${safeDb}`);
  console.log('Mode: STRICTLY READ-ONLY (Zero mutations)');
  console.log('======================================================================\n');

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    const collection = mongoose.connection.collection('enquiries');
    const indexes = await collection.listIndexes().toArray();

    console.log(`Found ${indexes.length} existing index(es) on 'enquiries':\n`);
    for (const idx of indexes) {
      console.log(`- Name: "${idx.name}"`);
      console.log(`  Key: ${JSON.stringify(idx.key)}`);
      if (idx.unique) console.log('  Unique: true');
      if (idx.sparse) console.log('  Sparse: true');
      if (idx.partialFilterExpression) {
        console.log(`  PartialFilterExpression: ${JSON.stringify(idx.partialFilterExpression)}`);
      }
      console.log('');
    }

    // Inspect idempotencyKey index status
    const idempIndexes = indexes.filter(
      (idx) => idx.key && idx.key.idempotencyKey === 1
    );

    console.log('──────────────────────────────────────────────────────────────────────');
    console.log('MIGRATION ASSESSMENT:');
    if (idempIndexes.length === 0) {
      console.log('STATUS: ABSENT (Clean state matching main branch)');
      console.log('RECOMMENDATION: Safe to deploy new code. Mongoose will create the partial unique index,');
      console.log('or DBA may run:');
      console.log('  db.enquiries.createIndex(');
      console.log('    { idempotencyKey: 1 },');
      console.log('    { unique: true, partialFilterExpression: { idempotencyKey: { $type: "string" } }, background: true }');
      console.log('  );');
    } else {
      for (const idx of idempIndexes) {
        if (idx.partialFilterExpression && idx.partialFilterExpression.idempotencyKey) {
          console.log(`STATUS: READY (Index "${idx.name}" already has partialFilterExpression)`);
          console.log('RECOMMENDATION: Index is fully compatible. No migration required.');
        } else if (idx.sparse) {
          console.log(`STATUS: CONFLICTING (Index "${idx.name}" has legacy { sparse: true })`);
          console.log('RECOMMENDATION: Drop legacy sparse index and create partial unique index:');
          console.log(`  db.enquiries.dropIndex("${idx.name}");`);
          console.log('  db.enquiries.createIndex(');
          console.log('    { idempotencyKey: 1 },');
          console.log('    { unique: true, partialFilterExpression: { idempotencyKey: { $type: "string" } }, background: true }');
          console.log('  );');
        } else {
          console.log(`STATUS: UNEXPECTED (Index "${idx.name}" lacks partialFilterExpression)`);
          console.log(`RECOMMENDATION: Review index options and replace with partial unique index.`);
        }
      }
    }
    console.log('──────────────────────────────────────────────────────────────────────');
  } catch (err) {
    console.error(`[INDEX-INSPECTION] Connection or inspection failed: ${err.message}`);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

main();

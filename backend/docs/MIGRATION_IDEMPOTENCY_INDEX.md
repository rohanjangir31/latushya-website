# Staging & Production Index Migration Plan: `idempotencyKey` Partial Unique Index

**Document Version:** 1.0  
**PR Reference:** [Draft PR #4](https://github.com/rohanjangir31/latushya-website/pull/4)  
**Target Collection:** `enquiries`  
**Target Key:** `{ idempotencyKey: 1 }`  
**Target Index Definition:**  
```javascript
{
  unique: true,
  partialFilterExpression: { idempotencyKey: { $type: "string" } },
  background: true
}
```

---

## 1. Executive Summary & Purpose

In commit `56b6ada`, durable idempotency was introduced for lead consultation enquiries with an initial index definition of:
```javascript
enquirySchema.index({ idempotencyKey: 1 }, { unique: true, sparse: true });
```
In commit `dfd2a75`, this index definition was hardened to:
```javascript
enquirySchema.index(
  { idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: { idempotencyKey: { $type: 'string' } }
  }
);
```

### Why the Change from Sparse to Partial Unique?
In MongoDB, a `sparse` index indexes documents that contain the field, *including* explicit `null` values (`{ idempotencyKey: null }`). If multiple submissions lack a key or write `null`, MongoDB throws `E11000` duplicate key collisions. A partial unique index with `{ partialFilterExpression: { idempotencyKey: { $type: 'string' } } }` guarantees that only non-null string values are indexed, completely curing sparse null collisions while guaranteeing strict uniqueness for all legitimate idempotency keys.

### Why a Migration Plan is Required
MongoDB enforces strict index option equality for identical key specifications. If an existing index exists with name `idempotencyKey_1` and `{ sparse: true }`, attempting to create an index with `{ partialFilterExpression: ... }` on the same key throws:
```
MongoServerError: IndexOptionsConflict: Index with name: idempotencyKey_1 already exists with different options
```
This document provides the owner and staging administrators with a safe, non-destructive inspection and migration runbook.

---

## 2. Production Deployment & History Assessment

1. **Base Branch State (`main` at `3dc9532`):**
   - The production codebase on `main` does NOT contain the `idempotencyKey` field in `backend/src/models/enquiry.model.js`.
   - The production schema on `main` defines only two indexes: `{ createdAt: -1 }` and `{ status: 1, createdAt: -1 }`.
2. **Current Production Atlas State:**
   - Because PR #4 has remained strictly in **Draft** mode and has never been merged or deployed to production, production MongoDB Atlas should have no `idempotencyKey` index.
   - However, whether any interim manual DBA command, preview deployment, or staging environment created the earlier sparse index is **UNKNOWN** without direct inspection.
   - Per audit guardrails, automated agents have **strictly zero direct access** to mutate production Atlas databases. Direct inspection must be performed by the repository owner or DBA using the read-only script below.

---

## 3. Pre-Deployment Inspection (Read-Only)

Before deploying PR #4 to staging or production, run the provided read-only inspection script:

```bash
MONGODB_URI="<staging-or-prod-mongodb-uri>" node backend/scripts/inspect-index-migration.js
```

Or execute directly in `mongosh`:

```javascript
db.enquiries.getIndexes();
```

Inspect the output for any existing index containing `idempotencyKey`.

---

## 4. Migration Decision Matrix & Runbook

### Case A: No index on `idempotencyKey` exists (Clean state matching `main`)
- **Status:** Clean
- **Action:** No manual intervention required. When the new code starts up, Mongoose will build the partial unique index automatically, or DBA may pre-build it in background:
  ```javascript
  db.enquiries.createIndex(
    { idempotencyKey: 1 },
    {
      unique: true,
      partialFilterExpression: { idempotencyKey: { $type: "string" } },
      background: true
    }
  );
  ```

### Case B: Legacy sparse index `idempotencyKey_1` exists (`sparse: true`)
- **Status:** Conflicting index options present
- **Standard Migration (Maintenance Window / Pre-Deploy):**
  1. Drop the legacy sparse index:
     ```javascript
     db.enquiries.dropIndex("idempotencyKey_1");
     ```
  2. Create the new partial unique index:
     ```javascript
     db.enquiries.createIndex(
       { idempotencyKey: 1 },
       {
         unique: true,
         partialFilterExpression: { idempotencyKey: { $type: "string" } },
         background: true
       }
     );
     ```

- **Zero-Downtime Migration (Live Traffic Active):**
  1. Build the new partial index under a distinct temporary name in background:
     ```javascript
     db.enquiries.createIndex(
       { idempotencyKey: 1 },
       {
         unique: true,
         partialFilterExpression: { idempotencyKey: { $type: "string" } },
         name: "idempotencyKey_1_partial",
         background: true
       }
     );
     ```
  2. Drop the legacy sparse index:
     ```javascript
     db.enquiries.dropIndex("idempotencyKey_1");
     ```
  3. Deploy updated code.

### Case C: Partial unique index already exists
- **Status:** Ready
- **Action:** No migration action needed. Schema is fully compatible.

---

## 5. Post-Deployment Verification

Verify that the partial unique index is active:

```javascript
db.enquiries.getIndexes().filter(idx => idx.key && idx.key.idempotencyKey === 1);
```

Expected output:
```javascript
[
  {
    v: 2,
    key: { idempotencyKey: 1 },
    name: "idempotencyKey_1",
    unique: true,
    partialFilterExpression: { idempotencyKey: { $type: "string" } }
  }
]
```

---

## 6. Rollback Plan

If code deployment must be rolled back to `main` (`3dc9532`):
1. Revert application deployment to commit `3dc9532`.
2. Database index options:
   - **Option 1 (Recommended):** Leave the partial unique index in place. The codebase on `main` does not query or insert `idempotencyKey`, so the index has zero operational impact and causes no errors.
   - **Option 2 (Strict Clean):** Drop the index in `mongosh`:
     ```javascript
     db.enquiries.dropIndex("idempotencyKey_1");
     ```

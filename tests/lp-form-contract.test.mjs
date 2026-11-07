/**
 * Production contract test suite for /lp lead submission.
 * Directly exercises the production helper src/utils/formSubmit.js (submitLeadConsultation).
 * Proves that Express/MongoDB backend persistence is the exclusive gate for UI success
 * and conversion tracking, with deterministic eventId deduplication.
 */
import assert from 'node:assert';
import { submitLeadConsultation } from '../src/utils/formSubmit.js';

async function runTests() {
  console.log("Running /lp LeadForm Production Backend Persistence Contract Tests...\n");
  let passed = 0;

  // Test 1: Validation failure (empty inputs)
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    let fetchCalled = false;
    const res = await submitLeadConsultation({
      form: { name: "", phone: "" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async () => { fetchCalled = true; },
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'VALIDATION_FAILED');
    assert.strictEqual(fetchCalled, false, 'Must not call fetch on validation failure');
    assert.strictEqual(trackedEvents.length, 0, 'Zero conversion events on validation failure');
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 1: Empty input validation fails without fetch or conversion");
    passed++;
  }

  // Test 2: Missing API URL (unset / unconfigured)
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    let fetchCalled = false;
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "", // Unset API URL
      fetchFn: async () => { fetchCalled = true; },
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'BACKEND_NOT_CONFIGURED');
    assert.strictEqual(fetchCalled, false, 'Must not call fetch when API URL is unset');
    assert.strictEqual(trackedEvents.length, 0, 'Zero conversion events when backend unconfigured');
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 2: Missing API URL fails closed without fetch or conversion");
    passed++;
  }

  // Test 3: Backend network error (server unreachable / offline)
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async () => { throw new Error("ECONNREFUSED 127.0.0.1:5000"); },
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'BACKEND_NETWORK_ERROR');
    assert.strictEqual(trackedEvents.length, 0, 'Zero conversion events on network failure');
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 3: Backend network error fails closed without firing conversion");
    passed++;
  }

  // Test 4: Backend HTTP 500 error
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async () => ({ ok: false, status: 500 }),
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'BACKEND_HTTP_ERROR');
    assert.strictEqual(trackedEvents.length, 0, 'Zero conversion events on HTTP 500');
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 4: Backend HTTP 500 fails closed without firing conversion");
    passed++;
  }

  // Test 5: Backend malformed non-JSON body
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => { throw new SyntaxError("Unexpected token < in JSON at position 0"); }
      }),
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'BACKEND_MALFORMED_JSON');
    assert.strictEqual(trackedEvents.length, 0, 'Zero conversion events on malformed JSON');
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 5: Backend malformed non-JSON fails closed without firing conversion");
    passed++;
  }

  // Test 6: Backend explicit rejection (success: false)
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ success: false, message: "Enquiry validation rejected" })
      }),
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'BACKEND_REJECTED');
    assert.strictEqual(trackedEvents.length, 0, 'Zero conversion events on backend rejection');
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 6: Backend explicit rejection fails closed without firing conversion");
    passed++;
  }

  // Test 7: Backend success without eventId
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ success: true, data: { id: "enq_abc" } }) // Missing eventId
      }),
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'BACKEND_MISSING_EVENT_ID');
    assert.strictEqual(trackedEvents.length, 0, 'Zero conversion events when eventId is missing');
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 7: Backend persistence without eventId fails closed");
    passed++;
  }

  // Test 8: First successful persistence (verified commit, eventId, and conversion)
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    let passedPayload = null;
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999", service: "Modular Kitchen", location: "Indiranagar", source: "lp_consultation" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async (url, opts) => {
        passedPayload = JSON.parse(opts.body);
        return {
          ok: true,
          status: 201,
          json: async () => ({
            success: true,
            data: {
              id: "enq_672bf001",
              name: "Rohan",
              serviceRequested: "Modular Kitchen",
              eventId: "evt_1730971200_a1b2c3d4",
              createdAt: "2026-11-07T09:00:00.000Z"
            }
          })
        };
      },
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });

    assert.strictEqual(res.success, true);
    assert.strictEqual(res.backendPersisted, true);
    assert.strictEqual(res.eventId, "evt_1730971200_a1b2c3d4");
    assert.strictEqual(res.idempotentReplay, false);
    assert.strictEqual(res.serviceRequested, "Modular Kitchen");
    assert.deepStrictEqual(res.data, {
      name: "Rohan",
      phone: "9999999999",
      service: "Modular Kitchen",
      location: "Indiranagar"
    });
    assert.strictEqual(passedPayload.consent, true);
    assert.strictEqual(passedPayload.serviceRequested, "Modular Kitchen");
    assert.strictEqual(trackedEvents.length, 1);
    assert.strictEqual(trackedEvents[0].s, "lp_consultation");
    assert.strictEqual(trackedEvents[0].m.eventId, "evt_1730971200_a1b2c3d4");
    assert.strictEqual(trackedEvents[0].m.service, "Modular Kitchen");
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 8: First successful persistence gates UI success and conversion tracking");
    passed++;
  }

  // Test 9: Idempotent replay returns same eventId for deterministic deduplication
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const sharedIdempotencyKey = "idemp_test_replay_999";

    // 1st submit
    const res1 = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999", idempotencyKey: sharedIdempotencyKey },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async () => ({
        ok: true,
        status: 201,
        json: async () => ({
          success: true,
          data: {
            id: "enq_672bf001",
            eventId: "evt_stable_dedup_567",
            serviceRequested: "Other / Not sure"
          }
        })
      }),
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });

    // 2nd submit (replay / retry)
    const res2 = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999", idempotencyKey: sharedIdempotencyKey },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          data: {
            id: "enq_672bf001",
            eventId: "evt_stable_dedup_567",
            idempotentReplay: true,
            serviceRequested: "Other / Not sure"
          }
        })
      }),
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });

    assert.strictEqual(res1.success, true);
    assert.strictEqual(res1.idempotentReplay, false);
    assert.strictEqual(res2.success, true);
    assert.strictEqual(res2.idempotentReplay, true);
    // Crucial: Both submissions pass the exact same eventId for platform deduplication
    assert.strictEqual(res1.eventId, "evt_stable_dedup_567");
    assert.strictEqual(res2.eventId, "evt_stable_dedup_567");
    assert.strictEqual(res1.eventId, res2.eventId);
    assert.strictEqual(trackedEvents.length, 2);
    assert.strictEqual(trackedEvents[0].m.eventId, trackedEvents[1].m.eventId);
    console.log("✓ Test 9: Idempotent replay maintains stable eventId across retries");
    passed++;
  }

  // Test 10: In-flight synchronous guard blocks racing concurrent submit
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];

    let resolveFirst;
    const slowFetch = () => new Promise(r => { resolveFirst = r; });

    // First submit starts and stays in-flight
    const p1 = submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: slowFetch,
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });

    // Concurrent second submit arrives immediately
    const secondRes = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: slowFetch,
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(secondRes.success, false);
    assert.strictEqual(secondRes.reason, 'BLOCKED');

    // Resolve first submit
    resolveFirst({
      ok: true,
      status: 201,
      json: async () => ({
        success: true,
        data: { id: "enq_1", eventId: "evt_first_guard" }
      })
    });
    const firstRes = await p1;
    assert.strictEqual(firstRes.success, true);
    assert.strictEqual(trackedEvents.length, 1);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 10: In-flight synchronous guard blocks racing concurrent submit");
    passed++;
  }

  console.log(`\nAll ${passed}/10 backend persistence contract tests passed successfully!`);
}

runTests();

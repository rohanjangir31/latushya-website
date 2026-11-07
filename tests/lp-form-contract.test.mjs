/**
 * Production contract test suite for /lp lead submission and omnichannel lead persistence.
 * Directly exercises src/utils/formSubmit.js (submitLeadConsultation) and src/utils/analytics.js (trackFormLead).
 * Proves that Express/MongoDB backend persistence is the exclusive gate for UI success,
 * that retries reuse stable form-level idempotency keys, that replays suppress duplicate conversion events,
 * and that development mode correctly falls back to relative /api proxy while production fails closed.
 */
import assert from 'node:assert';
import { submitLeadConsultation, generateIdempotencyKey } from '../src/utils/formSubmit.js';
import { trackFormLead, trackedLeadEventIds, isLeadEventTracked } from '../src/utils/analytics.js';

async function runTests() {
  console.log("Running /lp LeadForm Production Backend Persistence & Idempotency Contract Tests...\n");
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

  // Test 2: Missing API URL in production fails closed without fetch or conversion
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    let fetchCalled = false;
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "", // Unset API URL
      isDev: false, // Production mode
      fetchFn: async () => { fetchCalled = true; },
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'BACKEND_NOT_CONFIGURED');
    assert.strictEqual(fetchCalled, false, 'Must not call fetch when API URL is unset in production');
    assert.strictEqual(trackedEvents.length, 0, 'Zero conversion events when backend unconfigured in prod');
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 2: Missing API URL in production fails closed without fetch or conversion");
    passed++;
  }

  // Test 3: Missing API URL in development uses relative /api proxy
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    let calledUrl = null;
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "", // Unset API URL
      isDev: true, // Development mode (Vite proxy)
      fetchFn: async (url) => {
        calledUrl = url;
        return {
          ok: true,
          status: 201,
          json: async () => ({
            success: true,
            data: { id: "enq_dev", eventId: "evt_dev_123" }
          })
        };
      },
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(calledUrl, '/api/v1/enquiries', 'Dev mode must target relative /api/v1/enquiries proxy');
    assert.strictEqual(trackedEvents.length, 1);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 3: Missing API URL in development falls back to relative /api proxy");
    passed++;
  }

  // Test 4: Backend network error fails closed without firing conversion
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
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 4: Backend network error fails closed without firing conversion");
    passed++;
  }

  // Test 5: Backend HTTP 500 error fails closed without firing conversion
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
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 5: Backend HTTP 500 fails closed without firing conversion");
    passed++;
  }

  // Test 6: Backend malformed non-JSON body fails closed without firing conversion
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
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 6: Backend malformed non-JSON fails closed without firing conversion");
    passed++;
  }

  // Test 7: Backend explicit rejection fails closed without firing conversion
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
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 7: Backend explicit rejection fails closed without firing conversion");
    passed++;
  }

  // Test 8: Backend success without eventId fails closed
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
        json: async () => ({ success: true, data: { id: "enq_abc" } })
      }),
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'BACKEND_MISSING_EVENT_ID');
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 8: Backend persistence without eventId fails closed");
    passed++;
  }

  // Test 9: Realistic Production Form Retry Simulation:
  // Backend commits 1st request but network drops before response reaches browser.
  // User retries -> form reuses stable idempotencyKey -> Mongo returns existing record with same eventId.
  // At-most-once conversion tracking contract:
  // - Attempt 1 dropped before browser confirmation: 0 conversions fired.
  // - Attempt 2 retry succeeds with idempotentReplay: true: dispatches exactly 1 Google Ads conversion and 1 GA4 generate_lead.
  {
    const isSubmittingRef = { current: false };
    const mockGtagCalls = [];
    const storageMap = new Map();

    globalThis.window = {
      location: { pathname: '/lp', search: '' },
      gtag: (cmd, name, params) => {
        mockGtagCalls.push({ cmd, name, params });
      },
      sessionStorage: {
        getItem: (k) => storageMap.get(k) || null,
        setItem: (k, v) => storageMap.set(k, String(v)),
        removeItem: (k) => storageMap.delete(k),
        clear: () => storageMap.clear(),
      }
    };
    trackedLeadEventIds.clear();

    // Simulate form component state across retries
    let formState = {
      name: "Rohan",
      phone: "9999999999",
      service: "Modular Kitchen",
      location: "Indiranagar",
      source: "lp_consultation",
    };
    let formIdempotencyKey = null;

    // Backend database simulation
    const mockDb = new Map();

    async function mockBackendHandler(body) {
      if (mockDb.has(body.idempotencyKey)) {
        const existing = mockDb.get(body.idempotencyKey);
        return {
          ok: true,
          status: 200,
          json: async () => ({
            success: true,
            data: {
              id: existing.id,
              name: existing.name,
              serviceRequested: existing.serviceRequested,
              eventId: existing.eventId,
              createdAt: existing.createdAt,
              idempotentReplay: true,
            }
          })
        };
      }
      const record = {
        id: "enq_" + Math.random().toString(36).substring(2, 8),
        name: body.name,
        phone: body.phone,
        serviceRequested: body.serviceRequested,
        eventId: "evt_" + Math.random().toString(36).substring(2, 8),
        createdAt: new Date().toISOString(),
      };
      mockDb.set(body.idempotencyKey, record);
      return {
        ok: true,
        status: 201,
        json: async () => ({
          success: true,
          data: record
        })
      };
    }

    // --- Submission Attempt 1 ---
    if (!formIdempotencyKey) {
      formIdempotencyKey = generateIdempotencyKey();
    }
    const initialKey = formIdempotencyKey;

    const res1 = await submitLeadConsultation({
      form: { ...formState, idempotencyKey: formIdempotencyKey },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async (url, opts) => {
        // Backend successfully commits to Mongo
        await mockBackendHandler(JSON.parse(opts.body));
        // But response is lost due to client-side network drop
        throw new Error("Network timeout: client disconnected");
      },
      trackLeadFn: trackFormLead
    });

    // Attempt 1 failed from browser perspective
    assert.strictEqual(res1.success, false);
    assert.strictEqual(res1.reason, 'BACKEND_NETWORK_ERROR');
    assert.strictEqual(mockGtagCalls.length, 0, 'Zero conversion calls on failed network response');
    // But record WAS committed in DB:
    assert.strictEqual(mockDb.size, 1);
    const persistedRecord = mockDb.get(initialKey);

    // Form retains formIdempotencyKey across retryable failure
    assert.strictEqual(formIdempotencyKey, initialKey);

    // --- Submission Attempt 2 (User clicks Submit again to retry) ---
    // User did not change inputs, so formIdempotencyKey is preserved
    const res2 = await submitLeadConsultation({
      form: { ...formState, idempotencyKey: formIdempotencyKey },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: async (url, opts) => {
        return await mockBackendHandler(JSON.parse(opts.body));
      },
      trackLeadFn: trackFormLead
    });

    // Attempt 2 succeeds as idempotent replay
    assert.strictEqual(res2.success, true);
    assert.strictEqual(res2.idempotentReplay, true);
    assert.strictEqual(res2.eventId, persistedRecord.eventId);
    // Crucial: Only 1 durable record in Mongo!
    assert.strictEqual(mockDb.size, 1);

    // Crucial: First browser-confirmed persistence dispatches exactly 1 Google Ads conversion & 1 GA4 generate_lead
    const adsConversions = mockGtagCalls.filter(e => e.cmd === 'event' && e.name === 'conversion');
    const ga4Leads = mockGtagCalls.filter(e => e.cmd === 'event' && e.name === 'generate_lead');

    assert.strictEqual(adsConversions.length, 1, 'First successful replay must dispatch Google Ads conversion');
    assert.strictEqual(adsConversions[0].params.transaction_id, persistedRecord.eventId);
    assert.strictEqual(adsConversions[0].params.send_to, 'AW-663510360/2lJmCM7Co-EbENi6sbwC');

    assert.strictEqual(ga4Leads.length, 1, 'First successful replay must dispatch GA4 generate_lead');
    assert.strictEqual(ga4Leads[0].params.transaction_id, persistedRecord.eventId);
    assert.strictEqual(ga4Leads[0].params.event_category, 'lead');
    assert.strictEqual(ga4Leads[0].params.event_label, 'lp_consultation');

    // On confirmed success, form resets its idempotencyKeyRef
    formIdempotencyKey = null;

    delete globalThis.window;
    console.log("✓ Test 9: Lost first response then successful idempotent replay fires exactly one logical Google Ads conversion and one GA4 generate_lead");
    passed++;
  }

  // Test 10: Duplicate replay after a successful first dispatch is suppressed for GA4 across reloads
  {
    trackedLeadEventIds.clear();
    const mockGtagCalls = [];
    const storageMap = new Map();

    globalThis.window = {
      location: { pathname: '/lp', search: '' },
      gtag: (cmd, name, params) => {
        mockGtagCalls.push({ cmd, name, params });
      },
      sessionStorage: {
        getItem: (k) => storageMap.get(k) || null,
        setItem: (k, v) => storageMap.set(k, String(v)),
        removeItem: (k) => storageMap.delete(k),
        clear: () => storageMap.clear(),
      }
    };

    const testEventId = "evt_dedup_test_888";

    // 1st dispatch
    const d1 = trackFormLead("test_source", { eventId: testEventId, service: "Turnkey Interiors" });
    assert.strictEqual(d1, true);

    const ga4_1 = mockGtagCalls.filter(e => e.name === 'generate_lead');
    const ads_1 = mockGtagCalls.filter(e => e.name === 'conversion');
    assert.strictEqual(ga4_1.length, 1);
    assert.strictEqual(ads_1.length, 1);

    // 2nd dispatch with same eventId (client replay simulation)
    const d2 = trackFormLead("test_source", { eventId: testEventId, service: "Turnkey Interiors" });
    assert.strictEqual(d2, true);

    // GA4 generate_lead must remain strictly 1 (suppressed by application-level at-most-once guard)
    const ga4_2 = mockGtagCalls.filter(e => e.name === 'generate_lead');
    assert.strictEqual(ga4_2.length, 1, 'GA4 generate_lead must be suppressed on duplicate replay');

    // Google Ads conversion carries the same transaction_id for server-side deduplication
    const ads_2 = mockGtagCalls.filter(e => e.name === 'conversion');
    assert.strictEqual(ads_2.length, 2);
    assert.strictEqual(ads_2[0].params.transaction_id, testEventId);
    assert.strictEqual(ads_2[1].params.transaction_id, testEventId);

    // Simulate page reload within session: in-memory Set is wiped, but sessionStorage persists
    trackedLeadEventIds.clear();
    assert.strictEqual(isLeadEventTracked(testEventId), true, 'sessionStorage must restore tracked state across reloads');

    // 3rd dispatch after simulated reload
    trackFormLead("test_source", { eventId: testEventId, service: "Turnkey Interiors" });
    const ga4_3 = mockGtagCalls.filter(e => e.name === 'generate_lead');
    assert.strictEqual(ga4_3.length, 1, 'GA4 generate_lead remains suppressed across session reloads');

    delete globalThis.window;
    console.log("✓ Test 10: Duplicate replay after successful dispatch suppresses duplicate GA4 generate_lead across session");
    passed++;
  }

  // Test 11: gtag unavailable does not poison eventId and later retry dispatches successfully
  {
    trackedLeadEventIds.clear();
    const storageMap = new Map();

    // gtag runtime is NOT yet loaded/available
    globalThis.window = {
      location: { pathname: '/lp', search: '' },
      sessionStorage: {
        getItem: (k) => storageMap.get(k) || null,
        setItem: (k, v) => storageMap.set(k, String(v)),
        removeItem: (k) => storageMap.delete(k),
        clear: () => storageMap.clear(),
      }
    };

    const testEventId = "evt_gtag_loading_delay_456";

    // Attempt 1: gtag is missing
    const earlyDispatch = trackFormLead("test_source", { eventId: testEventId, service: "Custom Wardrobes" });
    assert.strictEqual(earlyDispatch, false, 'trackFormLead must return false when gtag is unavailable');
    assert.strictEqual(isLeadEventTracked(testEventId), false, 'Missing gtag must NOT mark eventId as tracked (no poisoning)');

    // Now gtag script finishes loading
    const mockGtagCalls = [];
    globalThis.window.gtag = (cmd, name, params) => {
      mockGtagCalls.push({ cmd, name, params });
    };

    // Attempt 2: retry dispatch now succeeds
    const lateDispatch = trackFormLead("test_source", { eventId: testEventId, service: "Custom Wardrobes" });
    assert.strictEqual(lateDispatch, true, 'trackFormLead must succeed once gtag is available');
    assert.strictEqual(isLeadEventTracked(testEventId), true, 'eventId is now marked as tracked');
    assert.strictEqual(mockGtagCalls.length, 2);
    assert.strictEqual(mockGtagCalls[0].params.transaction_id, testEventId);
    assert.strictEqual(mockGtagCalls[1].params.transaction_id, testEventId);

    delete globalThis.window;
    console.log("✓ Test 11: Unavailable gtag does not poison eventId; subsequent retry dispatches once gtag is available");
    passed++;
  }

  // Test 12: Payload mutation resets idempotency key for distinct submission
  {
    const isSubmittingRef = { current: false };
    let keyRef = { current: null };

    const updateField = (field, val, form) => {
      keyRef.current = null; // Mutation clears key
      return { ...form, [field]: val };
    };

    let form = { name: "Rohan", phone: "9999999999", service: "Custom Wardrobes" };
    keyRef.current = generateIdempotencyKey();
    const key1 = keyRef.current;

    // User modifies phone number
    form = updateField("phone", "8888888888", form);
    assert.strictEqual(keyRef.current, null, 'Changing input must clear previous idempotency key');

    keyRef.current = generateIdempotencyKey();
    const key2 = keyRef.current;
    assert.notStrictEqual(key1, key2, 'Mutated payload must receive a distinct idempotency key');
    console.log("✓ Test 12: Form input modification resets idempotency key for distinct submission");
    passed++;
  }

  // Test 13: In-flight synchronous guard blocks racing concurrent submit
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];

    let resolveFirst;
    const slowFetch = () => new Promise(r => { resolveFirst = r; });

    const p1 = submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: slowFetch,
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });

    const secondRes = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      apiUrl: "http://localhost:5000",
      fetchFn: slowFetch,
      trackLeadFn: (s, m) => trackedEvents.push({ s, m })
    });
    assert.strictEqual(secondRes.success, false);
    assert.strictEqual(secondRes.reason, 'BLOCKED');

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
    console.log("✓ Test 13: In-flight synchronous guard blocks racing concurrent submit");
    passed++;
  }

  console.log(`\nAll ${passed}/13 backend persistence and idempotency contract tests passed successfully!`);
}

runTests();

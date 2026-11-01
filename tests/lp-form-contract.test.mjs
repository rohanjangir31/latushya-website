/**
 * Production contract test suite for /lp lead submission.
 * Directly exercises the production helper src/utils/formSubmit.js (submitLeadConsultation and validateFormSubmitResponse).
 */
import assert from 'node:assert';
import { submitLeadConsultation, validateFormSubmitResponse } from '../src/utils/formSubmit.js';

async function runTests() {
  console.log("Running /lp LeadForm Production Function Contract Tests...\n");
  let passed = 0;

  // Test 1: Validation failure (empty inputs)
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "", phone: "" },
      isSubmittingRef,
      fetchFn: async () => {},
      trackLeadFn: (s) => trackedEvents.push(s)
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'VALIDATION_FAILED');
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 1: Empty input validation fails without fetch or conversion");
    passed++;
  }

  // Test 2: Network failure
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      fetchFn: async () => { throw new Error("Network offline"); },
      trackLeadFn: (s) => trackedEvents.push(s)
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'SUBMISSION_ERROR');
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 2: Network error fails closed without firing conversion");
    passed++;
  }

  // Test 3: HTTP 500 error
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      fetchFn: async () => ({ ok: false, status: 500 }),
      trackLeadFn: (s) => trackedEvents.push(s)
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'SUBMISSION_ERROR');
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 3: HTTP 500 response fails closed without firing conversion");
    passed++;
  }

  // Test 4: Malformed / Non-JSON body
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => { throw new SyntaxError("Unexpected token < in JSON"); }
      }),
      trackLeadFn: (s) => trackedEvents.push(s)
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'SUBMISSION_ERROR');
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 4: Malformed non-JSON response fails closed without firing conversion");
    passed++;
  }

  // Test 5: Empty JSON object {}
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({})
      }),
      trackLeadFn: (s) => trackedEvents.push(s)
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'SUBMISSION_ERROR');
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 5: Empty object {} fails closed without firing conversion");
    passed++;
  }

  // Test 6: Explicit rejection success: "false"
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ success: "false", message: "Rejected" })
      }),
      trackLeadFn: (s) => trackedEvents.push(s)
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'SUBMISSION_ERROR');
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 6: Provider rejection 'false' fails closed");
    passed++;
  }

  // Test 7: Unknown status string success: "pending"
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ success: "pending" })
      }),
      trackLeadFn: (s) => trackedEvents.push(s)
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, 'SUBMISSION_ERROR');
    assert.strictEqual(trackedEvents.length, 0);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 7: Unknown string 'pending' fails closed");
    passed++;
  }

  // Test 8: Verified boolean success: true
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999", service: "Modular Kitchen", location: "Indiranagar" },
      isSubmittingRef,
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ success: true, message: "The email was sent successfully" })
      }),
      trackLeadFn: (s) => trackedEvents.push(s)
    });
    assert.strictEqual(res.success, true);
    assert.deepStrictEqual(res.data, {
      name: "Rohan",
      phone: "9999999999",
      service: "Modular Kitchen",
      location: "Indiranagar"
    });
    assert.deepStrictEqual(trackedEvents, ["lp_quote_form"]);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 8: Verified success: true tracks exactly one lead and resets ref");
    passed++;
  }

  // Test 9: Verified string success: "true"
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];
    const res = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ success: "true", message: "The email was sent successfully" })
      }),
      trackLeadFn: (s) => trackedEvents.push(s)
    });
    assert.strictEqual(res.success, true);
    assert.deepStrictEqual(trackedEvents, ["lp_quote_form"]);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 9: Verified success: 'true' tracks exactly one lead and resets ref");
    passed++;
  }

  // Test 10: In-flight guard blocks racing duplicate submit
  {
    const isSubmittingRef = { current: false };
    const trackedEvents = [];

    let resolveFirst;
    const slowFetch = () => new Promise(r => { resolveFirst = r; });

    // First submit starts
    const p1 = submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      fetchFn: slowFetch,
      trackLeadFn: (s) => trackedEvents.push(s)
    });

    // Concurrent second submit arrives immediately
    const secondRes = await submitLeadConsultation({
      form: { name: "Rohan", phone: "9999999999" },
      isSubmittingRef,
      fetchFn: slowFetch,
      trackLeadFn: (s) => trackedEvents.push(s)
    });
    assert.strictEqual(secondRes.success, false);
    assert.strictEqual(secondRes.reason, 'BLOCKED');

    // Resolve first submit
    resolveFirst({
      ok: true,
      status: 200,
      json: async () => ({ success: true })
    });
    const firstRes = await p1;
    assert.strictEqual(firstRes.success, true);
    assert.strictEqual(trackedEvents.length, 1);
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 10: In-flight synchronous guard blocks racing concurrent submit");
    passed++;
  }

  console.log(`\nAll ${passed}/10 production helper contract tests passed successfully!`);
}

runTests();

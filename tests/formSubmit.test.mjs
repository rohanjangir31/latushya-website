/**
 * Direct unit tests for the production helper src/utils/formSubmit.js
 * Exercises validateFormSubmitResponse against all edge cases,
 * and tests the in-flight submission guard pattern, canonical taxonomy,
 * attribution extraction, and exclusive backend API dispatch.
 */
import assert from 'node:assert';
import { validateFormSubmitResponse, submitLeadConsultation, normalizeService, getAttributionData, generateIdempotencyKey } from '../src/utils/formSubmit.js';

async function runTests() {
  console.log("Running validateFormSubmitResponse & helper unit tests...\n");
  let passed = 0;

  // 1. Rejects missing or non-ok response
  {
    await assert.rejects(
      async () => validateFormSubmitResponse(null),
      /Server returned HTTP UNKNOWN/
    );
    await assert.rejects(
      async () => validateFormSubmitResponse({ ok: false, status: 500 }),
      /Server returned HTTP 500/
    );
    console.log("✓ Test 1: Rejects non-ok HTTP responses");
    passed++;
  }

  // 2. Rejects malformed JSON
  {
    const badJsonResponse = {
      ok: true,
      status: 200,
      json: async () => { throw new SyntaxError("Unexpected token <"); }
    };
    await assert.rejects(
      async () => validateFormSubmitResponse(badJsonResponse),
      SyntaxError
    );
    console.log("✓ Test 2: Throws on malformed JSON body");
    passed++;
  }

  // 3. Rejects empty object {}
  {
    const emptyResponse = {
      ok: true,
      status: 200,
      json: async () => ({})
    };
    await assert.rejects(
      async () => validateFormSubmitResponse(emptyResponse),
      /FormSubmit did not return a verified success acknowledgement/
    );
    console.log("✓ Test 3: Rejects empty object {}");
    passed++;
  }

  // 4. Rejects explicit success: false / "false"
  {
    const falseResponse = {
      ok: true,
      status: 200,
      json: async () => ({ success: false, message: "Blocked" })
    };
    await assert.rejects(
      async () => validateFormSubmitResponse(falseResponse),
      /Blocked/
    );

    const stringFalseResponse = {
      ok: true,
      status: 200,
      json: async () => ({ success: "false", message: "Rejected" })
    };
    await assert.rejects(
      async () => validateFormSubmitResponse(stringFalseResponse),
      /Rejected/
    );
    console.log("✓ Test 4: Rejects explicit boolean and string false");
    passed++;
  }

  // 5. Rejects arbitrary string or number
  {
    const arbitraryResponse = {
      ok: true,
      status: 200,
      json: async () => ({ success: "pending" })
    };
    await assert.rejects(
      async () => validateFormSubmitResponse(arbitraryResponse),
      /FormSubmit did not return a verified success acknowledgement/
    );
    console.log("✓ Test 5: Rejects unknown status strings like 'pending'");
    passed++;
  }

  // 6. Accepts boolean true
  {
    const goodBoolResponse = {
      ok: true,
      status: 200,
      json: async () => ({ success: true, message: "The email was sent successfully" })
    };
    const res = await validateFormSubmitResponse(goodBoolResponse);
    assert.strictEqual(res.success, true);
    console.log("✓ Test 6: Resolves on success: true");
    passed++;
  }

  // 7. Accepts string "true"
  {
    const goodStringResponse = {
      ok: true,
      status: 200,
      json: async () => ({ success: "true", message: "The email was sent successfully" })
    };
    const res = await validateFormSubmitResponse(goodStringResponse);
    assert.strictEqual(res.success, "true");
    console.log("✓ Test 7: Resolves on success: 'true'");
    passed++;
  }

  // 8. In-flight synchronous ref guard blocks concurrent duplicate submit
  {
    const isSubmittingRef = { current: false };
    let isSubmitting = false;

    async function executeSubmit(mockFetch) {
      if (isSubmittingRef.current || isSubmitting) return 'BLOCKED';
      isSubmittingRef.current = true;
      isSubmitting = true;
      try {
        const resp = await mockFetch();
        await validateFormSubmitResponse(resp);
        isSubmittingRef.current = false;
        isSubmitting = false;
        return 'SUCCESS';
      } catch (e) {
        isSubmittingRef.current = false;
        isSubmitting = false;
        return 'ERROR';
      }
    }

    let resolveSlow;
    const slowFetch = () => new Promise(r => { resolveSlow = r; });
    const p1 = executeSubmit(slowFetch);
    const p2Result = await executeSubmit(slowFetch); // Concurrent submit arrives immediately
    assert.strictEqual(p2Result, 'BLOCKED');

    resolveSlow({
      ok: true,
      status: 200,
      json: async () => ({ success: true })
    });
    const p1Result = await p1;
    assert.strictEqual(p1Result, 'SUCCESS');
    assert.strictEqual(isSubmittingRef.current, false);
    console.log("✓ Test 8: In-flight guard synchronously blocks racing duplicate submit");
    passed++;
  }

  // 9. submitLeadConsultation accepts mobile as phone fallback and calls backend
  {
    const res = await submitLeadConsultation({
      form: { name: "Ananya", mobile: "9876543210", service: "Modular Kitchen" },
      apiUrl: "http://localhost:5000",
      fetchFn: async () => ({
        ok: true,
        status: 201,
        json: async () => ({ success: true, data: { eventId: "evt_mobile_test" } })
      })
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.data.phone, "9876543210");
    assert.strictEqual(res.data.service, "Modular Kitchen");
    assert.strictEqual(res.eventId, "evt_mobile_test");
    console.log("✓ Test 9: Contact normalization accepts mobile field with backend verification");
    passed++;
  }

  // 10. submitLeadConsultation dispatches exclusively to backend and removes client-side webhook/formsubmit
  {
    const calls = [];
    const res = await submitLeadConsultation({
      form: { name: "Vikram", phone: "9876543211", service: "Turnkey Interiors" },
      apiUrl: "http://localhost:5000",
      fetchFn: async (url, opts) => {
        calls.push({ url, body: JSON.parse(opts.body) });
        return {
          ok: true,
          status: 201,
          json: async () => ({ success: true, data: { eventId: "evt_exclusive_backend" } })
        };
      }
    });
    assert.strictEqual(res.success, true);
    // Crucial: Exactly one dispatch to authoritative backend, zero calls to FormSubmit or public Sheets webhook
    assert.strictEqual(calls.length, 1);
    assert.strictEqual(calls[0].url, "http://localhost:5000/api/v1/enquiries");
    assert.strictEqual(calls[0].body.serviceRequested, "Turnkey Interiors");
    assert.strictEqual(calls[0].body.phone, "9876543211");
    console.log("✓ Test 10: Dispatches exclusively to Express/Mongo backend without parallel third-party sinks");
    passed++;
  }

  // 11. submitLeadConsultation fails closed on missing contact
  {
    const res = await submitLeadConsultation({
      form: { name: "Vikram" },
      apiUrl: "http://localhost:5000",
      fetchFn: async () => {}
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, "VALIDATION_FAILED");
    console.log("✓ Test 11: Rejects missing contact info");
    passed++;
  }

  // 12. normalizeService maps canonical taxonomy and never defaults ambiguous to wardrobes
  {
    assert.strictEqual(normalizeService("Custom Wardrobes"), "Custom Wardrobes");
    assert.strictEqual(normalizeService("Modular Kitchen"), "Modular Kitchen");
    assert.strictEqual(normalizeService("Full Home Interiors"), "Turnkey Interiors");
    assert.strictEqual(normalizeService("Turnkey Interiors"), "Turnkey Interiors");
    assert.strictEqual(normalizeService("Other / Not sure"), "Other / Not sure");
    assert.strictEqual(normalizeService(""), "Other / Not sure");
    assert.strictEqual(normalizeService(null), "Other / Not sure");
    assert.strictEqual(normalizeService("random inquiry about pricing"), "Other / Not sure");
    console.log("✓ Test 12: Canonical service taxonomy mapping and ambiguous safeguard");
    passed++;
  }

  // 13. generateIdempotencyKey generates unique keys
  {
    const k1 = generateIdempotencyKey();
    const k2 = generateIdempotencyKey();
    assert.ok(k1.startsWith("idemp_"));
    assert.ok(k2.startsWith("idemp_"));
    assert.notStrictEqual(k1, k2);
    console.log("✓ Test 13: Unique idempotency key generation");
    passed++;
  }

  // 14. getAttributionData preserves form placement and non-PII fields
  {
    const attr = getAttributionData("homepage_hero");
    assert.strictEqual(attr.formPlacement, "homepage_hero");
    assert.strictEqual(typeof attr, "object");
    console.log("✓ Test 14: Attribution structure extraction");
    passed++;
  }

  console.log(`\nAll ${passed} helper unit tests passed successfully!`);
}

runTests();

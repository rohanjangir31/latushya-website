/**
 * Direct unit tests for the production helper src/utils/formSubmit.js
 * Exercises validateFormSubmitResponse against all edge cases,
 * and tests the in-flight submission guard pattern.
 */
import assert from 'node:assert';
import { validateFormSubmitResponse, submitLeadConsultation } from '../src/utils/formSubmit.js';

async function runTests() {
  console.log("Running validateFormSubmitResponse unit tests...\n");
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

  // 9. submitLeadConsultation accepts mobile as phone fallback
  {
    const res = await submitLeadConsultation({
      form: { name: "Ananya", mobile: "9876543210", service: "Modular Kitchen" },
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      })
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.data.phone, "9876543210");
    assert.strictEqual(res.data.service, "Modular Kitchen");
    console.log("✓ Test 9: Contact normalization accepts mobile field");
    passed++;
  }

  // 10. submitLeadConsultation dispatches to webhookUrl when provided
  {
    const calls = [];
    const res = await submitLeadConsultation({
      form: { name: "Vikram", phone: "9876543211", service: "Turnkey Interiors" },
      webhookUrl: "https://script.google.com/macros/s/TEST/exec",
      fetchFn: async (url, opts) => {
        calls.push({ url, body: JSON.parse(opts.body) });
        return {
          ok: true,
          status: 200,
          json: async () => ({ success: true })
        };
      }
    });
    assert.strictEqual(res.success, true);
    assert.strictEqual(calls.length, 2);
    assert.strictEqual(calls[0].url, "https://script.google.com/macros/s/TEST/exec");
    assert.strictEqual(calls[1].url, "https://formsubmit.co/ajax/info@latushya.com");
    console.log("✓ Test 10: Dispatches to webhookUrl and FormSubmit simultaneously");
    passed++;
  }

  // 11. submitLeadConsultation fails closed on missing contact
  {
    const res = await submitLeadConsultation({
      form: { name: "Vikram" },
      fetchFn: async () => {}
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.reason, "VALIDATION_FAILED");
    console.log("✓ Test 11: Rejects missing contact info");
    passed++;
  }

  console.log(`\nAll ${passed} helper unit tests passed successfully!`);
}

runTests();

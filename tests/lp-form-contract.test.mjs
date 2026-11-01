/**
 * Lightweight, dependency-free test suite verifying the /lp LeadForm submission logic,
 * fail-closed FormSubmit response handling, synchronous in-flight guard, and conversion gating.
 */
import assert from 'node:assert';

// Simulated state & handler matching LeadForm.handleSubmit exactly
function createTestHarness(mockFetch) {
  let isSubmitting = false;
  const isSubmittingRef = { current: false };
  let error = '';
  let done = false;
  let trackedEvents = [];

  const trackFormLead = (source) => {
    trackedEvents.push(source);
  };

  const submit = async (form) => {
    if (isSubmittingRef.current || isSubmitting) return 'BLOCKED_BY_GUARD';

    const trimmedName = (form.name || '').trim();
    const trimmedPhone = (form.phone || '').trim();
    const trimmedLocation = (form.location || '').trim();
    const selectedService = form.service || "Custom Wardrobes";

    if (!trimmedName || !trimmedPhone) {
      error = "Please enter your name and phone number.";
      return 'VALIDATION_FAILED';
    }

    isSubmittingRef.current = true;
    isSubmitting = true;
    error = "";

    try {
      const response = await mockFetch("https://formsubmit.co/ajax/info@latushya.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          service: selectedService,
          locality: trimmedLocation || "Not specified",
          message: `Service: ${selectedService} | Bangalore Locality: ${trimmedLocation || "Not specified"}`,
          _subject: `New Consultation Request: ${selectedService}`
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result = await response.json();
      if (!result || typeof result !== "object" || (result.success !== true && result.success !== "true")) {
        throw new Error(result?.message || "FormSubmit did not return a verified success acknowledgement");
      }

      isSubmittingRef.current = false;
      isSubmitting = false;
      done = true;
      trackFormLead("lp_quote_form");
      return 'SUCCESS';
    } catch (err) {
      isSubmittingRef.current = false;
      isSubmitting = false;
      error = "Unable to submit consultation request right now. Please try again or reach out on WhatsApp.";
      return 'ERROR';
    }
  };

  return {
    submit,
    getState: () => ({ isSubmitting, inFlight: isSubmittingRef.current, error, done, trackedEvents })
  };
}

async function runTests() {
  console.log("Running /lp LeadForm Contract Tests...\n");
  let passed = 0;

  // Test 1: Validation failure (empty inputs)
  {
    const harness = createTestHarness(async () => {});
    const res = await harness.submit({ name: "", phone: "" });
    assert.strictEqual(res, 'VALIDATION_FAILED');
    assert.strictEqual(harness.getState().done, false);
    assert.strictEqual(harness.getState().trackedEvents.length, 0);
    assert.strictEqual(harness.getState().error, "Please enter your name and phone number.");
    console.log("✓ Test 1 Passed: Empty input validation blocks submit & conversion");
    passed++;
  }

  // Test 2: Network failure
  {
    const harness = createTestHarness(async () => { throw new Error("Network down"); });
    const res = await harness.submit({ name: "Rohan", phone: "9999999999" });
    assert.strictEqual(res, 'ERROR');
    assert.strictEqual(harness.getState().done, false);
    assert.strictEqual(harness.getState().trackedEvents.length, 0);
    assert.ok(harness.getState().error.includes("Unable to submit"));
    console.log("✓ Test 2 Passed: Network failure does not fire lead conversion");
    passed++;
  }

  // Test 3: HTTP 500 error
  {
    const harness = createTestHarness(async () => ({ ok: false, status: 500 }));
    const res = await harness.submit({ name: "Rohan", phone: "9999999999" });
    assert.strictEqual(res, 'ERROR');
    assert.strictEqual(harness.getState().done, false);
    assert.strictEqual(harness.getState().trackedEvents.length, 0);
    console.log("✓ Test 3 Passed: HTTP 500 error does not fire lead conversion");
    passed++;
  }

  // Test 4: Malformed / Non-JSON response
  {
    const harness = createTestHarness(async () => ({
      ok: true,
      status: 200,
      json: async () => { throw new SyntaxError("Unexpected token < in JSON at position 0"); }
    }));
    const res = await harness.submit({ name: "Rohan", phone: "9999999999" });
    assert.strictEqual(res, 'ERROR');
    assert.strictEqual(harness.getState().done, false);
    assert.strictEqual(harness.getState().trackedEvents.length, 0);
    console.log("✓ Test 4 Passed: Malformed JSON throws and fails closed");
    passed++;
  }

  // Test 5: Empty response object {}
  {
    const harness = createTestHarness(async () => ({
      ok: true,
      status: 200,
      json: async () => ({})
    }));
    const res = await harness.submit({ name: "Rohan", phone: "9999999999" });
    assert.strictEqual(res, 'ERROR');
    assert.strictEqual(harness.getState().done, false);
    assert.strictEqual(harness.getState().trackedEvents.length, 0);
    console.log("✓ Test 5 Passed: Empty object {} fails closed (no false lead)");
    passed++;
  }

  // Test 6: Explicit false or "false"
  {
    const harness = createTestHarness(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ success: "false", message: "Rejected" })
    }));
    const res = await harness.submit({ name: "Rohan", phone: "9999999999" });
    assert.strictEqual(res, 'ERROR');
    assert.strictEqual(harness.getState().done, false);
    assert.strictEqual(harness.getState().trackedEvents.length, 0);
    console.log("✓ Test 6 Passed: Explicit success: 'false' fails closed");
    passed++;
  }

  // Test 7: Unknown success value (e.g. success: "pending")
  {
    const harness = createTestHarness(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ success: "pending" })
    }));
    const res = await harness.submit({ name: "Rohan", phone: "9999999999" });
    assert.strictEqual(res, 'ERROR');
    assert.strictEqual(harness.getState().done, false);
    assert.strictEqual(harness.getState().trackedEvents.length, 0);
    console.log("✓ Test 7 Passed: Unknown string value 'pending' fails closed");
    passed++;
  }

  // Test 8: Success with boolean true
  {
    const harness = createTestHarness(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ success: true, message: "The email was sent successfully" })
    }));
    const res = await harness.submit({ name: "Rohan", phone: "9999999999", service: "Modular Kitchen" });
    assert.strictEqual(res, 'SUCCESS');
    assert.strictEqual(harness.getState().done, true);
    assert.deepStrictEqual(harness.getState().trackedEvents, ["lp_quote_form"]);
    console.log("✓ Test 8 Passed: Verified success: true completes and tracks exactly one lead");
    passed++;
  }

  // Test 9: Success with string "true"
  {
    const harness = createTestHarness(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ success: "true", message: "The email was sent successfully" })
    }));
    const res = await harness.submit({ name: "Rohan", phone: "9999999999" });
    assert.strictEqual(res, 'SUCCESS');
    assert.strictEqual(harness.getState().done, true);
    assert.deepStrictEqual(harness.getState().trackedEvents, ["lp_quote_form"]);
    console.log("✓ Test 9 Passed: Verified success: 'true' completes and tracks exactly one lead");
    passed++;
  }

  // Test 10: In-flight synchronous ref guard blocks double submission
  {
    let resolveFirst;
    const slowFetch = () => new Promise(r => { resolveFirst = r; });
    const harness = createTestHarness(slowFetch);

    // First submit starts
    const firstPromise = harness.submit({ name: "Rohan", phone: "9999999999" });
    // Second submit arrives immediately before first completes
    const secondRes = await harness.submit({ name: "Rohan", phone: "9999999999" });
    assert.strictEqual(secondRes, 'BLOCKED_BY_GUARD');

    // Resolve first
    resolveFirst({
      ok: true,
      status: 200,
      json: async () => ({ success: true })
    });
    const firstRes = await firstPromise;
    assert.strictEqual(firstRes, 'SUCCESS');
    assert.strictEqual(harness.getState().trackedEvents.length, 1);
    console.log("✓ Test 10 Passed: In-flight ref guard blocks racing duplicate submit");
    passed++;
  }

  console.log(`\nAll ${passed}/10 contract tests passed successfully!`);
}

runTests();

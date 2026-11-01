/**
 * Direct unit tests for the production helper src/utils/formSubmit.js
 * Exercises validateFormSubmitResponse against all edge cases.
 */
import assert from 'node:assert';
import { validateFormSubmitResponse } from '../src/utils/formSubmit.js';

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

  console.log(`\nAll ${passed}/7 helper unit tests passed successfully!`);
}

runTests();

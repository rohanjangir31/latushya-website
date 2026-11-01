/**
 * Validates FormSubmit AJAX HTTP responses.
 * Enforces a strict fail-closed contract requiring an HTTP 2xx status,
 * a valid JSON object, and positive acknowledgement
 * (result.success === true || result.success === "true").
 */
export async function validateFormSubmitResponse(response) {
  if (!response || !response.ok) {
    const status = response ? response.status : 'UNKNOWN';
    throw new Error(`Server returned HTTP ${status}`);
  }

  // Strict JSON parse: throws on malformed/non-JSON bodies
  const result = await response.json();

  if (!result || typeof result !== 'object' || (result.success !== true && result.success !== 'true')) {
    throw new Error(result?.message || 'FormSubmit did not return a verified success acknowledgement');
  }

  return result;
}

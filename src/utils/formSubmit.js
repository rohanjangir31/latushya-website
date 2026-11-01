/**
 * Shared form submission and contract validation for Latushya website.
 *
 * PROVIDER CONTRACT ASSUMPTION:
 * The FormSubmit AJAX endpoint (https://formsubmit.co/ajax/info@latushya.com) is
 * assumed to return a JSON payload with { success: true } or { success: "true" } on successful
 * message dispatch, and { success: false, message: "..." } on failure.
 *
 * NOTE: FormSubmit's public AJAX documentation demonstrates sending "Accept: application/json"
 * and parsing response JSON, but does not formally document the response schema (unlike its separate
 * submissions API). Until vendor written confirmation or controlled non-production testing with
 * an owner-approved test endpoint is completed, this remains an explicit fail-closed contract assumption.
 * We enforce fail-closed handling to prevent silent dropped leads.
 */

/**
 * Validates a FormSubmit HTTP response and parses its JSON body against the expected contract.
 * @param {Response} response - Fetch API Response object
 * @param {any} [preParsedJson] - Optional pre-parsed JSON object
 * @returns {Promise<any>} Parsed result on verified success
 * @throws {Error} if HTTP status is non-2xx or result payload lacks verified success
 */
export async function validateFormSubmitResponse(response, preParsedJson) {
  if (!response || !response.ok) {
    const status = response && response.status ? response.status : 'UNKNOWN';
    throw new Error(`Server returned HTTP ${status}`);
  }

  let result = preParsedJson;
  if (result === undefined) {
    result = await response.json();
  }

  if (!result || typeof result !== 'object' || Array.isArray(result)) {
    throw new Error('Malformed or empty JSON response from submission provider');
  }

  if (result.success !== true && result.success !== 'true') {
    throw new Error(result.message || 'FormSubmit did not return a verified success acknowledgement');
  }

  return result;
}

/**
 * Production helper for LandingPage lead consultation form.
 * Handles validation, in-flight ref guard, dispatch, response contract verification, and attribution.
 */
export async function submitLeadConsultation({
  form,
  isSubmittingRef,
  fetchFn = fetch,
  trackLeadFn,
}) {
  if (isSubmittingRef && isSubmittingRef.current) {
    return { success: false, reason: 'BLOCKED' };
  }

  const trimmedName = form?.name ? String(form.name).trim() : '';
  const trimmedPhone = form?.phone ? String(form.phone).trim() : '';

  if (!trimmedName || !trimmedPhone) {
    return {
      success: false,
      reason: 'VALIDATION_FAILED',
      error: 'Please enter your name and phone number.',
    };
  }

  if (isSubmittingRef) isSubmittingRef.current = true;

  try {
    const response = await fetchFn('https://formsubmit.co/ajax/info@latushya.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: trimmedName,
        phone: trimmedPhone,
        service: form.service || 'Custom Wardrobes',
        location: form.location ? String(form.location).trim() : 'Not provided',
        _subject: 'New Consultation Request',
      }),
    });

    await validateFormSubmitResponse(response);

    if (typeof trackLeadFn === 'function') {
      try {
        trackLeadFn('lp_quote_form');
      } catch (err) {
        console.warn('Tracking dispatch error:', err);
      }
    }

    return {
      success: true,
      data: {
        name: trimmedName,
        phone: trimmedPhone,
        service: form.service || 'Custom Wardrobes',
        location: form.location ? String(form.location).trim() : 'Not provided',
      },
    };
  } catch (err) {
    return {
      success: false,
      reason: 'SUBMISSION_ERROR',
      error: err?.message || 'Submission error',
    };
  } finally {
    if (isSubmittingRef) isSubmittingRef.current = false;
  }
}

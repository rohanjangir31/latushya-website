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

/**
 * Production lead submission helper.
 * Handles validation, payload construction, synchronous in-flight guard,
 * FormSubmit AJAX dispatch, strict response validation, and conversion tracking.
 */
export async function submitLeadConsultation({
  form,
  isSubmittingRef,
  fetchFn = (typeof window !== 'undefined' ? window.fetch.bind(window) : fetch),
  trackLeadFn,
  endpoint = 'https://formsubmit.co/ajax/info@latushya.com',
  trackingSource = 'lp_quote_form'
}) {
  if (isSubmittingRef && isSubmittingRef.current) {
    return { success: false, reason: 'BLOCKED' };
  }

  const trimmedName = (form?.name || '').trim();
  const trimmedPhone = (form?.phone || '').trim();
  const trimmedLocation = (form?.location || '').trim();
  const selectedService = form?.service || 'Custom Wardrobes';

  if (!trimmedName || !trimmedPhone) {
    return {
      success: false,
      reason: 'VALIDATION_FAILED',
      error: 'Please enter your name and phone number.'
    };
  }

  if (isSubmittingRef) {
    isSubmittingRef.current = true;
  }

  try {
    const response = await fetchFn(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: trimmedName,
        phone: trimmedPhone,
        service: selectedService,
        locality: trimmedLocation || 'Not specified',
        message: `Service: ${selectedService} | Bangalore Locality: ${trimmedLocation || 'Not specified'}`,
        _subject: `New Consultation Request: ${selectedService}`
      })
    });

    await validateFormSubmitResponse(response);

    if (typeof trackLeadFn === 'function') {
      trackLeadFn(trackingSource);
    }

    if (isSubmittingRef) {
      isSubmittingRef.current = false;
    }

    return {
      success: true,
      data: {
        name: trimmedName,
        phone: trimmedPhone,
        service: selectedService,
        location: trimmedLocation
      }
    };
  } catch (err) {
    if (isSubmittingRef) {
      isSubmittingRef.current = false;
    }
    return {
      success: false,
      reason: 'SUBMISSION_ERROR',
      error: err.message || 'Submission failed'
    };
  }
}

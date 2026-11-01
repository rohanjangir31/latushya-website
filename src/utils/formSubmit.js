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
 * Production helper for lead consultation forms (LandingPage LeadForm & Homepage QuoteForm).
 * Handles validation, in-flight ref guard, dispatch, response contract verification, and attribution.
 */
export async function submitLeadConsultation({
  form,
  isSubmittingRef,
  fetchFn = fetch,
  trackLeadFn,
  webhookUrl = (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_LEADS_WEBHOOK_URL) || undefined,
}) {
  if (isSubmittingRef && isSubmittingRef.current) {
    return { success: false, reason: 'BLOCKED' };
  }

  const trimmedName = form?.name ? String(form.name).trim() : '';
  const rawContact = form?.phone !== undefined && form?.phone !== null && String(form.phone).trim() !== ''
    ? form.phone
    : form?.mobile;
  const trimmedPhone = rawContact ? String(rawContact).trim() : '';

  if (!trimmedName || !trimmedPhone) {
    return {
      success: false,
      reason: 'VALIDATION_FAILED',
      error: 'Please enter your name and contact number.',
    };
  }

  if (isSubmittingRef) isSubmittingRef.current = true;

  const payload = {
    name: trimmedName,
    phone: trimmedPhone,
    email: form?.email ? String(form.email).trim() : 'Not provided',
    service: form?.service || 'Custom Wardrobes',
    location: form?.location ? String(form.location).trim() : 'Not provided',
    message: form?.message ? String(form.message).trim() : 'Not provided',
    _subject: 'New Consultation Request - ' + (form?.service || 'General Inquiries'),
  };

  try {
    // If a Google Sheets Web App or external lead webhook is configured, dispatch asynchronously
    if (webhookUrl) {
      try {
        await fetchFn(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          mode: 'no-cors',
        });
      } catch (webhookErr) {
        console.warn('Webhook dispatch warning:', webhookErr);
      }
    }

    const response = await fetchFn('https://formsubmit.co/ajax/info@latushya.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    await validateFormSubmitResponse(response);

    if (typeof trackLeadFn === 'function') {
      try {
        trackLeadFn('lp_quote_form');
      } catch (err) {
        console.warn('Tracking dispatch error:', err);
      }
    }

    const returnData = {
      name: trimmedName,
      phone: trimmedPhone,
      service: form?.service || 'Custom Wardrobes',
      location: form?.location ? String(form.location).trim() : 'Not provided',
    };
    if (form?.email && String(form.email).trim()) {
      returnData.email = String(form.email).trim();
    }
    if (form?.message && String(form.message).trim()) {
      returnData.message = String(form.message).trim();
    }

    return {
      success: true,
      data: returnData,
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

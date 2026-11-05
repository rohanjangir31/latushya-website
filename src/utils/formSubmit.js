/**
 * Shared form submission, canonical taxonomy normalization, attribution capture,
 * and contract validation for Latushya omnichannel lead pipeline.
 *
 * CANONICAL SERVICE TAXONOMY:
 * 1. 'Custom Wardrobes'
 * 2. 'Modular Kitchen'
 * 3. 'Turnkey Interiors'
 * 4. 'Other / Not sure'
 * (Never defaults ambiguous leads to Custom Wardrobes).
 */

export const CANONICAL_SERVICES = [
  'Custom Wardrobes',
  'Modular Kitchen',
  'Turnkey Interiors',
  'Other / Not sure',
];

/**
 * Maps arbitrary UI or free-text inputs into the canonical 4-value service taxonomy.
 * Guarantees that unclassified or ambiguous leads resolve strictly to 'Other / Not sure'.
 * @param {string} [rawService]
 * @returns {string} One of CANONICAL_SERVICES
 */
export function normalizeService(rawService) {
  if (!rawService) return 'Other / Not sure';
  const s = String(rawService).trim();
  if (s === 'Custom Wardrobes') return 'Custom Wardrobes';
  if (s === 'Modular Kitchen') return 'Modular Kitchen';
  if (s === 'Turnkey Interiors' || s === 'Full Home Interiors' || s === 'Turnkey') return 'Turnkey Interiors';
  if (s === 'Other / Not sure') return 'Other / Not sure';

  const lower = s.toLowerCase();
  if (lower.includes('wardrobe') || lower.includes('closet') || lower.includes('cupboard') || lower.includes('sliding')) {
    return 'Custom Wardrobes';
  }
  if (lower.includes('kitchen')) {
    return 'Modular Kitchen';
  }
  if (lower.includes('interiors') || lower.includes('turnkey') || lower.includes('home') || lower.includes('3bhk') || lower.includes('2bhk') || lower.includes('villa')) {
    return 'Turnkey Interiors';
  }
  return 'Other / Not sure';
}

/**
 * Extracts non-PII attribution data from URL parameters and document context.
 * Strictly preserves marketing attribution without capturing customer PII.
 * @param {string} [formPlacement]
 * @returns {object} Attribution payload
 */
export function getAttributionData(formPlacement = 'website_form') {
  const attribution = {
    formPlacement,
    landingPage: typeof window !== 'undefined' ? window.location.pathname : null,
    referrer: typeof document !== 'undefined' && document.referrer ? document.referrer.substring(0, 500) : null,
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmTerm: null,
    utmContent: null,
    gclid: null,
    fbclid: null,
  };

  if (typeof window !== 'undefined' && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    attribution.utmSource   = params.get('utm_source');
    attribution.utmMedium   = params.get('utm_medium');
    attribution.utmCampaign = params.get('utm_campaign');
    attribution.utmTerm     = params.get('utm_term');
    attribution.utmContent  = params.get('utm_content');
    attribution.gclid       = params.get('gclid');
    attribution.fbclid      = params.get('fbclid');
  }

  return attribution;
}

/**
 * Generates a unique client-side idempotency key to prevent duplicate lead insertion.
 * @returns {string}
 */
export function generateIdempotencyKey() {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 10);
  return `idemp_${ts}_${rand}`;
}

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

// Live Google Sheets Webhook Endpoint for Latushya Lead Automation Engine
const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxMvmDzqdzbES3P-yVbAncAkM0rcahGc-aAJAc7qK6TM6BfcLit_zPbwe69YWYLIGW4/exec';

/**
 * Production helper for lead consultation forms (LandingPage LeadForm, Homepage QuoteForm, Contact).
 * Handles canonical validation, in-flight ref guard, dispatch to authoritative backend / backup sinks,
 * response contract verification, and post-commit conversion tracking.
 */
export async function submitLeadConsultation({
  form,
  isSubmittingRef,
  fetchFn = fetch,
  trackLeadFn,
  webhookUrl = (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_LEADS_WEBHOOK_URL) || DEFAULT_WEBHOOK_URL,
  apiUrl = (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) || '',
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

  const canonicalService = normalizeService(form?.service);
  const idempotencyKey = form?.idempotencyKey || generateIdempotencyKey();
  const attribution = form?.attribution || getAttributionData(form?.source || 'website_form');

  const payload = {
    name: trimmedName,
    phone: trimmedPhone,
    email: form?.email ? String(form.email).trim() : 'Not provided',
    service: canonicalService,
    serviceRequested: canonicalService,
    wardrobeSubtype: canonicalService === 'Custom Wardrobes' ? (form?.wardrobeSubtype || null) : null,
    location: form?.location ? String(form.location).trim() : (form?.locality ? String(form.locality).trim() : 'Not provided'),
    locality: form?.locality ? String(form.locality).trim() : (form?.location ? String(form.location).trim() : 'Not provided'),
    message: form?.message ? String(form.message).trim() : 'Not provided',
    source: form?.source || 'Website Form',
    idempotencyKey,
    attribution,
    _subject: `New Consultation Request - ${canonicalService}`,
  };

  try {
    // 1. Authoritative Backend Submission (when VITE_API_URL or local /api proxy is available)
    let backendPersisted = false;
    let eventId = null;
    if (apiUrl) {
      try {
        const apiRes = await fetchFn(`${apiUrl}/api/v1/enquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: trimmedName,
            phone: trimmedPhone,
            email: form?.email ? String(form.email).trim() : null,
            serviceRequested: canonicalService,
            wardrobeSubtype: payload.wardrobeSubtype,
            locality: payload.locality !== 'Not provided' ? payload.locality : null,
            message: payload.message !== 'Not provided' ? payload.message : null,
            source: form?.source || 'website_form',
            idempotencyKey,
            attribution,
            consent: true,
          }),
        });

        if (apiRes.ok) {
          const apiJson = await apiRes.json();
          if (apiJson && apiJson.success) {
            backendPersisted = true;
            eventId = apiJson.data?.eventId;
          }
        }
      } catch (apiErr) {
        console.warn('Backend API persistence warning:', apiErr);
      }
    }

    // 2. Automated Google Sheets Webhook Backup (zero dropped leads guarantee)
    if (webhookUrl) {
      try {
        await fetchFn(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors',
        });
      } catch (webhookErr) {
        console.warn('Webhook dispatch warning:', webhookErr);
      }
    }

    // 3. FormSubmit Backup Sink
    const response = await fetchFn('https://formsubmit.co/ajax/info@latushya.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    await validateFormSubmitResponse(response);

    // 4. Post-Commit Primary Conversion Tracking (Deduplicated)
    if (typeof trackLeadFn === 'function') {
      try {
        trackLeadFn('lp_quote_form', { eventId, service: canonicalService });
      } catch (err) {
        console.warn('Tracking dispatch error:', err);
      }
    }

    const returnData = {
      name: trimmedName,
      phone: trimmedPhone,
      service: canonicalService,
      location: payload.location,
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
      idempotencyKey,
      eventId,
      serviceRequested: canonicalService,
      wardrobeSubtype: payload.wardrobeSubtype,
      backendPersisted,
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

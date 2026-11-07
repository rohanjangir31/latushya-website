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

/**
 * Production helper for lead consultation forms (LandingPage LeadForm, Homepage QuoteForm, Contact).
 * 
 * Strict Lead-Persistence Contract:
 * - The Express/MongoDB backend API (POST /api/v1/enquiries) is the SOLE authoritative lead write and success condition.
 * - If apiUrl is unset/unconfigured, unreachable (network error), returns non-2xx HTTP status, malformed JSON,
 *   rejected status (success !== true), or missing eventId, this helper immediately fails closed without showing
 *   success or firing primary conversion events (Google Ads Form Leads / GA4 generate_lead).
 * - Browser-side parallel PII dispatch to unauthenticated public webhooks and third-party email aggregators
 *   has been completely removed from the authoritative path.
 * - Idempotent retries/replays return the existing record and pass the exact same server-generated eventId
 *   to analytics for platform-supported deterministic conversion deduplication.
 */
export async function submitLeadConsultation({
  form,
  isSubmittingRef,
  fetchFn = fetch,
  trackLeadFn,
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

  const effectiveApiUrl = apiUrl !== undefined && apiUrl !== null ? String(apiUrl).trim() : '';
  if (!effectiveApiUrl) {
    return {
      success: false,
      reason: 'BACKEND_NOT_CONFIGURED',
      error: 'Backend API URL is not configured. Submission cannot be verified.',
    };
  }

  if (isSubmittingRef) isSubmittingRef.current = true;

  const canonicalService = normalizeService(form?.service);
  const idempotencyKey = form?.idempotencyKey || generateIdempotencyKey();
  const attribution = form?.attribution || getAttributionData(form?.source || 'website_form');
  const wardrobeSubtype = canonicalService === 'Custom Wardrobes' ? (form?.wardrobeSubtype || null) : null;
  const locality = form?.location ? String(form.location).trim() : (form?.locality ? String(form.locality).trim() : null);
  const message = form?.message ? String(form.message).trim() : null;

  const backendPayload = {
    name: trimmedName,
    phone: trimmedPhone,
    email: form?.email && String(form.email).trim() ? String(form.email).trim() : null,
    serviceRequested: canonicalService,
    wardrobeSubtype,
    locality: locality || null,
    message: message || null,
    source: form?.source || 'website_form',
    idempotencyKey,
    attribution,
    consent: true,
  };

  try {
    const endpoint = `${effectiveApiUrl.replace(/\/+$/, '')}/api/v1/enquiries`;
    let apiRes;
    try {
      apiRes = await fetchFn(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendPayload),
      });
    } catch (networkErr) {
      return {
        success: false,
        reason: 'BACKEND_NETWORK_ERROR',
        error: networkErr?.message || 'Network error reaching backend server',
      };
    }

    if (!apiRes || !apiRes.ok) {
      const status = apiRes && apiRes.status ? apiRes.status : 'UNKNOWN';
      return {
        success: false,
        reason: 'BACKEND_HTTP_ERROR',
        error: `Backend returned HTTP ${status}`,
      };
    }

    let apiJson;
    try {
      apiJson = await apiRes.json();
    } catch {
      return {
        success: false,
        reason: 'BACKEND_MALFORMED_JSON',
        error: 'Backend returned invalid JSON',
      };
    }

    if (!apiJson || typeof apiJson !== 'object' || Array.isArray(apiJson) || apiJson.success !== true) {
      return {
        success: false,
        reason: 'BACKEND_REJECTED',
        error: apiJson?.message || 'Backend rejected lead enquiry',
      };
    }

    const eventId = apiJson.data?.eventId;
    if (!eventId || typeof eventId !== 'string') {
      return {
        success: false,
        reason: 'BACKEND_MISSING_EVENT_ID',
        error: 'Backend persistence succeeded but eventId is missing',
      };
    }

    // Post-Commit Primary Conversion Tracking (Deduplicated via server-generated eventId)
    // Only fires after confirmed backend Express/Mongo persistence
    if (typeof trackLeadFn === 'function') {
      try {
        trackLeadFn(form?.source || 'website_form', {
          eventId,
          service: canonicalService,
        });
      } catch (trackErr) {
        console.warn('[Analytics] Conversion tracking dispatch error:', trackErr);
      }
    }

    const returnData = {
      name: trimmedName,
      phone: trimmedPhone,
      service: canonicalService,
      location: locality || 'Not provided',
    };
    if (backendPayload.email) returnData.email = backendPayload.email;
    if (backendPayload.message) returnData.message = backendPayload.message;

    return {
      success: true,
      data: returnData,
      idempotencyKey,
      eventId,
      serviceRequested: canonicalService,
      wardrobeSubtype,
      backendPersisted: true,
      idempotentReplay: Boolean(apiJson.data?.idempotentReplay),
    };
  } catch (err) {
    return {
      success: false,
      reason: 'SUBMISSION_ERROR',
      error: err?.message || 'Unexpected submission error',
    };
  } finally {
    if (isSubmittingRef) isSubmittingRef.current = false;
  }
}

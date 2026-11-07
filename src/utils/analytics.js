/**
 * Universal Analytics & Conversion Tracking utility
 *
 * Integrated with:
 * - Google Ads: AW-663510360
 *     Primary Conversion: Form Leads (AW-663510360/2lJmCM7Co-EbENi6sbwC)
 *     Secondary Conversion: WhatsApp button click (AW-663510360/gI1YCKyZs6UdENi6sbwC)
 * - Google Analytics 4 (GA4): G-3RDNN89DG5
 *     Dynamic Page Views with UTM campaign parameters
 *     Lead Events: generate_lead (form submissions)
 *     Engagement Events: click_whatsapp (does NOT mark as completed lead)
 */

export const GOOGLE_ADS_ID = 'AW-663510360';
export const GOOGLE_ADS_FORM_LEAD_CONVERSION_ID = 'AW-663510360/2lJmCM7Co-EbENi6sbwC';
export const GOOGLE_ADS_WHATSAPP_CONVERSION_ID = 'AW-663510360/gI1YCKyZs6UdENi6sbwC';
export const GA4_MEASUREMENT_ID = 'G-3RDNN89DG5';

/**
 * Tracks SPA pageviews dynamically across GA4 with full URL, path, and UTM parameters
 */
export function trackPageView(path, title) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: title || document.title,
        page_location: window.location.href,
        page_path: path || window.location.pathname + window.location.search,
        send_to: GA4_MEASUREMENT_ID
      });
    }
  } catch (err) {
    console.warn('[Analytics] Pageview tracking error:', err);
  }
}

/**
 * Tracks genuine form submissions across Google Ads (Primary Lead) and GA4 (generate_lead)
 * with deterministic deduplication via server-generated eventId / transaction_id.
 * Strictly avoids customer PII in analytics payloads.
 *
 * @param {string} [source='general'] - Form identifier / placement
 * @param {object} [metadata={}] - Safe metadata
 * @param {string} [metadata.eventId] - Unique server-generated event ID used as transaction_id
 * @param {string} [metadata.service] - Canonical service taxonomy name
 */
export function trackFormLead(source = 'general', metadata = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const eventId = metadata && typeof metadata === 'object' ? metadata.eventId : null;
      const service = metadata && typeof metadata === 'object' ? metadata.service : null;

      // 1. Google Ads Primary Conversion Action (Form Leads: AW-663510360/2lJmCM7Co-EbENi6sbwC)
      // Google Ads supports `transaction_id` for conversion deduplication.
      const adsPayload = {
        send_to: GOOGLE_ADS_FORM_LEAD_CONVERSION_ID,
      };
      if (eventId) {
        adsPayload.transaction_id = eventId;
      }
      window.gtag('event', 'conversion', adsPayload);

      // 2. GA4 Standard Lead Event (generate_lead)
      const ga4Payload = {
        event_category: 'lead',
        event_label: source,
        send_to: GA4_MEASUREMENT_ID,
      };
      if (eventId) {
        ga4Payload.transaction_id = eventId;
      }
      if (service) {
        ga4Payload.service_category = service;
      }
      window.gtag('event', 'generate_lead', ga4Payload);
    }
  } catch (err) {
    console.warn('[Analytics] Form lead tracking error:', err);
  }
}

/**
 * Tracks WhatsApp button interactions across Google Ads (Secondary) and GA4 (Engagement)
 * Note: Raw WhatsApp clicks are tracked as engagement events and are NOT marked as completed leads.
 */
export function trackWhatsAppConversion(callback) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // 1. Google Ads Secondary Conversion Action
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_WHATSAPP_CONVERSION_ID
      });

      // 2. GA4 Engagement Event (Not marked as lead)
      window.gtag('event', 'click_whatsapp', {
        event_category: 'engagement',
        event_label: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
        send_to: GA4_MEASUREMENT_ID
      });
    }
  } catch (error) {
    console.warn('[Analytics] Conversion tracking error:', error);
  }

  // If callback was provided, execute callback immediately
  if (typeof callback === 'function') {
    callback();
  }
}

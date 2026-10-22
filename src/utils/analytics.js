/**
 * Google Ads Conversion Tracking utility
 *
 * Configured with Google Ads Conversion Action:
 *   Name: WhatsApp button click
 *   Send to: AW-663510360/gI1YCKyZs6UdENi6sbwC
 */

export const GOOGLE_ADS_WHATSAPP_CONVERSION_ID = 'AW-663510360/gI1YCKyZs6UdENi6sbwC';

/**
 * Tracks a WhatsApp contact CTA click conversion in Google Ads.
 *
 * Features:
 * - Safely checks for window.gtag without throwing if missing or ad-blocked
 * - Never transmits PII (no phone numbers, emails, or message contents)
 * - Fires only on user click
 * - Supports an optional callback with timeout fallback for same-tab navigations
 *   while executing immediately without popup-blocking delays for new-tab navigations
 *
 * @param {Function} [callback] Optional navigation or continuation callback
 */
export function trackWhatsAppConversion(callback) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      if (typeof callback === 'function') {
        let called = false;
        const executeCallback = () => {
          if (!called) {
            called = true;
            callback();
          }
        };

        // Safety fallback: ensure navigation occurs even if gtag fails or stalls
        const fallbackTimer = setTimeout(executeCallback, 500);

        window.gtag('event', 'conversion', {
          send_to: GOOGLE_ADS_WHATSAPP_CONVERSION_ID,
          event_callback: () => {
            clearTimeout(fallbackTimer);
            executeCallback();
          },
        });
        return;
      }

      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_WHATSAPP_CONVERSION_ID,
      });
    }
  } catch (error) {
    // Non-blocking: tracking errors must never prevent user navigation
    console.warn('[Analytics] Conversion tracking error:', error);
  }

  // If callback was provided and gtag was not available or errored, execute callback immediately
  if (typeof callback === 'function') {
    callback();
  }
}

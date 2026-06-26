/**
 * Latushya API utility — frontend
 *
 * Resolves the correct backend URL for both environments:
 *   Development : VITE_API_URL is not set → empty string → Vite proxy
 *                 forwards /api/* to http://localhost:5000
 *   Production  : VITE_API_URL is set in Vercel environment variables
 *                 → calls the deployed Railway/Render backend directly
 *
 * All functions return { data } on success or { error } on failure.
 * They never throw — callers use the returned error string.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

/**
 * POST JSON to an API endpoint.
 *
 * @param {string} endpoint  e.g. '/api/v1/enquiries'
 * @param {object} body      Plain object — serialised to JSON
 * @returns {{ data?: object, error?: string }}
 */
export async function apiPost(endpoint, body) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    const json = await response.json();

    if (!response.ok) {
      // Use the server's message field if present (ApiError / ApiResponse format)
      return { error: json.message || 'Submission failed. Please try again.' };
    }

    return { data: json };
  } catch {
    // Network failure, server unreachable, or malformed JSON response
    return { error: 'Network error. Please check your connection and try again.' };
  }
}

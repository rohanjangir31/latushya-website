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

// Resolves the backend base URL for each environment:
//
//   npm run dev  → import.meta.env.DEV is true  → 'http://localhost:5000'
//                  Request appears in DevTools as http://localhost:5000/api/v1/...
//                  Backend CORS already whitelists localhost:5173 (the frontend origin).
//                  Does NOT rely on the Vite proxy.
//
//   npm run build → import.meta.env.DEV is false → VITE_API_URL (set in Vercel env vars)
//                   Set VITE_API_URL=https://your-backend.railway.app before deploying.
//
// import.meta.env.DEV is a Vite built-in replaced at compile time — zero runtime overhead.
const BASE_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:5000' : '');

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

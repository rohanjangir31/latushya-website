const cors = require('cors');

/**
 * CORS Configuration
 *
 * In development: allows localhost:5173 (Vite) and localhost:4173 (Vite preview)
 * In production:  only allows the FRONTEND_URL from environment variables
 *
 * If FRONTEND_URL is not set in production, the fallback list is used.
 * Update the vercelDomains array when your Vercel project URL is known.
 */

const vercelDomains = [
  'https://latushya.vercel.app',
  // Add additional preview deployment URLs here if needed
];

const allowedOrigins = [
  'http://localhost:5173',   // Vite dev server
  'http://localhost:4173',   // Vite preview server
  ...vercelDomains,
];

// Allow additional origin from environment (e.g., custom domain)
if (process.env.FRONTEND_URL) {
  const url = process.env.FRONTEND_URL.trim();
  if (!allowedOrigins.includes(url)) {
    allowedOrigins.push(url);
  }
}

const corsOptions = {
  /**
   * Dynamic origin check:
   * - Requests with no origin header (Postman, mobile apps, curl) are allowed
   *   in development. In production, these should be blocked — add a
   *   NODE_ENV check here if needed.
   * - Requests from unlisted origins are rejected with a 500 CORS error.
   */
  origin: (origin, callback) => {
    if (!origin) {
      // No origin — allow (Postman, server-to-server, etc.)
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' is not in the allowed list.`));
    }
  },

  credentials: true, // Required for httpOnly cookie auth (Phase 2)

  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

  allowedHeaders: ['Content-Type', 'Authorization'],

  // Cache preflight response for 24 hours — reduces OPTIONS requests
  maxAge: 86400,
};

module.exports = cors(corsOptions);

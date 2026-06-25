const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter — applied to all /api routes in server.js
 *
 * Limits: 100 requests per 15 minutes per IP address.
 * This is a general baseline. More restrictive limits are applied
 * per-route in Phase 2 (e.g., enquiry submission: 5/hour per IP).
 *
 * standardHeaders: true  → returns X-RateLimit-* headers (RFC 6585)
 * legacyHeaders: false   → suppresses deprecated X-RateLimit-* headers
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many requests from this IP. Please wait 15 minutes and try again.',
  },

  // Skip rate limiting in test environments
  skip: () => process.env.NODE_ENV === 'test',
});

module.exports = generalLimiter;

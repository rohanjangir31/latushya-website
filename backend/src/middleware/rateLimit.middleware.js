const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter — applied to all /api routes in server.js
 *
 * Limits: 100 requests per 15 minutes per IP address.
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

/**
 * Route-specific abuse control for public lead enquiry submissions
 * Limits: 15 requests per 15 minutes per IP address to block bots while
 * allowing normal users and retry workflows.
 */
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many consultation inquiries submitted from this IP. Please wait a few minutes before trying again.',
  },

  // Skip rate limiting in test environments
  skip: () => process.env.NODE_ENV === 'test',
});

module.exports = generalLimiter;
module.exports.generalLimiter = generalLimiter;
module.exports.enquiryLimiter = enquiryLimiter;

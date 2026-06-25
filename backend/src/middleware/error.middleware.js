const ApiError = require('../utils/ApiError');
const logger   = require('../utils/logger');

/**
 * Centralized error handler — must be registered as the last middleware.
 *
 * Normalizes all thrown errors into a consistent JSON response:
 * {
 *   "success": false,
 *   "message": "Human-readable error message",
 *   "errors": [...],             // only when field-level errors exist
 *   "stack": "..."               // only in development
 * }
 *
 * Handles:
 *   - ApiError instances (operational errors — 4xx, custom messages)
 *   - Mongoose ValidationError (invalid model data)
 *   - Mongoose CastError (invalid ObjectId)
 *   - Mongoose duplicate key (code 11000)
 *   - JWT errors (scaffolded for Phase 2)
 *   - Unhandled errors (500 — message masked in production)
 */

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;

  // ── Mongoose: document validation failed ─────────────────────
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, `Validation failed: ${messages.join('. ')}`);
  }

  // ── Mongoose: duplicate unique field ─────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    error = new ApiError(409, `A record with this ${field} already exists.`);
  }

  // ── Mongoose: invalid ObjectId ───────────────────────────────
  if (err.name === 'CastError') {
    error = new ApiError(400, `Invalid value for '${err.path}'. Expected a valid ID.`);
  }

  // ── JWT errors (handled when auth is implemented in Phase 2) ─
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid or malformed token. Please log in again.');
  }
  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Your session has expired. Please log in again.');
  }

  // ── Derive status code and message ────────────────────────────
  const statusCode = error.statusCode || 500;
  const isProd     = process.env.NODE_ENV === 'production';

  // Always log server errors (5xx) — never log 4xx as errors (they are expected)
  if (statusCode >= 500) {
    logger.error(`[${req.method}] ${req.originalUrl} → ${statusCode}`, err.message);
    if (!isProd) logger.debug(err.stack);
  }

  // In production, mask unexpected 500 errors from clients
  const message = (statusCode >= 500 && isProd)
    ? 'An unexpected error occurred. Please try again.'
    : error.message || 'Internal server error';

  const body = {
    success: false,
    message,
    ...(error.errors && error.errors.length > 0 && { errors: error.errors }),
    ...(!isProd && { stack: err.stack }),
  };

  res.status(statusCode).json(body);
};

module.exports = errorHandler;

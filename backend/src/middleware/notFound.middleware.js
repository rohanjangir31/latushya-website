const ApiError = require('../utils/ApiError');

/**
 * 404 handler — catches requests to routes that don't exist.
 * Must be registered AFTER all valid routes but BEFORE the error handler.
 *
 * Passes an ApiError to the centralized error handler rather than
 * responding directly, so all error responses go through one path.
 */
const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

module.exports = notFound;

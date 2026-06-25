/**
 * Custom error class for operational API errors.
 *
 * Distinguishes between:
 *   - Operational errors (e.g. 404, 400, 401) — safe to send to client
 *   - Programmer errors (e.g. TypeError) — should never reach the client
 *
 * Usage:
 *   throw new ApiError(400, 'Phone number is required');
 *   throw new ApiError(404, 'Enquiry not found');
 *   throw new ApiError(409, 'Email already exists', [{ field: 'email', msg: '...' }]);
 */
class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);

    this.name       = 'ApiError';
    this.statusCode = statusCode;
    this.errors     = errors;   // field-level validation errors (from express-validator)
    this.isOperational = true;  // marks this as a known, handled error

    // Maintains proper stack trace in V8 (Node.js)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;

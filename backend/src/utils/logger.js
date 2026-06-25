/**
 * Minimal structured logger.
 *
 * Intentionally thin in Phase 1 — wraps console methods so that
 * it can be swapped out for Winston or Pino in a future phase
 * by changing only this file.
 *
 * Usage:
 *   const logger = require('../utils/logger');
 *   logger.info('Server started on port 5000');
 *   logger.error('Database connection failed', err.message);
 *   logger.debug('Request body', req.body); // only logs in development
 */

const ENV = process.env.NODE_ENV || 'development';

const timestamp = () => new Date().toISOString();

const logger = {
  info: (msg, ...args) => {
    console.log(`${timestamp()} [INFO]  ${msg}`, ...args);
  },

  warn: (msg, ...args) => {
    console.warn(`${timestamp()} [WARN]  ${msg}`, ...args);
  },

  error: (msg, ...args) => {
    console.error(`${timestamp()} [ERROR] ${msg}`, ...args);
  },

  // Only logs in development — zero overhead in production
  debug: (msg, ...args) => {
    if (ENV === 'development') {
      console.log(`${timestamp()} [DEBUG] ${msg}`, ...args);
    }
  },
};

module.exports = logger;

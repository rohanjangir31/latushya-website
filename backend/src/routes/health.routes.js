const mongoose = require('mongoose');
const ApiResponse = require('../utils/ApiResponse');

const router = require('express').Router();

/**
 * GET /api/v1/health
 *
 * Health check endpoint — used by:
 *   - Railway/Render deployment health monitoring
 *   - Manual verification after deployment
 *   - Frontend connectivity check (optional)
 *
 * Returns: API status, environment, database connection state, timestamp.
 * No authentication required.
 */
router.get('/', (req, res) => {
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const dbState   = mongoose.connection.readyState;
  const dbStatus  = dbStates[dbState] || 'unknown';
  const isHealthy = dbState === 1;

  const data = {
    environment : process.env.NODE_ENV || 'development',
    database    : dbStatus,
    timestamp   : new Date().toISOString(),
    version     : '1.0.0',
    uptime      : `${Math.floor(process.uptime())}s`,
  };

  res
    .status(isHealthy ? 200 : 503)
    .json(new ApiResponse(
      isHealthy ? 200 : 503,
      isHealthy ? 'Latushya API is operational' : 'Latushya API is degraded — database unavailable',
      data,
    ));
});

module.exports = router;

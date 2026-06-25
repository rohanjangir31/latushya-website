/**
 * Latushya Backend — Entry Point
 *
 * Boot order:
 *   1. Load env variables
 *   2. Connect to MongoDB
 *   3. Apply security middleware
 *   4. Apply parsing middleware
 *   5. Mount routes
 *   6. Attach error handlers
 *   7. Start HTTP server
 */

require('dotenv').config();

const express      = require('express');
const helmet       = require('helmet');
const cookieParser = require('cookie-parser');
const morgan       = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB        = require('./src/config/database');
const corsMiddleware   = require('./src/middleware/cors.middleware');
const rateLimiter      = require('./src/middleware/rateLimit.middleware');
const routes           = require('./src/routes/index');
const notFound         = require('./src/middleware/notFound.middleware');
const errorHandler     = require('./src/middleware/error.middleware');

// ── App ───────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 5000;
const ENV  = process.env.NODE_ENV || 'development';

// ── Database ──────────────────────────────────────────────────
connectDB();

// ── Security headers ─────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────
app.use(corsMiddleware);

// ── Rate limiting (all API routes) ───────────────────────────
app.use('/api', rateLimiter);

// ── Body parsing ─────────────────────────────────────────────
// Limit prevents oversized payload attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser());

// ── NoSQL injection prevention ────────────────────────────────
// Strips $ and . from request body, params, and query strings
app.use(mongoSanitize());

// ── HTTP request logging ─────────────────────────────────────
// 'dev' format in development, 'combined' (Apache style) in production
if (ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ── API routes ────────────────────────────────────────────────
app.use('/api/v1', routes);

// ── 404 handler (must be after all routes) ───────────────────
app.use(notFound);

// ── Centralized error handler (must be last) ─────────────────
// Signature (err, req, res, next) is required by Express
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ┌─────────────────────────────────────┐');
  console.log('  │        LATUSHYA API SERVER          │');
  console.log('  ├─────────────────────────────────────┤');
  console.log(`  │  Port   : ${PORT}                         │`);
  console.log(`  │  Env    : ${ENV.padEnd(26)} │`);
  console.log(`  │  Health : http://localhost:${PORT}/api/v1/health │`);
  console.log('  └─────────────────────────────────────┘');
  console.log('');
});

module.exports = app; // exported for future testing

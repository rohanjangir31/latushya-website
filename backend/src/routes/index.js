/**
 * Central route index — mounts all route groups under /api/v1
 *
 * All routes that will ever exist in this API are registered here.
 * Adding a new route group in a future phase requires only:
 *   1. Creating the new routes file
 *   2. Adding one require() and one router.use() here
 *
 * Route map:
 *   /api/v1/health         → health check (Phase 1)
 *   /api/v1/enquiries      → contact form submissions (Phase 2)
 *   /api/v1/portfolio      → published portfolio items (Phase 3)
 *   /api/v1/testimonials   → published testimonials (Phase 3)
 *   /api/v1/auth           → admin authentication (Phase 2)
 */

const router = require('express').Router();

const healthRoutes      = require('./health.routes');
const enquiryRoutes     = require('./enquiry.routes');
const portfolioRoutes   = require('./portfolio.routes');
const testimonialRoutes = require('./testimonial.routes');
const authRoutes        = require('./auth.routes');

// ── Public routes ─────────────────────────────────────────────
router.use('/health',       healthRoutes);
router.use('/enquiries',    enquiryRoutes);
router.use('/portfolio',    portfolioRoutes);
router.use('/testimonials', testimonialRoutes);

// ── Admin auth ────────────────────────────────────────────────
// Route protection is applied inside individual route files (Phase 2)
router.use('/auth', authRoutes);

module.exports = router;

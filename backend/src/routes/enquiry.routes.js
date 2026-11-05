const router = require('express').Router();
const { body } = require('express-validator');

const { createEnquiry } = require('../controllers/enquiry.controller');
const {
  SERVICES_REQUESTED,
  WARDROBE_SUBTYPES,
  WARDROBE_TYPES,
} = require('../models/enquiry.model');
const { enquiryLimiter } = require('../middleware/rateLimit.middleware');

// ─────────────────────────────────────────────────────────────
// Validation rules for POST /api/v1/enquiries
// ─────────────────────────────────────────────────────────────
const createEnquiryRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 80 })
    .withMessage('Name must be between 2 and 80 characters'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[+\d][\d\s\-(). ]{5,18}$/)
    .withMessage('Please enter a valid phone number'),

  body('email')
    .optional({ nullable: true, checkFalsy: true })
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('serviceRequested')
    .optional({ nullable: true, checkFalsy: true })
    .isIn(SERVICES_REQUESTED)
    .withMessage(`serviceRequested must be one of: ${SERVICES_REQUESTED.join(', ')}`),

  body('wardrobeSubtype')
    .optional({ nullable: true, checkFalsy: true })
    .isIn(WARDROBE_SUBTYPES)
    .withMessage(`wardrobeSubtype must be one of: ${WARDROBE_SUBTYPES.join(', ')}`),

  // Legacy field preserved for existing records
  body('wardrobeType')
    .optional({ nullable: true, checkFalsy: true })
    .isIn(WARDROBE_TYPES)
    .withMessage(`wardrobeType must be one of: ${WARDROBE_TYPES.join(', ')}`),

  body('locality')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Locality must not exceed 100 characters'),

  body('message')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must not exceed 1000 characters'),

  body('idempotencyKey')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 128 })
    .withMessage('idempotencyKey must not exceed 128 characters'),

  body('consent')
    .optional()
    .isBoolean()
    .withMessage('consent must be a boolean value'),
];

// ── Routes ───────────────────────────────────────────────────

// Public: submit a new enquiry with abuse rate limiting and validation
router.post('/', enquiryLimiter, createEnquiryRules, createEnquiry);

module.exports = router;

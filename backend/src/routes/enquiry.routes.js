const router = require('express').Router();
const { body } = require('express-validator');

const { createEnquiry, getEnquiries } = require('../controllers/enquiry.controller');
const { WARDROBE_TYPES }              = require('../models/enquiry.model');

// ─────────────────────────────────────────────────────────────
// Validation rules for POST /api/v1/enquiries
//
// Rules are defined here (in the route layer) rather than the
// controller so the controller stays focused on business logic.
// express-validator results are read inside the controller.
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

  body('wardrobeType')
    .optional({ nullable: true, checkFalsy: true })
    .isIn(WARDROBE_TYPES)
    .withMessage(`wardrobeType must be one of: ${WARDROBE_TYPES.join(', ')}`),

  body('message')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must not exceed 1000 characters'),
];

// ── Routes ───────────────────────────────────────────────────

// Public: submit a new enquiry
router.post('/', createEnquiryRules, createEnquiry);

// Temporarily public for Phase 2 testing — will require admin auth in Phase 3
router.get('/', getEnquiries);

module.exports = router;

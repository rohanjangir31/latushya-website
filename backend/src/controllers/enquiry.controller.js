const { validationResult } = require('express-validator');

const Enquiry            = require('../models/enquiry.model');
const ApiError           = require('../utils/ApiError');
const ApiResponse        = require('../utils/ApiResponse');
const asyncHandler       = require('../utils/asyncHandler');

// ─────────────────────────────────────────────────────────────
// POST /api/v1/enquiries
// Public — no authentication required.
//
// Accepts a contact/consultation enquiry from the website form,
// validates it, and persists it to the database.
//
// Returns a 201 with a minimal confirmation payload (not the full
// document — avoids exposing internal fields to the public).
// ─────────────────────────────────────────────────────────────
const createEnquiry = asyncHandler(async (req, res) => {
  // express-validator results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array({ onlyFirstError: true }));
  }

  const { name, phone, email, wardrobeType, message } = req.body;

  const enquiry = await Enquiry.create({
    name,
    phone,
    email:        email        || null,
    wardrobeType: wardrobeType || null,
    message:      message      || null,
    source:       'contact_form',
  });

  // Return only the fields relevant to the visitor.
  // Internal fields (status, adminNotes, source) are never sent back.
  // enquiry.id is the Mongoose string getter — consistent with the toJSON transform.
  res.status(201).json(
    new ApiResponse(201, 'Thank you — we will be in touch shortly.', {
      id:           enquiry.id,
      name:         enquiry.name,
      wardrobeType: enquiry.wardrobeType,
      createdAt:    enquiry.createdAt,
    })
  );
});

module.exports = { createEnquiry };

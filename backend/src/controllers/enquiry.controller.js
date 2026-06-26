const { validationResult } = require('express-validator');

const Enquiry            = require('../models/enquiry.model');
const { ENQUIRY_STATUSES } = require('../models/enquiry.model');
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

// ─────────────────────────────────────────────────────────────
// GET /api/v1/enquiries
// Returns all enquiries, newest first.
//
// Query parameters:
//   ?status=new              — filter by status
//   ?page=1&limit=20         — pagination (default: page 1, 20 per page)
//
// NOTE: This endpoint is temporarily open during Phase 2 to allow
// API testing. It will be protected by admin auth in Phase 3.
// ─────────────────────────────────────────────────────────────
const getEnquiries = asyncHandler(async (req, res) => {
  const page  = Math.max(1, parseInt(req.query.page, 10)  || 1);
  const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
  const skip  = (page - 1) * limit;

  // Validate optional status filter
  const filter = {};
  if (req.query.status) {
    if (!ENQUIRY_STATUSES.includes(req.query.status)) {
      throw new ApiError(
        400,
        `Invalid status "${req.query.status}". Must be one of: ${ENQUIRY_STATUSES.join(', ')}`
      );
    }
    filter.status = req.query.status;
  }

  // Run count and fetch in parallel for efficiency.
  // select('-__v') removes the internal Mongoose version key from every document.
  const [enquiries, total] = await Promise.all([
    Enquiry
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .lean(),
    Enquiry.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, 'Enquiries fetched successfully', {
      enquiries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
      },
    })
  );
});

module.exports = { createEnquiry, getEnquiries };

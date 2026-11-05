const crypto = require('crypto');
const { validationResult } = require('express-validator');

const Enquiry      = require('../models/enquiry.model');
const ApiError     = require('../utils/ApiError');
const ApiResponse  = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

// ─────────────────────────────────────────────────────────────
// POST /api/v1/enquiries
// Public — no authentication required.
//
// Accepts an omnichannel lead consultation enquiry from the website forms,
// validates canonical service taxonomy and non-PII attribution, ensures
// durable idempotency against duplicates, and persists to MongoDB.
// ─────────────────────────────────────────────────────────────
const createEnquiry = asyncHandler(async (req, res) => {
  // express-validator results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array({ onlyFirstError: true }));
  }

  const {
    name,
    phone,
    email,
    serviceRequested,
    wardrobeSubtype,
    wardrobeType,
    locality,
    message,
    source,
    idempotencyKey,
    attribution,
    consent,
  } = req.body;

  // ── Durable Idempotency Check ──────────────────────────────
  if (idempotencyKey) {
    const existing = await Enquiry.findOne({ idempotencyKey });
    if (existing) {
      return res.status(200).json(
        new ApiResponse(200, 'Thank you — your inquiry has already been received.', {
          id:               existing.id,
          name:             existing.name,
          serviceRequested: existing.serviceRequested,
          wardrobeSubtype:  existing.wardrobeSubtype,
          eventId:          existing.eventId,
          createdAt:        existing.createdAt,
          idempotentReplay: true,
        })
      );
    }
  }

  // ── Canonical Service Taxonomy Resolution ───────────────────
  // Canonical values: 'Custom Wardrobes', 'Modular Kitchen', 'Turnkey Interiors', 'Other / Not sure'
  // Never default an ambiguous lead to wardrobes.
  const canonicalService = serviceRequested || 'Other / Not sure';

  // Subtype is collected exclusively for Custom Wardrobes
  let canonicalSubtype = null;
  if (canonicalService === 'Custom Wardrobes') {
    canonicalSubtype = wardrobeSubtype || null;
  }

  // ── Server-Generated Event ID ───────────────────────────────
  // Used for deduplicated downstream conversion tracking (GA4 / Google Form Lead / future Meta CAPI)
  const eventId = `evt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

  // ── Persistence ─────────────────────────────────────────────
  try {
    const enquiry = await Enquiry.create({
      name,
      phone,
      email:            email            || null,
      serviceRequested: canonicalService,
      wardrobeSubtype:  canonicalSubtype,
      wardrobeType:     wardrobeType     || null,
      locality:         locality         || null,
      message:          message          || null,
      source:           source           || 'contact_form',
      idempotencyKey:   idempotencyKey   || null,
      eventId,
      consent:          consent !== false,
      attribution: {
        utmSource:     attribution?.utmSource     || null,
        utmMedium:     attribution?.utmMedium     || null,
        utmCampaign:   attribution?.utmCampaign   || null,
        utmTerm:       attribution?.utmTerm       || null,
        utmContent:    attribution?.utmContent    || null,
        gclid:         attribution?.gclid         || null,
        fbclid:        attribution?.fbclid        || null,
        landingPage:   attribution?.landingPage   || null,
        referrer:      attribution?.referrer      || null,
        formPlacement: attribution?.formPlacement || null,
      },
    });

    // Return only safe confirmation fields — never expose internal/admin fields
    res.status(201).json(
      new ApiResponse(201, 'Thank you — we will be in touch shortly.', {
        id:               enquiry.id,
        name:             enquiry.name,
        serviceRequested: enquiry.serviceRequested,
        wardrobeSubtype:  enquiry.wardrobeSubtype,
        eventId:          enquiry.eventId,
        createdAt:        enquiry.createdAt,
      })
    );
  } catch (err) {
    // Handle concurrent submission with duplicate idempotencyKey (E11000)
    if (err.code === 11000 && idempotencyKey) {
      const existing = await Enquiry.findOne({ idempotencyKey });
      if (existing) {
        return res.status(200).json(
          new ApiResponse(200, 'Thank you — your inquiry has already been received.', {
            id:               existing.id,
            name:             existing.name,
            serviceRequested: existing.serviceRequested,
            wardrobeSubtype:  existing.wardrobeSubtype,
            eventId:          existing.eventId,
            createdAt:        existing.createdAt,
            idempotentReplay: true,
          })
        );
      }
    }
    throw err;
  }
});

module.exports = { createEnquiry };

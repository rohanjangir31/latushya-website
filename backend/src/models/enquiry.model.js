const mongoose = require('mongoose');

// ── Canonical Service Taxonomy ──────────────────────────────
const SERVICES_REQUESTED = [
  'Custom Wardrobes',
  'Modular Kitchen',
  'Turnkey Interiors',
  'Other / Not sure',
];

const WARDROBE_SUBTYPES = [
  'Sliding',
  'Hinged',
  'Walk-In',
  'Other / Not sure',
];

// Preserved for backward compatibility with legacy records
const WARDROBE_TYPES = [
  'Modular Wardrobe',
  'Sliding Wardrobe',
  'Walk-In Wardrobe',
  'Hinged Wardrobe',
  'Luxury Wardrobe',
  'Custom Storage Solution',
  'Not sure — need guidance',
];

const ENQUIRY_STATUSES = ['new', 'contacted', 'in_progress', 'closed'];

const ENQUIRY_SOURCES = [
  'contact_form',
  'website_quote_form',
  'landing_page_form',
  'website_contact_section',
  'google_ads_lead_form',
  'whatsapp',
  'phone',
  'other',
];

// ── Schema ───────────────────────────────────────────────────
const enquirySchema = new mongoose.Schema(
  {
    // ── Visitor-submitted fields ────────────────────────────
    name: {
      type:      String,
      required:  [true, 'Name is required'],
      trim:      true,
      minlength: [2,  'Name must be at least 2 characters'],
      maxlength: [80, 'Name must not exceed 80 characters'],
    },

    phone: {
      type:      String,
      required:  [true, 'Phone number is required'],
      trim:      true,
      maxlength: [20, 'Phone number must not exceed 20 characters'],
    },

    email: {
      type:      String,
      trim:      true,
      lowercase: true,
      default:   null,
      maxlength: [254, 'Email address is too long'],
    },

    serviceRequested: {
      type: String,
      enum: {
        values:  SERVICES_REQUESTED,
        message: '"{VALUE}" is not a recognized service',
      },
      default: 'Other / Not sure',
    },

    wardrobeSubtype: {
      type: String,
      enum: {
        values:  WARDROBE_SUBTYPES,
        message: '"{VALUE}" is not a recognized wardrobe subtype',
      },
      default: null,
    },

    // Legacy field preserved for existing records
    wardrobeType: {
      type:    String,
      enum:    {
        values:  WARDROBE_TYPES,
        message: '"{VALUE}" is not a recognised wardrobe type',
      },
      default: null,
    },

    locality: {
      type:      String,
      trim:      true,
      maxlength: [100, 'Locality must not exceed 100 characters'],
      default:   null,
    },

    message: {
      type:      String,
      trim:      true,
      maxlength: [1000, 'Message must not exceed 1000 characters'],
      default:   null,
    },

    // ── Idempotency & Attribution ───────────────────────────
    idempotencyKey: {
      type:      String,
      trim:      true,
      maxlength: [128, 'idempotencyKey must not exceed 128 characters'],
      default:   null,
    },

    eventId: {
      type:      String,
      trim:      true,
      maxlength: [128, 'eventId must not exceed 128 characters'],
      default:   null,
    },

    consent: {
      type:    Boolean,
      default: true,
    },

    attribution: {
      utmSource:     { type: String, trim: true, maxlength: 100, default: null },
      utmMedium:     { type: String, trim: true, maxlength: 100, default: null },
      utmCampaign:   { type: String, trim: true, maxlength: 100, default: null },
      utmTerm:       { type: String, trim: true, maxlength: 100, default: null },
      utmContent:    { type: String, trim: true, maxlength: 100, default: null },
      gclid:         { type: String, trim: true, maxlength: 120, default: null },
      fbclid:        { type: String, trim: true, maxlength: 120, default: null },
      landingPage:   { type: String, trim: true, maxlength: 500, default: null },
      referrer:      { type: String, trim: true, maxlength: 500, default: null },
      formPlacement: { type: String, trim: true, maxlength: 100, default: null },
    },

    // ── Admin-managed fields ────────────────────────────────
    status: {
      type:    String,
      enum:    {
        values:  ENQUIRY_STATUSES,
        message: '"{VALUE}" is not a valid status',
      },
      default: 'new',
    },

    adminNotes: {
      type:      String,
      trim:      true,
      maxlength: [2000, 'Admin notes must not exceed 2000 characters'],
      default:   null,
    },

    source: {
      type:    String,
      trim:    true,
      default: 'contact_form',
    },
  },
  {
    // Automatically adds createdAt and updatedAt
    timestamps: true,

    // Clean up internal Mongoose fields when converting to JSON
    toJSON: {
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

// ── Indexes ──────────────────────────────────────────────────
// Newest first — default sort for admin list view
enquirySchema.index({ createdAt: -1 });

// Filter by status in admin panel
enquirySchema.index({ status: 1, createdAt: -1 });

// Sparse unique index on idempotencyKey to guarantee zero duplicate writes
enquirySchema.index({ idempotencyKey: 1 }, { unique: true, sparse: true });

// Index phone and created date for quick duplicate check
enquirySchema.index({ phone: 1, createdAt: -1 });

// ── Model ────────────────────────────────────────────────────
const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;

// Named exports so routes can import validation constants
module.exports.SERVICES_REQUESTED = SERVICES_REQUESTED;
module.exports.WARDROBE_SUBTYPES  = WARDROBE_SUBTYPES;
module.exports.WARDROBE_TYPES     = WARDROBE_TYPES;
module.exports.ENQUIRY_STATUSES   = ENQUIRY_STATUSES;
module.exports.ENQUIRY_SOURCES    = ENQUIRY_SOURCES;

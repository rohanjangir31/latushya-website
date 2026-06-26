const mongoose = require('mongoose');

// ── Constants (exported for use in routes validation) ────────
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

const ENQUIRY_SOURCES = ['contact_form', 'whatsapp', 'phone', 'other'];

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
      type:     String,
      required: [true, 'Phone number is required'],
      trim:     true,
      maxlength: [20, 'Phone number must not exceed 20 characters'],
    },

    email: {
      type:      String,
      trim:      true,
      lowercase: true,
      default:   null,
      maxlength: [254, 'Email address is too long'],
    },

    wardrobeType: {
      type:    String,
      enum:    {
        values:  WARDROBE_TYPES,
        message: '"{VALUE}" is not a recognised wardrobe type',
      },
      default: null,
    },

    message: {
      type:      String,
      trim:      true,
      maxlength: [1000, 'Message must not exceed 1000 characters'],
      default:   null,
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
      enum:    ENQUIRY_SOURCES,
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

// ── Model ────────────────────────────────────────────────────
const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;

// Named exports so routes can import validation constants
// without importing the full model (avoids circular deps)
module.exports.WARDROBE_TYPES    = WARDROBE_TYPES;
module.exports.ENQUIRY_STATUSES  = ENQUIRY_STATUSES;

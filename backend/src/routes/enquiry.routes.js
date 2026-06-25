// Enquiry routes — implemented in Phase 2
//
// Planned endpoints:
//   POST /api/v1/enquiries         → Submit contact form (public)
//   GET  /api/v1/admin/enquiries   → List all enquiries (admin only)
//   GET  /api/v1/admin/enquiries/:id
//   PATCH /api/v1/admin/enquiries/:id → Update status / add notes
//   DELETE /api/v1/admin/enquiries/:id

const router = require('express').Router();

module.exports = router;

/**
 * Standardises the JSON response shape across all API endpoints.
 *
 * Every success response will look like:
 * {
 *   "success": true,
 *   "message": "Enquiry submitted successfully",
 *   "data": { ... }
 * }
 *
 * Usage in a controller:
 *   res.status(201).json(new ApiResponse(201, 'Enquiry created', enquiry));
 *   res.status(200).json(new ApiResponse(200, 'Enquiries fetched', { enquiries, total }));
 */
class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;
    if (data !== null) {
      this.data = data;
    }
  }
}

module.exports = ApiResponse;

/**
 * asyncHandler — wraps async Express controllers.
 *
 * Eliminates repetitive try/catch in every controller.
 * Any unhandled rejection is forwarded to the centralized error handler
 * via next(err), which formats and sends the error response.
 *
 * Usage:
 *   const asyncHandler = require('../utils/asyncHandler');
 *   const myController = asyncHandler(async (req, res) => {
 *     const data = await SomeModel.find();
 *     res.json(data);
 *   });
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;

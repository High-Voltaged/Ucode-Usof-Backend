const authMiddleware = require("~/middleware/auth");
const validate = require("~/middleware/validation");
const errorBoundary = require("~/middleware/error-boundary");
const errorMiddleware = require("~/middleware/error-response");

module.exports = { authMiddleware, validate, errorBoundary, errorMiddleware };

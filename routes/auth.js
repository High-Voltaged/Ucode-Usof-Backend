const express = require("express");
const { register, login, logout, sendResetPasswordEmail, updatePassword, confirmEmail } = require("~/controllers/auth");
const errorBoundary = require("~/middleware/error-boundary");
const validate = require("~/middleware/validation");
const { registerSchema, loginSchema, passwordResetSchema, sendEmailSchema } = require("~/validation/user");

const router = express.Router();

router.post("/register", validate(registerSchema), errorBoundary(register));
router.post("/login", validate(loginSchema), errorBoundary(login));
router.post("/logout", errorBoundary(logout));
router.post("/password-reset", validate(sendEmailSchema), errorBoundary(sendResetPasswordEmail));
router.post("/password-reset/:resetToken", validate(passwordResetSchema), errorBoundary(updatePassword));
router.post("/confirm-email/:confirmToken", errorBoundary(confirmEmail));

module.exports = router;

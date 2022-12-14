const express = require("express");
const {
  register,
  login,
  logout,
  sendResetPasswordEmail,
  updatePassword,
  confirmEmail,
  refresh,
} = require("~/controllers/auth");
const { errorBoundary, validate } = require("~/middleware");
const { registerSchema, loginSchema, passwordResetSchema, sendEmailSchema } = require("~/validation/user");

const router = express.Router();

router.post("/register", validate(registerSchema), errorBoundary(register));
router.post("/login", validate(loginSchema), errorBoundary(login));
router.post("/refresh", errorBoundary(refresh));
router.post("/logout", errorBoundary(logout));
router.post("/password-reset", validate(sendEmailSchema), errorBoundary(sendResetPasswordEmail));
router.post("/password-reset/:resetToken", validate(passwordResetSchema), errorBoundary(updatePassword));
router.post("/confirm-email/:confirmToken", errorBoundary(confirmEmail));

module.exports = router;

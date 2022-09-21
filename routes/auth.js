const express = require("express");
const { register, login, logout, sendResetPasswordEmail, updatePassword, confirmEmail } = require("~/controllers/auth");
const errorBoundary = require("~/middleware/error-boundary");

const router = express.Router();

router.post("/register", errorBoundary(register));
router.post("/login", errorBoundary(login));
router.post("/logout", errorBoundary(logout));
router.post("/password-reset", errorBoundary(sendResetPasswordEmail));
router.post("/password-reset/:resetToken", errorBoundary(updatePassword));
router.post("/confirm-email/:confirmToken", errorBoundary(confirmEmail));

module.exports = router;

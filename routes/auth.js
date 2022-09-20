const express = require("express");
const { register, login, logout } = require("~/controllers/auth");
const errorBoundary = require("~/middleware/error-boundary");
const router = express.Router();

router.post("/register", errorBoundary(register));
router.post("/login", errorBoundary(login));
router.post("/logout", errorBoundary(logout));

module.exports = router;

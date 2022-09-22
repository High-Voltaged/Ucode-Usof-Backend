const express = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadPhoto,
  resizeAndSavePhoto,
  updateUserPhoto,
} = require("~/controllers/user");
const authMiddleware = require("~/middleware/auth");
const errorBoundary = require("~/middleware/error-boundary");

const router = express.Router();

router.get("/", errorBoundary(getUsers));
router.get("/:userId", errorBoundary(getUser));

router.use(authMiddleware);

router.patch("/", errorBoundary(updateUser));
router.patch("/avatar", uploadPhoto, resizeAndSavePhoto, errorBoundary(updateUserPhoto));
router.delete("/", errorBoundary(deleteUser));

module.exports = router;

const express = require("express");
const {
  updateUser,
  deleteUser,
  uploadPhoto,
  resizeAndSavePhoto,
  updateUserPhoto,
  getUserPosts,
  getMe,
} = require("~/controllers/user");
const authMiddleware = require("~/middleware/auth");
const errorBoundary = require("~/middleware/error-boundary");
const validate = require("~/middleware/validation");
const { updateSchema } = require("~/validation/user");

const router = express.Router();

router.use(authMiddleware);

router.get("/me", errorBoundary(getMe));
router.get("/posts", errorBoundary(getUserPosts));

router.patch("/", validate(updateSchema), errorBoundary(updateUser));
router.patch("/avatar", errorBoundary(uploadPhoto), errorBoundary(resizeAndSavePhoto), errorBoundary(updateUserPhoto));
router.delete("/", errorBoundary(deleteUser));

module.exports = router;

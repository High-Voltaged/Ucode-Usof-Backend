const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  uploadPhoto,
  resizeAndSavePhoto,
  updateUserPhoto,
  userExistenceCheck,
} = require("~/controllers/user");
const authMiddleware = require("~/middleware/auth");
const errorBoundary = require("~/middleware/error-boundary");
const validate = require("~/middleware/validation");
const { updateSchema } = require("~/validation/user");

const router = express.Router({ mergeParams: true });

router.use(errorBoundary(userExistenceCheck));

router.get("/", errorBoundary(getUser));

router.use(authMiddleware);

router.patch("/", validate(updateSchema), errorBoundary(updateUser));
router.patch("/avatar", errorBoundary(uploadPhoto), errorBoundary(resizeAndSavePhoto), errorBoundary(updateUserPhoto));
router.delete("/", errorBoundary(deleteUser));

module.exports = router;

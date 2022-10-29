const express = require("express");
const {
  deleteComment,
  commentExistenceCheck,
  commentAuthorValidation,
  updateComment,
} = require("~/controllers/comment");
const { errorBoundary, authMiddleware, validate } = require("~/middleware");
const { updateCommentSchema } = require("~/validation/comment");

const router = express.Router({ mergeParams: true });

router.use(authMiddleware, errorBoundary(commentExistenceCheck), errorBoundary(commentAuthorValidation));

router.patch("/", validate(updateCommentSchema), errorBoundary(updateComment));
router.delete("/", errorBoundary(deleteComment));

module.exports = router;

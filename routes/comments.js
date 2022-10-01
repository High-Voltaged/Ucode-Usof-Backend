const express = require("express");
const {
  commentExistenceCheck,
  getComment,
  updateComment,
  deleteComment,
  commentAuthorValidation,
} = require("~/controllers/comment");
const { getLikes, createLike, deleteLike } = require("~/controllers/like");

const { createLikeSchema } = require("~/validation/like");
const { updateCommentSchema } = require("~/validation/comment");

const { errorBoundary, authMiddleware, validate } = require("~/middleware");
const {
  LIKE_ENTITY_NAMES: { comment },
} = require("~/consts/sequelize");
const { isLockedValidation } = require("~/controllers/factory");
const { Comment } = require("~/models");

const router = express.Router({ mergeParams: true });

router.use(errorBoundary(commentExistenceCheck));

router.get("/", errorBoundary(getComment));
router.get("/like", errorBoundary(getLikes(comment)));

router.use(authMiddleware, errorBoundary(isLockedValidation(Comment)));

router.post("/like", validate(createLikeSchema), errorBoundary(createLike(comment)));
router.delete("/like", errorBoundary(deleteLike(comment)));

router.use(errorBoundary(commentAuthorValidation));

router.patch("/", validate(updateCommentSchema), errorBoundary(updateComment));
router.delete("/", errorBoundary(deleteComment));

module.exports = router;

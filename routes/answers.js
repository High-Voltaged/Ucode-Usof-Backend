const express = require("express");
const {
  answerExistenceCheck,
  getAnswer,
  updateAnswer,
  deleteAnswer,
  answerAuthorValidation,
} = require("~/controllers/answer");
const { getLikes, createLike, deleteLike } = require("~/controllers/like");

const { createLikeSchema } = require("~/validation/like");
const { updateAnswerSchema } = require("~/validation/answer");

const { errorBoundary, authMiddleware, validate } = require("~/middleware");
const {
  LIKE_ENTITY_NAMES: { answer },
} = require("~/consts/sequelize");
const { isLockedValidation } = require("~/controllers/factory");
const { Answer } = require("~/models");
const { getAnswerComments, createComment } = require("~/controllers/comment");
const { createCommentSchema } = require("~/validation/comment");

const router = express.Router({ mergeParams: true });

router.use(errorBoundary(answerExistenceCheck));

router.get("/", errorBoundary(getAnswer));
router.get("/like", errorBoundary(getLikes(answer)));
router.get("/comments", errorBoundary(getAnswerComments));

router.use(authMiddleware, errorBoundary(isLockedValidation(Answer)));

router.post("/comments", errorBoundary(validate(createCommentSchema)), errorBoundary(createComment));

router.post("/like", validate(createLikeSchema), errorBoundary(createLike(answer)));
router.delete("/like", errorBoundary(deleteLike(answer)));

router.use(errorBoundary(answerAuthorValidation));

router.patch("/", validate(updateAnswerSchema), errorBoundary(updateAnswer));
router.delete("/", errorBoundary(deleteAnswer));

module.exports = router;

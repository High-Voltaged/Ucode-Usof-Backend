const express = require("express");
const {
  LIKE_ENTITY_NAMES: { post },
} = require("~/consts/sequelize");

const { getPostCategories } = require("~/controllers/category");
const { getPostAnswers, createPostAnswer } = require("~/controllers/answer");
const { isLockedValidation } = require("~/controllers/factory");
const { createLike, deleteLike, getLikes } = require("~/controllers/like");
const {
  getPost,
  updatePost,
  deletePost,
  postExistenceCheck,
  postAuthorValidation,
  postInactiveCheck,
} = require("~/controllers/post");
const { errorBoundary, authMiddleware, validate } = require("~/middleware");
const { Post } = require("~/models");

const { createAnswerSchema } = require("~/validation/answer");
const { createLikeSchema } = require("~/validation/like");
const { updatePostSchema } = require("~/validation/post");

const router = express.Router({ mergeParams: true });

router.use(errorBoundary(postExistenceCheck), errorBoundary(postInactiveCheck));

router.get("/", errorBoundary(getPost));
router.get("/answers", errorBoundary(getPostAnswers));
router.get("/categories", errorBoundary(getPostCategories));
router.get("/like", errorBoundary(getLikes(post)));

router.use(authMiddleware, errorBoundary(isLockedValidation(Post)));

router.post("/answers", validate(createAnswerSchema), errorBoundary(createPostAnswer));

router.post("/like", validate(createLikeSchema), errorBoundary(createLike(post)));
router.delete("/like", errorBoundary(deleteLike(post)));

router.use(errorBoundary(postAuthorValidation));

router.patch("/", validate(updatePostSchema), errorBoundary(updatePost));
router.delete("/", errorBoundary(deletePost));

module.exports = router;

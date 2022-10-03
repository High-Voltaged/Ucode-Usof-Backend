const express = require("express");
const {
  LIKE_ENTITY_NAMES: { post },
} = require("~/consts/sequelize");

const { getPostCategories } = require("~/controllers/category");
const { getPostComments, createPostComment } = require("~/controllers/comment");
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

const { createCommentSchema } = require("~/validation/comment");
const { createLikeSchema } = require("~/validation/like");
const { updatePostSchema } = require("~/validation/post");

const router = express.Router({ mergeParams: true });

router.use(errorBoundary(postExistenceCheck), errorBoundary(postInactiveCheck));

router.get("/", errorBoundary(getPost));
router.get("/comments", errorBoundary(getPostComments));
router.get("/categories", errorBoundary(getPostCategories));
router.get("/like", errorBoundary(getLikes(post)));

router.use(authMiddleware, errorBoundary(isLockedValidation(Post)));

router.post("/comments", validate(createCommentSchema), errorBoundary(createPostComment));

router.post("/like", validate(createLikeSchema), errorBoundary(createLike(post)));
router.delete("/like", errorBoundary(deleteLike(post)));

router.use(errorBoundary(postAuthorValidation));

router.patch("/", validate(updatePostSchema), errorBoundary(updatePost));
router.delete("/", errorBoundary(deletePost));

module.exports = router;

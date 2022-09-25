const express = require("express");

const { getPostCategories } = require("~/controllers/category");
const { getPostComments, createPostComment } = require("~/controllers/comment");
const { getPostLikes } = require("~/controllers/like");
const { getPost, updatePost, deletePost, postExistenceCheck, postAuthorValidation } = require("~/controllers/post");
const { errorBoundary, authMiddleware, validate } = require("~/middleware");

const { createCommentSchema } = require("~/validation/comment");
const { updatePostSchema } = require("~/validation/post");

const router = express.Router({ mergeParams: true });

router.use(errorBoundary(postExistenceCheck));

router.get("/", errorBoundary(getPost));
router.patch(
  "/",
  authMiddleware,
  validate(updatePostSchema),
  errorBoundary(postAuthorValidation),
  errorBoundary(updatePost),
);
router.delete(
  "/",
  authMiddleware,
  errorBoundary(postExistenceCheck),
  errorBoundary(postAuthorValidation),
  errorBoundary(deletePost),
);

router.get("/comments", errorBoundary(getPostComments));
router.post("/comments", authMiddleware, validate(createCommentSchema), errorBoundary(createPostComment));

router.get("/categories", errorBoundary(getPostCategories));

router.get("/likes", errorBoundary(getPostLikes));

module.exports = router;

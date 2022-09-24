const express = require("express");

const { getPostCategories } = require("~/controllers/category");
const { getPostComments, createPostComment } = require("~/controllers/comment");
const { getPostLikes } = require("~/controllers/like");
const { getPost, updatePost, deletePost, postExistenceCheck, postAuthorValidation } = require("~/controllers/post");

const authMiddleware = require("~/middleware/auth");
const errorBoundary = require("~/middleware/error-boundary");

const router = express.Router({ mergeParams: true });

router.use(errorBoundary(postExistenceCheck));

router.get("/", errorBoundary(getPost));
router.patch("/", authMiddleware, errorBoundary(postAuthorValidation), errorBoundary(updatePost));
router.delete(
  "/",
  authMiddleware,
  errorBoundary(postExistenceCheck),
  errorBoundary(postAuthorValidation),
  errorBoundary(deletePost),
);

router.get("/comments", errorBoundary(getPostComments));
router.post("/comments", authMiddleware, errorBoundary(createPostComment));

router.get("/categories", errorBoundary(getPostCategories));

router.get("/likes", errorBoundary(getPostLikes));

module.exports = router;

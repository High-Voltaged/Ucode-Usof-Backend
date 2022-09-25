const express = require("express");

const { getPostCategories } = require("~/controllers/category");
const { getPostComments, createPostComment } = require("~/controllers/comment");
const { getPostLikes, createLike, deleteLike, likeAuthorValidation } = require("~/controllers/like");
const { getPost, updatePost, deletePost, postExistenceCheck, postAuthorValidation } = require("~/controllers/post");
const { errorBoundary, authMiddleware, validate } = require("~/middleware");

const { createCommentSchema } = require("~/validation/comment");
const { createLikeSchema } = require("~/validation/like");
const { updatePostSchema } = require("~/validation/post");

const router = express.Router({ mergeParams: true });

router.use(errorBoundary(postExistenceCheck));

router.get("/", errorBoundary(getPost));
router.get("/comments", errorBoundary(getPostComments));
router.get("/categories", errorBoundary(getPostCategories));
router.get("/like", errorBoundary(getPostLikes));

router.use(authMiddleware);

router.patch("/", validate(updatePostSchema), errorBoundary(postAuthorValidation), errorBoundary(updatePost));
router.delete("/", errorBoundary(postAuthorValidation), errorBoundary(deletePost));

router.post("/comments", validate(createCommentSchema), errorBoundary(createPostComment));

router.post("/like", validate(createLikeSchema), errorBoundary(createLike));
router.delete("/like", errorBoundary(likeAuthorValidation), errorBoundary(deleteLike));

module.exports = router;

const express = require("express");
const { getPosts, createPost } = require("~/controllers/post");
const authMiddleware = require("~/middleware/auth");
const errorBoundary = require("~/middleware/error-boundary");
const validate = require("~/middleware/validation");
const postRouter = require("~/routes/post");
const { createPostSchema } = require("~/validation/post");

const router = express.Router();

router.get("/", errorBoundary(getPosts));
router.post("/", authMiddleware, validate(createPostSchema), errorBoundary(createPost));

router.use("/:postId", postRouter);

module.exports = router;

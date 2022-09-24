const express = require("express");
const { getPosts, createPost } = require("~/controllers/post");
const authMiddleware = require("~/middleware/auth");
const errorBoundary = require("~/middleware/error-boundary");
const postRouter = require("~/routes/post");

const router = express.Router();

router.get("/", errorBoundary(getPosts));
router.post("/", authMiddleware, errorBoundary(createPost));

router.use("/:postId", postRouter);

module.exports = router;

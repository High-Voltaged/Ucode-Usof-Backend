const express = require("express");
const { RESOURCES } = require("~/consts/utils");
const { getPosts, createPost } = require("~/controllers/post");
const { validate, authMiddleware, errorBoundary } = require("~/middleware");
const postRouter = require("~/routes/post");
const querySchema = require("~/validation/query");
const { createPostSchema } = require("~/validation/post");

const router = express.Router();

router.get("/", validate(querySchema, RESOURCES.query), errorBoundary(getPosts));
router.post("/", authMiddleware, validate(createPostSchema), errorBoundary(createPost));

router.use("/:id", postRouter);

module.exports = router;

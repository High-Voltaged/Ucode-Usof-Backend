const express = require("express");
const authRouter = require("~/routes/auth");
const userRouter = require("~/routes/users");
const postRouter = require("~/routes/posts");
const commentRouter = require("~/routes/comments");

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/comments/:commentId", commentRouter);

module.exports = router;

const express = require("express");
const authRouter = require("~/routes/auth");
const userRouter = require("~/routes/users");
const postRouter = require("~/routes/posts");
const answerRouter = require("~/routes/answers");
const commentRouter = require("~/routes/comments");
const categoryRouter = require("~/routes/categories");

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/answers/:id", answerRouter);
router.use("/api/categories", categoryRouter);
router.use("/api/comments/:id", commentRouter);

module.exports = router;

const express = require("express");
const authRouter = require("~/routes/auth");
const userRouter = require("~/routes/users");
const postRouter = require("~/routes/posts");
const commentRouter = require("~/routes/comments");
const categoryRouter = require("~/routes/categories");

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/comments/:id", commentRouter);
router.use("/api/categories", categoryRouter);

module.exports = router;

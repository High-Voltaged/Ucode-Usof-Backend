const express = require("express");
const authRouter = require("~/routes/auth");
const userRouter = require("~/routes/users");
const postRouter = require("~/routes/posts");

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);

module.exports = router;

const express = require("express");
const authRouter = require("~/routes/auth");
const userRouter = require("~/routes/user");

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);

module.exports = router;

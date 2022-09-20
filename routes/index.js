const express = require("express");
const authRouter = require("~/routes/auth");

const router = express.Router();

router.use("/api/auth", authRouter);

module.exports = router;

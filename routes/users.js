const express = require("express");
const errorBoundary = require("~/middleware/error-boundary");
const userRouter = require("~/routes/user");
const { getUsers } = require("~/controllers/user");

const router = express.Router();

router.get("/", errorBoundary(getUsers));

router.use("/:userId", userRouter);

module.exports = router;

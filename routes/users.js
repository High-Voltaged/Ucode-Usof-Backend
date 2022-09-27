const express = require("express");
const userRouter = require("~/routes/user");
const { getUsers } = require("~/controllers/user");
const { errorBoundary } = require("~/middleware");

const router = express.Router();

router.get("/", errorBoundary(getUsers));

router.use("/:id", userRouter);

module.exports = router;

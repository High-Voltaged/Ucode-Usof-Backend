const express = require("express");
const { getUsers, userExistenceCheck, getUser } = require("~/controllers/user");
const { errorBoundary } = require("~/middleware");
const profileRouter = require("~/routes/user");

const router = express.Router();

router.get("/", errorBoundary(getUsers));

router.get("/:id", errorBoundary(userExistenceCheck), errorBoundary(getUser));

router.use("/profile", profileRouter);

module.exports = router;

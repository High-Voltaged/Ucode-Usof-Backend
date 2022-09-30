const express = require("express");
const { getCategories, createCategory } = require("~/controllers/category");
const { validate, errorBoundary } = require("~/middleware");

const categoryRouter = require("~/routes/category");
const { createCategorySchema } = require("~/validation/category");

const router = express.Router();

router.get("/", errorBoundary(getCategories));
router.post("/", validate(createCategorySchema), errorBoundary(createCategory));

router.use("/:id", categoryRouter);

module.exports = router;

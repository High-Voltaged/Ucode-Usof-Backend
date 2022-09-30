const express = require("express");
const { getCategory, getCategoryPosts, categoryExistenceCheck } = require("~/controllers/category");

const { errorBoundary } = require("~/middleware");

const router = express.Router({ mergeParams: true });

router.use(errorBoundary(categoryExistenceCheck));

router.get("/", errorBoundary(getCategory));
router.get("/posts", errorBoundary(getCategoryPosts));

module.exports = router;

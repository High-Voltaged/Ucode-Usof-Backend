const express = require("express");
const { options, adminRouter } = require("~/routes/admin");

const router = express.Router();

router.use(options.rootPath, adminRouter);
// router.use("/api");

module.exports = router;

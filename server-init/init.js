const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const router = require("~/routes");
const { options, adminRouter } = require("~/routes/admin");
const { errorMiddleware } = require("~/middleware");
const { AVATAR_FILE_PATH } = require("~/consts/utils");

const serverInit = (app) => {
  app.use(options.rootPath, adminRouter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: "GET, POST, PATCH, DELETE",
      allowedHeaders: "Content-Type, Authorization",
    }),
  );
  app.use("/", router);

  app.set("view engine", "pug");

  app.use(express.static(`${path.resolve(AVATAR_FILE_PATH)}`));

  app.use(errorMiddleware);
};

module.exports = serverInit;

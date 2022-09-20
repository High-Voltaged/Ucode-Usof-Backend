const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("~/routes");
const { options, adminRouter } = require("~/routes/admin");
const errorMiddleware = require("~/middleware/error-response");

const serverInit = (app) => {
  app.use(options.rootPath, adminRouter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", router);

  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: "GET, POST, PATCH, DELETE",
      allowedHeaders: "Content-Type, Authorization",
    }),
  );
  app.use(errorMiddleware);
};

module.exports = serverInit;

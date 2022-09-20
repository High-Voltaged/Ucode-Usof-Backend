const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("~/routes");

const serverInit = (app) => {
  app.use("/", router);

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
};

module.exports = serverInit;

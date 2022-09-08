require("module-alias/register");
require("./module-aliases");

const express = require("express");
const serverSetup = require("~/server-init/setup");
const logger = require("~/logger/logger");

const app = express();

serverSetup(app).catch((err) => logger.error(err));

const mysql = require("mysql2/promise");
const config = require("~/config/database");
const logger = require("~/logger/logger");
const sequelize = require("~/database");

const createDBIfNotExists = async () => {
  const { host, user, password, database } = config;
  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);
};

const databaseInit = async () => {
  await createDBIfNotExists();

  await sequelize.sync();

  logger.info("Connected to DB.");
};

module.exports = databaseInit;

const mysql = require("mysql2/promise");
const { DB_OPTIONS } = require("~/consts/database");
const logger = require("~/logger/logger");
const sequelize = require("~/database");
const { UserService } = require("~/services");

const createDBIfNotExists = async () => {
  const { host, port, username, password, database } = DB_OPTIONS;
  const connection = await mysql.createConnection({ host, port, user: username, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);
};

const databaseInit = async () => {
  await createDBIfNotExists();

  await sequelize.sync();

  await UserService.createAdminIfNotExists();

  logger.info("Connected to the database.");
};

module.exports = databaseInit;

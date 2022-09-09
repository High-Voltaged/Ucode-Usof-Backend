const { Sequelize } = require("sequelize");
const config = require("~/config/database");
const mysql = require("mysql2/promise");
const logger = require("~/logger/logger");

const createDBIfNotExists = async () => {
  const { host, user, password, database } = config;
  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);
};

const databaseInit = async () => {
  await createDBIfNotExists();

  const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: "mysql",
    pool: { ...config.pool }
  });

  await sequelize.sync();

  logger.info("Connected to DB.");

  return {
    // ...models,
    Sequelize,
    sequelize
  };
};

module.exports = databaseInit;

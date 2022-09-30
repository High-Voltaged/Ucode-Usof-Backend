const { Sequelize } = require("sequelize");
const { DB_OPTIONS } = require("~/consts/database");

const sequelize = new Sequelize(DB_OPTIONS.database, DB_OPTIONS.username, DB_OPTIONS.password, {
  host: DB_OPTIONS.host,
  dialect: "mysql",
  ...DB_OPTIONS,
});

module.exports = sequelize;

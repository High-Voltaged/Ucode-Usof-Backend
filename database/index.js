const { Sequelize } = require("sequelize");
const { DB_OPTIONS } = require("~/consts/database");

const sequelize = new Sequelize(DB_OPTIONS.database, DB_OPTIONS.user, DB_OPTIONS.password, {
  host: DB_OPTIONS.host,
  dialect: "mysql",
  pool: { ...DB_OPTIONS.pool },
  logging: false,
});

module.exports = sequelize;

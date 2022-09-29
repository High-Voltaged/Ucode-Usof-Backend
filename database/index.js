const { Sequelize } = require("sequelize");
const { DB_OPTIONS } = require("~/consts/database");
const dateCast = require("~/utils/date-cast");

const sequelize = new Sequelize(DB_OPTIONS.database, DB_OPTIONS.user, DB_OPTIONS.password, {
  host: DB_OPTIONS.host,
  dialect: "mysql",
  pool: { ...DB_OPTIONS.pool },
  logging: false,
  dialectOptions: { typeCast: dateCast },
});

module.exports = sequelize;

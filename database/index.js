const { Sequelize } = require("sequelize");
const config = require("~/config/database");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  pool: { ...config.pool },
  logging: false,
});

module.exports = sequelize;

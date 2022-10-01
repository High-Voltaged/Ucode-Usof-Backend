const { Sequelize } = require("sequelize");
const { DB_OPTIONS } = require("~/consts/database");

const sequelize = new Sequelize(DB_OPTIONS);

module.exports = sequelize;

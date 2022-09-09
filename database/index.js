const { Sequelize } = require("sequelize");
const config = require("~/config/database");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  pool: { ...config.pool }
});

const models = [require("~/models/User")];

for (const modelInit of models) {
  modelInit(sequelize);
}

module.exports = sequelize;

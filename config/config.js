require("dotenv").config();

const DB_OPTIONS = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: true,
};

module.exports = {
  development: DB_OPTIONS,
  production: DB_OPTIONS,
};

const { ROLES_ENUM } = require("~/consts/validation");

const DB_OPTIONS = {
  host: process.env.DB_HOST,
  port: process.env.DB_POST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  pool: {
    min: 0,
    max: 5,
    acquire: 10000,
    idle: 10000,
  },
};

const ADMIN_OPTIONS = {
  email: process.env.ADMIN_EMAIL,
  login: process.env.ADMIN_LOGIN,
  password: process.env.ADMIN_PASSWORD,
  role: ROLES_ENUM[1],
};

module.exports = { DB_OPTIONS, ADMIN_OPTIONS };

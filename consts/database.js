const { ROLES_ENUM } = require("~/consts/validation");
const { development } = require("~/config/config");

const DB_OPTIONS = development;

const ADMIN_OPTIONS = {
  email: process.env.ADMIN_EMAIL,
  login: process.env.ADMIN_LOGIN,
  password: process.env.ADMIN_PASSWORD,
  role: ROLES_ENUM[1],
};

module.exports = { DB_OPTIONS, ADMIN_OPTIONS };

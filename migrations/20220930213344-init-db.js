"use strict";

require("../module-aliases");
const sequelize = require("~/database");
require("~/models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(_queryInterface, _Sequelize) {
    await sequelize.sync();
  },

  async down(_queryInterface, _Sequelize) {
    await sequelize.drop();
  },
};

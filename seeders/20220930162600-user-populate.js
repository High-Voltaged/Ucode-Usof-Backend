"use strict";

require("../module-aliases");
const { hashPassword } = require("~/utils/password");

const defaultOptions = { isEmailConfirmed: true, createdAt: new Date(), updatedAt: new Date() };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert(
      "users",
      [
        {
          login: "john_doe",
          email: "john_doe@gmail.com",
          fullName: "John Doe",
          password: await hashPassword("somepass"),
          ...defaultOptions,
        },
        {
          login: "michael_bay",
          email: "michael_bay@gmail.com",
          fullName: "Michael Bay",
          password: await hashPassword("somepass"),
          ...defaultOptions,
        },
        {
          login: "nora_tompson",
          email: "nora_tompson@gmail.com",
          fullName: "Nora Tompson",
          password: await hashPassword("somepass"),
          ...defaultOptions,
        },
        {
          login: "jerry_johnson",
          email: "jerry_johnson@gmail.com",
          fullName: "Jerry Johnson",
          password: await hashPassword("somepass"),
          ...defaultOptions,
        },
        {
          login: "paul_jackson",
          email: "paul_jackson@gmail.com",
          fullName: "Paul Jackson",
          password: await hashPassword("somepass"),
          ...defaultOptions,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("users", null, {}),
};

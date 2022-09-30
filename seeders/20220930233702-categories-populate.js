"use strict";

const defaultOptions = { createdAt: new Date(), updatedAt: new Date() };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert(
      "categories",
      [
        {
          title: "First Category",
          description: "Some test data content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          title: "Second Category ",
          description: "Some test data content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          title: "Third Category",
          description: "Some test data content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          title: "Fourth Category",
          description: "Some test data content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          title: "Fifth Category",
          description: "Some test data content here. Lorem ipsum content.",
          ...defaultOptions,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("categories", null, {}),
};

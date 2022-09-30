"use strict";

const defaultOptions = { createdAt: new Date(), updatedAt: new Date() };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert(
      "postCategories",
      [
        {
          postId: 1,
          categoryId: 1,
          ...defaultOptions,
        },
        {
          postId: 2,
          categoryId: 2,
          ...defaultOptions,
        },
        {
          postId: 3,
          categoryId: 3,
          ...defaultOptions,
        },
        {
          postId: 4,
          categoryId: 4,
          ...defaultOptions,
        },
        {
          postId: 5,
          categoryId: 5,
          ...defaultOptions,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("postCategories", null, {}),
};

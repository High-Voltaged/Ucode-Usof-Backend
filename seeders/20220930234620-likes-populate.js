"use strict";

const defaultOptions = { publishDate: new Date(), updatedAt: new Date() };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert(
      "likes",
      [
        {
          type: "like",
          author: 1,
          postId: 1,
          ...defaultOptions,
        },
        {
          type: "like",
          author: 2,
          postId: 2,
          ...defaultOptions,
        },
        {
          type: "like",
          author: 3,
          postId: 3,
          ...defaultOptions,
        },
        {
          type: "like",
          author: 4,
          commentId: 1,
          ...defaultOptions,
        },
        {
          type: "like",
          author: 5,
          commentId: 2,
          ...defaultOptions,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("likes", null, {}),
};

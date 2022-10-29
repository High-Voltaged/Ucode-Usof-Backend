"use strict";

const defaultOptions = { publishDate: new Date(), updatedAt: new Date() };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert(
      "answers",
      [
        {
          postId: 1,
          author: 5,
          content: "First answer content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          postId: 2,
          author: 4,
          content: "Second answer content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          postId: 3,
          author: 2,
          content: "Third answer content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          postId: 4,
          author: 3,
          content: "Fourth answer content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          postId: 5,
          author: 1,
          content: "Fifth answer content here. Lorem ipsum content.",
          ...defaultOptions,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("answers", null, {}),
};

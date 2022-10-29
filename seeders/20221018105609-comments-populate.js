"use strict";

const defaultOptions = { publishDate: new Date(), updatedAt: new Date() };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert(
      "comments",
      [
        {
          answerId: 1,
          author: 1,
          content: "First comment content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          answerId: 2,
          author: 2,
          content: "Second comment content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          answerId: 3,
          author: 3,
          content: "Third comment content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          answerId: 4,
          author: 4,
          content: "Fourth comment content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          answerId: 5,
          author: 5,
          content: "Fifth comment content here. Lorem ipsum content.",
          ...defaultOptions,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("comments", null, {}),
};

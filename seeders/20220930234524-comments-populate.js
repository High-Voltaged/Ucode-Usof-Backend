"use strict";

const defaultOptions = { publishDate: new Date(), updatedAt: new Date() };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert(
      "comments",
      [
        {
          postId: 1,
          content: "First comment content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          postId: 2,
          content: "Second comment content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          postId: 3,
          content: "Third comment content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          postId: 4,
          content: "Fourth comment content here. Lorem ipsum content.",
          ...defaultOptions,
        },
        {
          postId: 5,
          content: "Fifth comment content here. Lorem ipsum content.",
          ...defaultOptions,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("comments", null, {}),
};

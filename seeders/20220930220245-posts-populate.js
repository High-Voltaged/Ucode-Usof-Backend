"use strict";

const defaultOptions = { publishDate: new Date(), updatedAt: new Date() };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "Some test data title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 1,
          ...defaultOptions,
        },
        {
          title: "Second data title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 2,
          ...defaultOptions,
        },
        {
          title: "Third test data title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 3,
          ...defaultOptions,
        },
        {
          title: "Fourth test data title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 4,
          ...defaultOptions,
        },
        {
          title: "Fifth test data title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 5,
          ...defaultOptions,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("posts", null, {}),
};

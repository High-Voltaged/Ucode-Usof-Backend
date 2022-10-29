"use strict";

const defaultOptions = { publishDate: new Date(), updatedAt: new Date() };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "Some test title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 1,
          ...defaultOptions,
        },
        {
          title: "Second test title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 2,
          ...defaultOptions,
        },
        {
          title: "Third test title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 3,
          ...defaultOptions,
        },
        {
          title: "Fourth test title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 4,
          ...defaultOptions,
        },
        {
          title: "Fifth test title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 5,
          ...defaultOptions,
        },
        {
          title: "New test title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 1,
          ...defaultOptions,
        },
        {
          title: "Second new title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 2,
          ...defaultOptions,
        },
        {
          title: "third new title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 3,
          ...defaultOptions,
        },
        {
          title: "Fourth new title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 4,
          ...defaultOptions,
        },
        {
          title: "Fifth new title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 5,
          ...defaultOptions,
        },
        {
          title: "other test title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 1,
          ...defaultOptions,
        },
        {
          title: "Second other title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 2,
          ...defaultOptions,
        },
        {
          title: "Third other title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 3,
          ...defaultOptions,
        },
        {
          title: "Fourth other title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 4,
          ...defaultOptions,
        },
        {
          title: "Fifth other title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 5,
          ...defaultOptions,
        },
        {
          title: "Some ipsum title",
          content: "Some ipsum data content here. Lorem ipsum content.",
          author: 1,
          ...defaultOptions,
        },
        {
          title: "Second ipsum title",
          content: "Some ipsum data content here. Lorem ipsum content.",
          author: 2,
          ...defaultOptions,
        },
        {
          title: "Third ipsum title",
          content: "Some ipsum data content here. Lorem ipsum content.",
          author: 3,
          ...defaultOptions,
        },
        {
          title: "Fourth ipsum title",
          content: "Some ipsum data content here. Lorem ipsum content.",
          author: 4,
          ...defaultOptions,
        },
        {
          title: "Fifth ipsum title",
          content: "Some ipsum data content here. Lorem ipsum content.",
          author: 5,
          ...defaultOptions,
        },
        {
          title: "Some test title",
          content: "Some test data content here. Lorem ipsum content.",
          author: 1,
          ...defaultOptions,
        },
        {
          title: "Second lorem title",
          content: "Some lorem data content here. Lorem ipsum content.",
          author: 2,
          ...defaultOptions,
        },
        {
          title: "Third lorem title",
          content: "Some lorem data content here. Lorem ipsum content.",
          author: 3,
          ...defaultOptions,
        },
        {
          title: "Fourth lorem title",
          content: "Some lorem data content here. Lorem ipsum content.",
          author: 4,
          ...defaultOptions,
        },
        {
          title: "Fifth lorem title",
          content: "Some lorem data content here. Lorem ipsum content.",
          author: 5,
          ...defaultOptions,
        },
        {
          title: "Some content title",
          content: "Some content data content here. Lorem ipsum content.",
          author: 1,
          ...defaultOptions,
        },
        {
          title: "Second content title",
          content: "Some content data content here. Lorem ipsum content.",
          author: 2,
          ...defaultOptions,
        },
        {
          title: "Third content title",
          content: "Some content data content here. Lorem ipsum content.",
          author: 3,
          ...defaultOptions,
        },
        {
          title: "Fourth content title",
          content: "Some content data content here. Lorem ipsum content.",
          author: 4,
          ...defaultOptions,
        },
        {
          title: "Fifth content title",
          content: "Some content data content here. Lorem ipsum content.",
          author: 5,
          ...defaultOptions,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("posts", null, {}),
};

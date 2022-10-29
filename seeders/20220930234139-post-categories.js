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
          postId: 1,
          categoryId: 2,
          ...defaultOptions,
        },
        {
          postId: 1,
          categoryId: 3,
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
        {
          postId: 6,
          categoryId: 1,
          ...defaultOptions,
        },
        {
          postId: 7,
          categoryId: 2,
          ...defaultOptions,
        },
        {
          postId: 8,
          categoryId: 3,
          ...defaultOptions,
        },
        {
          postId: 9,
          categoryId: 4,
          ...defaultOptions,
        },
        {
          postId: 10,
          categoryId: 5,
          ...defaultOptions,
        },
        {
          postId: 11,
          categoryId: 1,
          ...defaultOptions,
        },
        {
          postId: 12,
          categoryId: 2,
          ...defaultOptions,
        },
        {
          postId: 13,
          categoryId: 3,
          ...defaultOptions,
        },
        {
          postId: 14,
          categoryId: 4,
          ...defaultOptions,
        },
        {
          postId: 15,
          categoryId: 5,
          ...defaultOptions,
        },
        {
          postId: 16,
          categoryId: 1,
          ...defaultOptions,
        },
        {
          postId: 17,
          categoryId: 2,
          ...defaultOptions,
        },
        {
          postId: 18,
          categoryId: 3,
          ...defaultOptions,
        },
        {
          postId: 19,
          categoryId: 4,
          ...defaultOptions,
        },
        {
          postId: 20,
          categoryId: 5,
          ...defaultOptions,
        },
        {
          postId: 21,
          categoryId: 1,
          ...defaultOptions,
        },
        {
          postId: 22,
          categoryId: 2,
          ...defaultOptions,
        },
        {
          postId: 23,
          categoryId: 3,
          ...defaultOptions,
        },
        {
          postId: 24,
          categoryId: 4,
          ...defaultOptions,
        },
        {
          postId: 25,
          categoryId: 5,
          ...defaultOptions,
        },
        {
          postId: 26,
          categoryId: 1,
          ...defaultOptions,
        },
        {
          postId: 27,
          categoryId: 2,
          ...defaultOptions,
        },
        {
          postId: 28,
          categoryId: 3,
          ...defaultOptions,
        },
        {
          postId: 29,
          categoryId: 4,
          ...defaultOptions,
        },
        {
          postId: 30,
          categoryId: 5,
          ...defaultOptions,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("postCategories", null, {}),
};

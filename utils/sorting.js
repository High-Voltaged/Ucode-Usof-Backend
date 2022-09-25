const { Sequelize } = require("sequelize");
const { SORT_BY, SORT_ORDER } = require("~/consts/sequelize");
const { Like } = require("~/models");

const getSortOptions = (sort) => {
  let options = { order: [], attrs: [] };

  const sortBy = SORT_BY[sort] || SORT_BY.likes;

  options.attrs.push([Sequelize.fn("COUNT", Sequelize.col("likes.id")), SORT_BY.likes]);

  options.order.push([sortBy, SORT_ORDER.DESC]);

  if (sortBy === SORT_BY.likes) {
    options.order.push([SORT_BY.date, SORT_ORDER.DESC]);
  }

  options.include = {
    model: Like,
    attributes: [],
    required: false,
  };

  options.group = ["post.id", "likes.id"];

  return options;
};

module.exports = getSortOptions;

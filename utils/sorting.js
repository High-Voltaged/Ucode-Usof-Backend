const { SORT_BY, SORT_ORDER } = require("~/consts/sequelize");

const getSortOptions = (sort) => {
  let options = { order: [], group: [] };

  const sortBy = SORT_BY[sort] || SORT_BY.likes;

  options.order.push([sortBy, SORT_ORDER.DESC]);

  if (sortBy === SORT_BY.likes) {
    options.order.push([SORT_BY.date, SORT_ORDER.DESC]);
  }

  options.group = ["post.id"];

  return options;
};

module.exports = getSortOptions;

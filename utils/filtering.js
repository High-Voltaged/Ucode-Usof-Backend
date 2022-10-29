const { Op } = require("sequelize");
const { STATUS_ENUM } = require("~/consts/validation");
const { Category } = require("~/models");

const getCategoryFilter = (category) => {
  const filter = {
    model: Category,
    attributes: [],
    required: true,
    where: { title: category },
  };

  return filter;
};

const getDateFilter = (dateStart, dateEnd) => {
  const filters = {};

  if (dateStart) {
    filters[Op.gte] = dateStart;
  }
  if (dateEnd) {
    filters[Op.lte] = dateEnd;
  }

  return filters;
};

const getFilters = (options) => {
  const { category, dateStart, dateEnd, status, author, auth } = options;
  let filters = {};

  if (category) {
    filters.category = getCategoryFilter(category);
  }

  if (dateStart || dateEnd) {
    filters.publishDate = getDateFilter(dateStart, dateEnd);
  }

  if (author) {
    filters.author = author;
  }

  if (!auth) {
    filters.status = status || STATUS_ENUM[0];
  }

  return filters;
};

module.exports = getFilters;

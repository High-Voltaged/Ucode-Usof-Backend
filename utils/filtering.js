const { Op } = require("sequelize");
const { STATUS_ENUM } = require("~/consts/validation");
const { Category } = require("~/models");

const getCategoryFilter = (categoryId) => {
  const filter = {
    model: Category,
    attributes: [],
    required: true,
    where: { id: categoryId },
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
  const { categories, dateStart, dateEnd, status, author, auth } = options;
  let filters = {};

  if (categories && categories.length) {
    filters.categories = getCategoryFilter(categories);
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

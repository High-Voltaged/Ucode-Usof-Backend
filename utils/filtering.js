const { Op } = require("sequelize");
const { STATUS_ENUM } = require("~/consts/validation");
const { Category } = require("~/models");

const getCategoryFilter = (categories) => {
  const cIds = Array.isArray(categories) ? categories : [categories];
  let ids = cIds.map((c) => Number(c));

  console.log(ids);
  const filter = {
    model: Category,
    attributes: [],
    required: true,
    where: { id: { [Op.in]: ids } },
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
  const { categories, dateStart, dateEnd, status } = options;
  let filters = {};

  if (categories && categories.length) {
    filters.categories = getCategoryFilter(categories);
  }

  if (dateStart || dateEnd) {
    filters.publishDate = getDateFilter(dateStart, dateEnd);
  }

  filters.status = status || STATUS_ENUM[0];

  return filters;
};

module.exports = getFilters;

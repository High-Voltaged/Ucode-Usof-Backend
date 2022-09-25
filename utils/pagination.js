const { DEFAULT_POSTS_LIMIT, DEFAULT_CURR_PAGE } = require("~/consts/query");

const getPageParams = (page, customLimit) => {
  const limit = Number(customLimit) || DEFAULT_POSTS_LIMIT;
  const offset = page ? Number(page - 1) * limit : 0;

  return { limit, offset };
};

const getPageData = (count, page, limit) => {
  const currentPage = page ? Number(page) : DEFAULT_CURR_PAGE;
  const pagesCount = Math.ceil(count / limit);

  return { itemsCount: count, pagesCount, currentPage };
};

module.exports = { getPageParams, getPageData };

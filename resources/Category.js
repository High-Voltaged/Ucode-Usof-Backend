const { ADMIN_TAB_NAME } = require("~/consts/utils");
const { Category } = require("~/models");

const CategoryResource = {
  resource: Category,
  options: {
    parent: ADMIN_TAB_NAME,
  },
};

module.exports = CategoryResource;

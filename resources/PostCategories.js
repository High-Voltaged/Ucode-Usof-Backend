const { ADMIN_TAB_NAME } = require("~/consts/utils");
const { PostCategories } = require("~/models");

const PostCategoriesResource = {
  resource: PostCategories,
  options: {
    parent: ADMIN_TAB_NAME,
  },
};

module.exports = PostCategoriesResource;

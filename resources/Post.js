const { ADMIN_TAB_NAME } = require("~/consts/utils");
const { Post } = require("~/models");
const { beforeEdit } = require("~/utils/admin-before-hooks");

const NO_EDIT_PROPS = ["author", "title", "content"];

const PostResource = {
  resource: Post,
  options: {
    actions: {
      edit: { before: [beforeEdit(...NO_EDIT_PROPS)] },
    },
    parent: ADMIN_TAB_NAME,
  },
};

module.exports = PostResource;

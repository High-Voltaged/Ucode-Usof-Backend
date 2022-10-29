const { ADMIN_TAB_NAME } = require("~/consts/utils");
const { Comment } = require("~/models");

const CommentResource = {
  resource: Comment,
  options: {
    actions: {
      edit: { isAccessible: false },
    },
    parent: ADMIN_TAB_NAME,
  },
};

module.exports = CommentResource;

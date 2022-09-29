const { ADMIN_TAB_NAME } = require("~/consts/utils");
const { Comment } = require("~/models");
const beforeEdit = require("~/utils/edit-action");

const NO_EDIT_PROPS = ["postId", "author", "content"];

const CommentResource = {
  resource: Comment,
  options: {
    actions: {
      edit: { before: [beforeEdit(...NO_EDIT_PROPS)] },
    },
    parent: ADMIN_TAB_NAME,
  },
};

module.exports = CommentResource;

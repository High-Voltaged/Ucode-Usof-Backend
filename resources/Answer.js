const { ADMIN_TAB_NAME } = require("~/consts/utils");
const { Answer } = require("~/models");
const { beforeEdit } = require("~/utils/admin-before-hooks");

const NO_EDIT_PROPS = ["postId", "author", "content"];

const AnswerResource = {
  resource: Answer,
  options: {
    actions: {
      edit: { before: [beforeEdit(...NO_EDIT_PROPS)] },
    },
    parent: ADMIN_TAB_NAME,
  },
};

module.exports = AnswerResource;

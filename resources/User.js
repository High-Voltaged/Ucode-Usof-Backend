const { ADMIN_TAB_NAME } = require("~/consts/utils");
const { User } = require("~/models");
const { beforeEdit } = require("~/utils/admin-before-hooks");

const NO_EDIT_PROPS = ["password"];

const UserResource = {
  resource: User,
  options: {
    actions: {
      edit: { before: [beforeEdit(...NO_EDIT_PROPS)] },
    },
    parent: ADMIN_TAB_NAME,
  },
};

module.exports = UserResource;

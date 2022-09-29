const { ADMIN_TAB_NAME } = require("~/consts/utils");
const { Like } = require("~/models");
const { beforeLikeCreate } = require("~/utils/admin-before-hooks");

const LikeResource = {
  resource: Like,
  options: {
    actions: {
      edit: { isAccessible: false },
      new: { before: beforeLikeCreate },
    },
    parent: ADMIN_TAB_NAME,
  },
};

module.exports = LikeResource;

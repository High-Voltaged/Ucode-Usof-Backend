const { ADMIN_TAB_NAME } = require("~/consts/utils");
const { Like } = require("~/models");

const LikeResource = {
  resource: Like,
  options: {
    actions: {
      edit: { isAccessible: false },
    },
    parent: ADMIN_TAB_NAME,
  },
};

module.exports = LikeResource;

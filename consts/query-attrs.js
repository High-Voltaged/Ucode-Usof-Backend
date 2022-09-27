const { Sequelize } = require("sequelize");

const USER_JOIN_ATTRS = [
  [Sequelize.literal("user.login"), "authorLogin"],
  [Sequelize.literal("user.avatar"), "authorAvatar"],
];

const POST_ATTRS = ["id", "author", ...USER_JOIN_ATTRS, "publishDate", "title", "content", "status"];

const COMMENT_ATTRS = ["id", "author", ...USER_JOIN_ATTRS, "publishDate", "content"];

const CATEGORY_ATTRS = ["id", "title", "description"];

const LIKE_ATTRS = ["id", "type", "author", ...USER_JOIN_ATTRS, "publishDate"];

const USER_ATTRS = ["id", "fullName", "login", "email", "rating", "avatar"];

module.exports = { POST_ATTRS, COMMENT_ATTRS, CATEGORY_ATTRS, LIKE_ATTRS, USER_ATTRS };

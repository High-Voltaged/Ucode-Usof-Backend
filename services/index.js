const AuthService = require("~/services/auth");
const EmailService = require("~/services/email");
const UserService = require("~/services/user");
const PostService = require("~/services/post");
const CategoryService = require("~/services/category");
const AnswerService = require("~/services/answer");
const CommentService = require("~/services/comment");
const LikeService = require("~/services/like");
const FactoryService = require("~/services/factory");
const TokenService = require("~/services/token");
const UploadsService = require("~/services/uploads");

module.exports = {
  AuthService,
  EmailService,
  UserService,
  PostService,
  CategoryService,
  CommentService,
  AnswerService,
  LikeService,
  FactoryService,
  TokenService,
  UploadsService,
};

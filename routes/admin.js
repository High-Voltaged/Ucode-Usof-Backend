const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const { Database, Resource } = require("@adminjs/sequelize");

const { AuthService } = require("~/services");
const {
  UserResource,
  PostResource,
  CategoryResource,
  CommentResource,
  LikeResource,
  PostCategoriesResource,
} = require("~/resources");

AdminJS.registerAdapter({ Database, Resource });

const ADMIN_OPTIONS = {
  resources: [UserResource, PostResource, CategoryResource, CommentResource, LikeResource, PostCategoriesResource],
  branding: {
    companyName: "UcodeQAPlatform",
  },
};

const admin = new AdminJS(ADMIN_OPTIONS);
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate: AuthService.adminAuthenticate,
    cookieName: "adminjs",
    cookiePassword: "password",
  },
  null,
  {
    saveUninitialized: true,
    resave: true,
  },
);

module.exports = { adminRouter, options: admin.options };

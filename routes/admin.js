const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const { Database, Resource } = require("@adminjs/sequelize");
const { User, Post, Category, Like, Comment, PostCategories } = require("~/models");

AdminJS.registerAdapter({ Database, Resource });

const ADMIN_OPTIONS = {
  resources: [User, Post, Category, Comment, Like, PostCategories],
  branding: {
    companyName: "UcodeQAPlatform",
    // logo: "https://yt3.ggpht.com/-OHYrig1wHfY/AAAAAAAAAAI/AAAAAAAAAC0/hO4PnXj_Zps/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg",
  },
};

const ADMIN_DETAILS = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const authenticate = async (email, password) => {
  if (email === ADMIN_DETAILS.email && password === ADMIN_DETAILS.password) {
    return Promise.resolve(ADMIN_DETAILS);
  }
  return null;
};

const admin = new AdminJS(ADMIN_OPTIONS);
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
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

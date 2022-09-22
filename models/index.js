const User = require("~/models/User");
const Post = require("~/models/Post");
const Category = require("~/models/Category");
const Comment = require("~/models/Comment");
const Like = require("~/models/Like");
// const Token = require("~/models/Token");

const authorOptions = { foreignKey: "author" };

User.hasMany(Post, authorOptions);
Post.belongsTo(User, authorOptions);

Category.belongsToMany(Post, { through: "postCategories" });
Post.belongsToMany(Category, { through: "postCategories" });

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Comment, authorOptions);
Comment.belongsTo(User, authorOptions);

User.hasMany(Like, authorOptions);
Like.belongsTo(User, authorOptions);

Comment.hasMany(Like);
Like.belongsTo(Comment);

Post.hasMany(Like);
Like.belongsTo(Post);

// User.hasOne(Token);
// Token.belongsTo(User);

module.exports = {
  User,
  Post,
  Category,
  Comment,
  Like,
};

const User = require("~/models/User");
const Post = require("~/models/Post");
const Category = require("~/models/Category");
const Comment = require("~/models/Comment");
const Like = require("~/models/Like");
const PostCategories = require("~/models/PostCategories");

const authorOptions = { foreignKey: "author" };

User.hasMany(Post, authorOptions);
Post.belongsTo(User, authorOptions);

Category.belongsToMany(Post, { through: PostCategories });
Post.belongsToMany(Category, { through: PostCategories });

Post.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(Post);

User.hasMany(Comment, authorOptions);
Comment.belongsTo(User, authorOptions);

User.hasMany(Like, authorOptions);
Like.belongsTo(User, authorOptions);

Comment.hasMany(Like, { onDelete: "CASCADE" });
Like.belongsTo(Comment);

Post.hasMany(Like, { onDelete: "CASCADE" });
Like.belongsTo(Post);

module.exports = {
  User,
  Post,
  Category,
  Comment,
  Like,
  PostCategories,
};

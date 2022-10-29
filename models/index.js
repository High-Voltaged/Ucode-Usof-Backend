const User = require("~/models/User");
const Post = require("~/models/Post");
const Category = require("~/models/Category");
const Answer = require("~/models/Answer");
const Like = require("~/models/Like");
const PostCategories = require("~/models/PostCategories");
const Comment = require("~/models/Comment");

const authorOptions = { foreignKey: "author" };

User.hasMany(Post, authorOptions);
Post.belongsTo(User, authorOptions);

Category.belongsToMany(Post, { through: PostCategories });
Post.belongsToMany(Category, { through: PostCategories });

Post.hasMany(Answer, { onDelete: "CASCADE" });
Answer.belongsTo(Post);

User.hasMany(Answer, authorOptions);
Answer.belongsTo(User, authorOptions);

User.hasMany(Comment, authorOptions);
Comment.belongsTo(User, authorOptions);

User.hasMany(Like, authorOptions);
Like.belongsTo(User, authorOptions);

Answer.hasMany(Like, { onDelete: "CASCADE" });
Like.belongsTo(Answer);

Answer.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(Answer);

Post.hasMany(Like, { onDelete: "CASCADE" });
Like.belongsTo(Post);

module.exports = {
  User,
  Post,
  Category,
  Answer,
  Comment,
  Like,
  PostCategories,
};

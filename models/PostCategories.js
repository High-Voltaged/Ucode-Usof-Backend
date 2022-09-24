const { DataTypes, Model } = require("sequelize");
const sequelize = require("~/database");
const Post = require("~/models/Post");
const Category = require("~/models/Category");

class PostCategories extends Model {}

PostCategories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: Post,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: Category,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "postCategories",
  },
);

module.exports = PostCategories;

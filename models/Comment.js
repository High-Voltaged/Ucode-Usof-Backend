const { DataTypes, Model } = require("sequelize");
const { STATUS_ENUM, CONTENT_LIMITS, RANGE_ERROR } = require("~/consts/validation");
const sequelize = require("~/database");
const User = require("~/models/User");
const Post = require("~/models/Post");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: { model: Post },
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER,
      references: { model: User },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: { args: CONTENT_LIMITS, msg: RANGE_ERROR(CONTENT_LIMITS) },
      },
    },
    status: {
      type: DataTypes.ENUM(...STATUS_ENUM),
      defaultValue: STATUS_ENUM[0],
    },
  },
  {
    sequelize,
    modelName: "comment",
    createdAt: "publishDate",
  },
);

module.exports = Comment;

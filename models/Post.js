const { DataTypes, Model } = require("sequelize");
const { STATUS_ENUM, TITLE_LIMITS, RANGE_ERROR, CONTENT_LIMITS } = require("~/consts/validation");
const sequelize = require("~/database");
const User = require("~/models/User");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: TITLE_LIMITS, msg: RANGE_ERROR(TITLE_LIMITS) },
      },
    },
    status: {
      type: DataTypes.ENUM(...STATUS_ENUM),
      defaultValue: STATUS_ENUM[0],
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: { args: CONTENT_LIMITS, msg: RANGE_ERROR(CONTENT_LIMITS) },
      },
    },
    author: {
      type: DataTypes.INTEGER,
      references: { model: User },
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "post",
    createdAt: "publishDate",
  },
);

module.exports = Post;

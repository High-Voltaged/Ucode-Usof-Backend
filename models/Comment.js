const { DataTypes, Model } = require("sequelize");
const { CONTENT_LIMITS, RANGE_ERROR } = require("~/consts/validation");
const sequelize = require("~/database");
const User = require("~/models/User");
const Answer = require("~/models/Answer");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    answerId: {
      type: DataTypes.INTEGER,
      references: { model: Answer },
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
  },
  {
    sequelize,
    modelName: "comment",
    createdAt: "publishDate",
  },
);

module.exports = Comment;

const { DataTypes, Model } = require("sequelize");
const { STATUS_ENUM } = require("~/consts/validation");
const sequelize = require("~/database");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.STRING,
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

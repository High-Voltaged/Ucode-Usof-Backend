const { DataTypes, Model } = require("sequelize");
const { STATUS_ENUM } = require("~/consts/validation");
const sequelize = require("~/database");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM(...STATUS_ENUM),
      defaultValue: STATUS_ENUM[0],
    },
    content: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "post",
    createdAt: "publishDate",
  },
);

module.exports = Post;

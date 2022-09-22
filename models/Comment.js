const { DataTypes, Model } = require("sequelize");
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
  },
  {
    sequelize,
    modelName: "comment",
    updatedAt: "publishDate",
  },
);

module.exports = Comment;

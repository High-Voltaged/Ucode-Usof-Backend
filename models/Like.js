const { DataTypes, Model } = require("sequelize");
const { LIKES_ENUM } = require("~/consts/validation");
const sequelize = require("~/database");
const User = require("~/models/User");

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM(...LIKES_ENUM),
      defaultValue: LIKES_ENUM[0],
    },
    author: {
      type: DataTypes.INTEGER,
      references: { model: User },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "like",
    createdAt: "publishDate",
  },
);

module.exports = Like;

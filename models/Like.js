const { DataTypes, Model } = require("sequelize");
const { LIKES_ENUM } = require("~/consts/validation");
const sequelize = require("~/database");

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
  },
  {
    sequelize,
    modelName: "like",
    updatedAt: "publishDate",
  },
);

module.exports = Like;

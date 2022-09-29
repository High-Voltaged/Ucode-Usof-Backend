const { DataTypes, Model } = require("sequelize");
const { CONTENT_LIMITS, TITLE_LIMITS, RANGE_ERROR } = require("~/consts/validation");
const sequelize = require("~/database");

class Category extends Model {}

Category.init(
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
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: { args: CONTENT_LIMITS, msg: RANGE_ERROR(CONTENT_LIMITS) },
      },
    },
  },
  {
    sequelize,
    modelName: "category",
  },
);

module.exports = Category;

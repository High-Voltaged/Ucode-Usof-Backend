const { DataTypes, Model } = require("sequelize");
const sequelize = require("~/database");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "category",
  },
);

module.exports = Category;

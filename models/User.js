const { DataTypes, Model } = require("sequelize");
const sequelize = require("~/database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = User;

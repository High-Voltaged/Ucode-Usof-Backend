const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
};

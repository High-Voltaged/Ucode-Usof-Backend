const sequelize = require("~/database");
const { DataTypes, Model } = require("sequelize");
const { ROLES_ENUM, NAME_LIMITS } = require("~/consts/validation");
const { hashPassword } = require("~/utils/password");

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
      validate: {
        len: { args: NAME_LIMITS },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      validate: {
        len: { args: NAME_LIMITS },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    role: {
      type: DataTypes.ENUM(...ROLES_ENUM),
      defaultValue: ROLES_ENUM[0],
    },
    isEmailConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  },
);

User.beforeValidate(async (user) => {
  user.password = await hashPassword(user.password);
  return user;
});

module.exports = User;

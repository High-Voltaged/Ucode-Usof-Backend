const sequelize = require("~/database");
const { DataTypes, Model } = require("sequelize");
const { ROLES_ENUM, NAME_LIMITS, RANGE_ERROR } = require("~/consts/validation");
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
        len: { args: NAME_LIMITS, msg: RANGE_ERROR(NAME_LIMITS) },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      validate: {
        len: { args: NAME_LIMITS, msg: RANGE_ERROR(NAME_LIMITS) },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: { msg: `Please provide correct email format.` } },
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    rating: {
      type: DataTypes.INTEGER,
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

User.beforeCreate(async (user) => {
  user.password = await hashPassword(user.password);
  return user;
});

module.exports = User;

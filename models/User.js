const { DataTypes, Model } = require("sequelize");
const { ROLES_ENUM, NAME_LIMITS } = require("~/consts/validation");
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
      validate: {
        len: {
          msg: `The login must be in the range of [${NAME_LIMITS.join(", ")}] characters.`,
          args: NAME_LIMITS,
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: `The full name must be in the range of [${NAME_LIMITS.join(", ")}] characters.`,
          args: NAME_LIMITS,
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: `The proper email format is: test@gmail.com`,
        },
      },
    },
    // avatar: {
    //   type: DataTypes.STRING,
    // }
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
    modelName: "User",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = User;

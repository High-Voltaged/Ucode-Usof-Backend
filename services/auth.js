const { User } = require("~/models");
const ServerError = require("~/utils/errors");
const bcrypt = require("bcrypt");
const { isPassWithinLimits, arePasswordsMatched, isPasswordCorrect } = require("~/utils/password");
const { generateToken } = require("~/services/token");

const register = async (login, email, fullName, password, passwordConfirm) => {
  const userWithLogin = await User.findOne({ where: { login } });
  if (userWithLogin) {
    throw new ServerError(400, "The user with this login already exists.");
  }
  const userWithEmail = await User.findOne({ where: { email } });
  if (userWithEmail) {
    throw new ServerError(400, "The user with this email already exists.");
  }

  arePasswordsMatched(password, passwordConfirm);
  isPassWithinLimits(password);

  const hashedPassword = await bcrypt.hash(password, 12);

  const { id } = await User.create({ login, password: hashedPassword, email, fullName });
  return { id };
};

const login = async (login, email, password) => {
  const user = await User.findOne({ where: { email, login } });
  if (!user) {
    throw new ServerError(404, "A user with this login or email was not found");
  }

  const passwordCorrect = await isPasswordCorrect(password, user.password);
  if (!passwordCorrect) {
    throw new ServerError(401, "The password is not correct.");
  }

  if (!user.isEmailConfirmed) {
    throw new ServerError(401, "Please confirm your email before logging in.");
  }

  const { id, role } = user;
  const token = generateToken({ id, role });

  return token;
};

module.exports = {
  register,
  login,
};

const bcrypt = require("bcrypt");
const ServerError = require("./errors");

const arePasswordsMatched = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    throw new ServerError(404, "The passwords do not match.");
  }
};

const isPasswordCorrect = async (password, originalPassword) => {
  return await bcrypt.compare(password, originalPassword);
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

module.exports = {
  arePasswordsMatched,
  isPasswordCorrect,
  hashPassword,
};

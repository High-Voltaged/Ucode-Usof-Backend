const bcrypt = require("bcrypt");
const { PASSWORD_LIMITS } = require("~/consts/validation");
const ServerError = require("./errors");

const isPassWithinLimits = (password) => {
  if (password.length < PASSWORD_LIMITS[0] || password.length > PASSWORD_LIMITS[1]) {
    throw new ServerError(400, `The password must be in the range of [${PASSWORD_LIMITS.join(", ")}] characters`);
  }
};

const arePasswordsMatched = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    throw new ServerError(404, "The passwords do not match.");
  }
};

const isPasswordCorrect = async (password, originalPassword) => {
  return await bcrypt.compare(password, originalPassword);
};

module.exports = {
  isPassWithinLimits,
  arePasswordsMatched,
  isPasswordCorrect,
};

const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const generateToken = (payload) => {
  const expiresIn = process.env.TOKEN_EXPIRES_IN;
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn });
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, TOKEN_SECRET);
  } catch (_err) {
    return null;
  }
};

module.exports = {
  generateToken,
  validateToken,
};

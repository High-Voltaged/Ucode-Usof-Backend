const { User } = require("~/models");
const TokenService = require("~/services/token");
const ServerError = require("~/utils/errors");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    next(new ServerError(401, "The authorization token is invalid or has expired."));
  }

  const userData = await TokenService.validateToken(token);
  if (!userData) {
    next(new ServerError(401, "The authorization token is invalid or has expired."));
  }

  const user = await User.findOne({ where: { id: userData.id } });
  if (!user) {
    next(new ServerError(404, `The user with the ${userData.id} id was not found.`));
  }

  req.user = user;
  next();
};

module.exports = authMiddleware;

const tokens = { ACCESS_TOKEN: "accessToken", REFRESH_TOKEN: "refreshToken" };

const ONE_DAY = 86400000;

const COOKIE_OPTIONS = {
  maxAge: ONE_DAY,
  httpOnly: true,
  secure: true,
  sameSite: "none",
  domain: "localhost",
};

module.exports = { tokens, COOKIE_OPTIONS };

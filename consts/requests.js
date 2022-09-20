const ACCESS_TOKEN = "accessToken";

const ONE_DAY = 86400000;

const COOKIE_OPTIONS = {
  maxAge: ONE_DAY,
  httpOnly: true,
  secure: false,
  sameSite: "none",
  domain: "localhost",
};

module.exports = { ACCESS_TOKEN, COOKIE_OPTIONS };

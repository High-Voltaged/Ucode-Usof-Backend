const { ACCESS_TOKEN, COOKIE_OPTIONS } = require("~/consts/requests");
const AuthService = require("~/services/auth");
const TokenService = require("~/services/token");

const register = async (req, res) => {
  const { login, email, fullName, password, passwordConfirm } = req.body;

  const { id } = await AuthService.register(login, email, fullName, password, passwordConfirm);

  res.json({
    data: { id },
  });
};

const login = async (req, res) => {
  const { login, email, password } = req.body;

  const token = await AuthService.login(login, email, password);

  res.cookie(ACCESS_TOKEN, token, COOKIE_OPTIONS);

  res.json({
    accessToken: token,
  });
};

const logout = async (req, res) => {
  const { accessToken } = req.cookies;

  res.clearCookie(ACCESS_TOKEN);
  await TokenService.destroyToken(accessToken);

  res.sendStatus(204);
};

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  await AuthService.sendResetPasswordEmail(email);

  res.sendStatus(204);
};

const updatePassword = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  await AuthService.updatePassword(resetToken, password);

  res.sendStatus(204);
};

const confirmEmail = async (req, res) => {
  const { confirmToken } = req.params;

  await AuthService.confirmEmail(confirmToken);

  res.sendStatus(204);
};

module.exports = {
  register,
  login,
  logout,
  sendResetPasswordEmail,
  updatePassword,
  confirmEmail,
};

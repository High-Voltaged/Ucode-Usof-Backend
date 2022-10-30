const { tokens, COOKIE_OPTIONS } = require("~/consts/requests");
const { AuthService } = require("~/services");

const register = async (req, res) => {
  const { login, email, fullName, password, passwordConfirm } = req.body;

  const { id } = await AuthService.register(login, email, fullName, password, passwordConfirm);

  res.json({ data: { id } });
};

const login = async (req, res) => {
  const { login, password } = req.body;

  const { accessToken, refreshToken } = await AuthService.login(login, password);

  res.cookie(tokens.REFRESH_TOKEN, refreshToken, COOKIE_OPTIONS);

  res.json({ accessToken, refreshToken });
};

const refresh = async (req, res) => {
  const { refreshToken: token } = req.cookies;

  const { accessToken, refreshToken } = await AuthService.refresh(token);

  res.cookie(tokens.REFRESH_TOKEN, refreshToken, COOKIE_OPTIONS);

  res.json({ accessToken, refreshToken });
};

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  res.clearCookie(tokens.REFRESH_TOKEN);
  await AuthService.logout(refreshToken);

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
  refresh,
  sendResetPasswordEmail,
  updatePassword,
  confirmEmail,
};

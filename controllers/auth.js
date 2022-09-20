const { ACCESS_TOKEN, COOKIE_OPTIONS } = require("~/consts/requests");
const { register: registerUser, login: loginUser } = require("~/services/auth");

const register = async (req, res) => {
  const { login, email, fullName, password, passwordConfirm } = req.body;

  const { id } = await registerUser(login, email, fullName, password, passwordConfirm);

  res.json({
    data: { id },
  });
};

const login = async (req, res) => {
  const { login, email, password } = req.body;

  const token = await loginUser(login, email, password);

  res.cookie(ACCESS_TOKEN, token, COOKIE_OPTIONS);

  res.json({
    accessToken: token,
  });
};

const logout = async (req, res) => {
  res.clearCookie(ACCESS_TOKEN);

  res.sendStatus(204);
};

module.exports = {
  register,
  login,
  logout,
};

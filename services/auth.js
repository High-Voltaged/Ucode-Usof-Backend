const { User } = require("~/models");
const ServerError = require("~/utils/errors");
const { arePasswordsMatched, isPasswordCorrect } = require("~/utils/password");
const TokenService = require("~/services/token");
const EmailService = require("~/services/email");
const emailSubjects = require("~/consts/emails");
const { ROLES_ENUM } = require("~/consts/validation");

class AuthService {
  static async adminAuthenticate(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    if (user.role !== ROLES_ENUM[1]) {
      return null;
    }

    const passwordCorrect = await isPasswordCorrect(password, user.password);
    if (!passwordCorrect) {
      return null;
    }

    return user;
  }

  static async register(login, email, fullName, password, passwordConfirm) {
    const userWithLogin = await User.findOne({ where: { login } });
    if (userWithLogin) {
      throw new ServerError(400, "The user with this login already exists.");
    }
    const userWithEmail = await User.findOne({ where: { email } });
    if (userWithEmail) {
      throw new ServerError(400, "The user with this email already exists.");
    }

    arePasswordsMatched(password, passwordConfirm);

    const { id } = await User.create({ login, password, email, fullName });

    const confirmToken = await TokenService.generateToken({ id });
    await EmailService.sendMail(email, emailSubjects.EMAIL_CONFIRM, { confirmToken, login });

    return { id };
  }

  static async login(login, email, password) {
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
    const token = await TokenService.generateToken({ id, role });

    return token;
  }

  static async logout(token) {
    const data = await TokenService.validateToken(token);
    if (!data || !data.jti) {
      return;
    }

    await TokenService.destroyToken(data.jti);
  }

  static async sendResetPasswordEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ServerError(404, "A user with this email doesn't exist.");
    }

    const userData = { id: user.id };
    const resetToken = await TokenService.generateToken(userData);

    const data = { fullName: user.fullName, resetToken };
    await EmailService.sendMail(email, emailSubjects.RESET_PASSWORD, data);
  }

  static async updatePassword(resetToken, password) {
    const userData = await TokenService.validateToken(resetToken);
    if (!userData) {
      throw new ServerError(400, "The reset token is invalid or has expired.");
    }

    const { id } = userData;

    await User.update({ password }, { where: { id } });

    await TokenService.destroyToken(userData.jti);
  }

  static async confirmEmail(confirmToken) {
    const userData = await TokenService.validateToken(confirmToken);
    if (!userData) {
      throw new ServerError(400, "The confirm token is invalid or has expired.");
    }

    const { id } = userData;
    await User.update({ isEmailConfirmed: true }, { where: { id } });

    await TokenService.destroyToken(userData.jti);
  }
}

module.exports = AuthService;

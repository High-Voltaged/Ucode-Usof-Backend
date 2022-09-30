const { ADMIN_OPTIONS } = require("~/consts/database");
const { USER_ATTRS } = require("~/consts/query-attrs");
const { User } = require("~/models");

class UserService {
  static async getUsers() {
    return await User.findAll({ attributes: USER_ATTRS });
  }

  static async updateUserPhoto(id, filename) {
    await User.update({ avatar: filename }, { where: { id } });
  }

  static async createAdminIfNotExists() {
    const admin = await User.findOne({ where: { email: ADMIN_OPTIONS.email } });
    if (admin) {
      return;
    }

    await User.create({ ...ADMIN_OPTIONS, isEmailConfirmed: true });
  }
}

module.exports = UserService;

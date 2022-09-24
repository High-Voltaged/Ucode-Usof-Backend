const { USER_ATTRS } = require("~/consts/query-attrs");
const { User } = require("~/models");
const ServerError = require("~/utils/errors");
const fieldFilter = require("~/utils/field-filter");

class UserService {
  static async getUsers() {
    return await User.findAll({ attributes: USER_ATTRS });
  }

  static async getUser(id) {
    const user = await User.findOne({ attributes: USER_ATTRS, where: { id } });
    if (!user) {
      throw new ServerError(404, `The user with the ${id} id was not found.`);
    }

    return user;
  }

  static async updateUser(id, data) {
    const dataToUpdate = fieldFilter(data, "fullName", "login", "email");
    await User.update(dataToUpdate, { where: { id } });
  }

  static async updateUserPhoto(id, filename) {
    const dataToUpdate = fieldFilter({ avatar: filename }, "avatar");
    await User.update(dataToUpdate, { where: { id } });
  }

  static async deleteUser(id) {
    await User.destroy({ where: { id } });
  }
}

module.exports = UserService;

const { User } = require("~/models");
const ServerError = require("~/utils/errors");

class UserService {
  static getAllowedData(data, ...allowed) {
    let result = {};
    const fields = Object.keys(data);
    for (const el of fields) {
      if (allowed.includes(el)) {
        result[el] = data[el];
      }
    }
    return result;
  }

  static async getUsers() {
    const users = await User.findAll();

    const result = users.map((user) =>
      UserService.getAllowedData(user.dataValues, "fullName", "login", "email", "rating"),
    );
    return result;
  }

  static async getUser(id) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new ServerError(404, `The user with the ${id} id was not found.`);
    }

    const dataAllowed = UserService.getAllowedData(user.dataValues, "fullName", "login", "email", "rating");
    return dataAllowed;
  }

  static async updateUser(id, data) {
    const dataToUpdate = UserService.getAllowedData(data, "fullName", "login", "email");
    await User.update(dataToUpdate, { where: { id } });
  }

  static async updateUserPhoto(id, filename) {
    const dataToUpdate = UserService.getAllowedData({ avatar: filename }, "avatar");
    await User.update(dataToUpdate, { where: { id } });
  }

  static async deleteUser(id) {
    await User.destroy({ where: { id } });
  }
}

module.exports = UserService;

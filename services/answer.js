const { ANSWER_ATTRS } = require("~/consts/query-attrs");
const { SORT_BY, SORT_ORDER } = require("~/consts/sequelize");
const { Answer, User } = require("~/models");

class AnswerService {
  static async getAnswersByPostID(postId) {
    const include = [{ model: User, attributes: [] }];

    const order = [[SORT_BY.likes, SORT_ORDER.DESC]];

    return await Answer.findAll({
      attributes: ANSWER_ATTRS,
      include,
      where: { postId },
      order,
    });
  }

  static async getAnswer(id) {
    return await Answer.findByPk(id, {
      attributes: ANSWER_ATTRS,
      include: { model: User, attributes: [], required: true },
    });
  }

  static async createAnswer(postId, data, author) {
    await Answer.create({ postId, ...data, author });
  }
}

module.exports = AnswerService;

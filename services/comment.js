const { COMMENT_ATTRS } = require("~/consts/query-attrs");
const { Comment, User } = require("~/models");

class CommentService {
  static async getCommentsByAnswerID(answerId) {
    const include = [{ model: User, attributes: [] }];

    return await Comment.findAll({
      attributes: COMMENT_ATTRS,
      include,
      where: { answerId },
    });
  }
}

module.exports = CommentService;

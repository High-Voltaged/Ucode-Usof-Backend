const { COMMENT_ATTRS } = require("~/consts/query-attrs");
const { Comment, User } = require("~/models");

class CommentService {
  static async getCommentsByPostID(postId) {
    const include = [{ model: User, attributes: [] }];

    return await Comment.findAll({
      attributes: COMMENT_ATTRS,
      include,
      where: { postId },
    });
  }

  static async getComment(id) {
    return await Comment.findByPk(id, {
      attributes: COMMENT_ATTRS,
      include: { model: User, attributes: [], required: true },
    });
  }

  static async createComment(postId, data, author) {
    await Comment.create({ postId, ...data, author });
  }
}

module.exports = CommentService;

const { COMMENT_ATTRS } = require("~/consts/query-attrs");
const { Comment, User } = require("~/models");

class CommentService {
  static async getCommentsByPostID(postId) {
    const include = [
      {
        model: User,
        attributes: [],
      },
    ];

    return await Comment.findAll({
      attributes: COMMENT_ATTRS,
      include,
      where: { postId },
    });
  }

  static async createComment(postId, content, author) {
    await Comment.create({
      postId,
      content,
      author,
    });
  }
}

module.exports = CommentService;

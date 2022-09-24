const { COMMENT_ATTRS } = require("~/consts/query-attrs");
const { Comment, User } = require("~/models");

class CommentService {
  static async getCommentsByPostID(postId) {
    const comments = await Comment.findAll({
      attributes: COMMENT_ATTRS,
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
      where: { postId },
    });

    return comments;
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

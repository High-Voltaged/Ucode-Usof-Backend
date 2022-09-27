const { COMMENT_ATTRS } = require("~/consts/query-attrs");
const { Comment, User } = require("~/models");
const ServerError = require("~/utils/errors");

class CommentService {
  static async checkIfCommentExists(id) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new ServerError(404, `A comment with the ${id} id was not found.`);
    }
  }

  static async checkCommentAuthor(commentId, authorID) {
    const comment = await CommentService.getComment(commentId);
    if (authorID !== comment.dataValues.author) {
      throw new ServerError(401, "You don't have the rights to edit nor remove this comment.");
    }
  }

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

  static async getComment(id) {
    return await Comment.findByPk(id, {
      attributes: COMMENT_ATTRS,
      include: {
        model: User,
        attributes: [],
        required: true,
      },
    });
  }

  static async createComment(postId, data, author) {
    await Comment.create({
      postId,
      ...data,
      author,
    });
  }

  static async updateComment(id, data) {
    await Comment.update(data, { where: { id } });
  }

  static async deleteComment(id) {
    await Comment.destroy({ where: { id } });
  }
}

module.exports = CommentService;

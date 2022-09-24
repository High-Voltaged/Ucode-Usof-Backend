const { LIKE_ATTRS } = require("~/consts/query-attrs");
const { Like, Post } = require("~/models");

class LikeService {
  static async getPostLikes(postId) {
    const likes = await Like.findAll({
      attributes: LIKE_ATTRS,
      include: {
        model: Post,
        attributes: [],
        where: { id: postId },
      },
    });

    return likes;
  }

  static async createPostLike(type, postId, author) {
    await Like.create({
      type,
      postId,
      author,
    });
  }
}

module.exports = LikeService;

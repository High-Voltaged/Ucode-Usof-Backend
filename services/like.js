const { LIKE_ATTRS } = require("~/consts/query-attrs");
const { Like, User, ...models } = require("~/models");
const ServerError = require("~/utils/errors");

class LikeService {
  static async checkLikeAuthor(entity, author) {
    const like = await LikeService.getLike(author, entity);
    if (!like) {
      throw new ServerError(401, "You can not access this like.");
    }
    return like;
  }

  static async getLikes(entity) {
    const likes = await Like.findAll({
      attributes: LIKE_ATTRS,
      include: [
        {
          model: models[entity.model],
          attributes: [],
          where: { id: entity.value },
          required: true,
        },
        { model: User, attributes: [] },
      ],
    });

    return likes;
  }

  static async getLike(author, entity) {
    return await Like.findOne({ where: { author, [entity.key]: entity.value } });
  }

  // static async updateLikeType(like) {
  //   const isLike = like.type === LIKES_ENUM[0];
  //   await like.update({
  //     type: isLike ? LIKES_ENUM[1] : LIKES_ENUM[0],
  //   });
  // }

  static async createLike(author, type, entity) {
    const like = await LikeService.getLike(author, entity);
    if (like) {
      throw new ServerError(400, "You can not like/dislike more than once.");
      // await this.updateLikeType(like);
      // return;
    }

    await Like.create({ type, [entity.key]: entity.value, author });
  }

  static async deleteLike(author, entity) {
    const like = await LikeService.checkLikeAuthor(entity, author);
    await like.destroy();
  }
}

module.exports = LikeService;

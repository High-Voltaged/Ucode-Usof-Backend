const { LIKE_ATTRS } = require("~/consts/query-attrs");
const { LIKES_ENUM } = require("~/consts/validation");
const { Like, User, ...models } = require("~/models");
const ServerError = require("~/utils/errors");
const FactoryService = require("./factory");

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

  static async changeEntityRating(id, type, model) {
    const entity = await FactoryService.getOne(model, id);
    if (!entity) {
      return;
    }

    if (type === LIKES_ENUM[0]) {
      await entity.increment("rating");
    } else {
      await entity.decrement("rating");
    }
  }

  static async createLike(author, type, entity) {
    const like = await LikeService.getLike(author, entity);
    if (like) {
      await LikeService.deleteLike(author, entity);
      if (like.type === type) {
        return;
      }
    }

    await Like.create({ type, [entity.key]: entity.value, author });

    const likeEntity = await FactoryService.getOne(models[entity.model], entity.value);

    await LikeService.changeEntityRating(likeEntity.dataValues.author, type, User);
    await LikeService.changeEntityRating(entity.value, type, models[entity.model]);
  }

  static async deleteLike(author, entity) {
    const like = await LikeService.checkLikeAuthor(entity, author);
    const type = like.type === LIKES_ENUM[0] ? LIKES_ENUM[1] : LIKES_ENUM[0];

    const likeEntity = await FactoryService.getOne(models[entity.model], entity.value);
    await LikeService.changeEntityRating(likeEntity.dataValues.author, type, User);
    await LikeService.changeEntityRating(entity.value, type, models[entity.model]);

    await like.destroy();
  }
}

module.exports = LikeService;

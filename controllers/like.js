const { LIKE_ENTITIES } = require("~/consts/sequelize");
const LikeService = require("~/services/like");

const getLikes = (entity) => async (req, res) => {
  const id = req.params[`${entity}Id`];
  const likeEntity = LIKE_ENTITIES[entity](id);

  const likes = await LikeService.getLikes(likeEntity);

  res.json(likes);
};

const createLike = (entity) => async (req, res) => {
  const id = req.params[`${entity}Id`];
  const { id: userId } = req.user;
  const { type } = req.body;
  const likeEntity = LIKE_ENTITIES[entity](id);

  await LikeService.createLike(userId, type, likeEntity);

  res.sendStatus(204);
};

const deleteLike = (entity) => async (req, res) => {
  const id = req.params[`${entity}Id`];
  const { id: userId } = req.user;
  const likeEntity = LIKE_ENTITIES[entity](id);

  await LikeService.deleteLike(userId, likeEntity);

  res.sendStatus(204);
};

module.exports = { getLikes, createLike, deleteLike };

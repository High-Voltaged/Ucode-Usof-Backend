const { LIKE_ENTITIES } = require("~/consts/sequelize");
const LikeService = require("~/services/like");

const getPostLikes = async (req, res) => {
  const { postId } = req.params;
  const entity = LIKE_ENTITIES.POST(postId);

  const likes = await LikeService.getLikes(entity);

  res.json(likes);
};

const createLike = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  const { type } = req.body;
  const entity = LIKE_ENTITIES.POST(postId);

  await LikeService.createLike(id, type, entity);

  res.sendStatus(204);
};

const deleteLike = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  const entity = LIKE_ENTITIES.POST(postId);

  await LikeService.deleteLike(id, entity);

  res.sendStatus(204);
};

const likeAuthorValidation = async (req, res, next) => {
  const { postId } = req.params;
  const { id } = req.user;
  const entity = LIKE_ENTITIES.POST(postId);

  await LikeService.checkLikeAuthor(entity, id);

  next();
};

module.exports = { getPostLikes, createLike, deleteLike, likeAuthorValidation };

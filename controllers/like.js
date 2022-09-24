const LikeService = require("~/services/like");

const getPostLikes = async (req, res) => {
  const { postId } = req.params;

  const likes = await LikeService.getPostLikes(postId);

  res.json(likes);
};

module.exports = {
  getPostLikes,
};

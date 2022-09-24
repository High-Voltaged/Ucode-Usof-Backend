const CommentService = require("~/services/comment");

const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await CommentService.getCommentsByPostID(postId);

  res.json(comments);
};

const createPostComment = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  const { content } = req.body;

  await CommentService.createComment(postId, content, id);

  res.sendStatus(204);
};

module.exports = {
  getPostComments,
  createPostComment,
};

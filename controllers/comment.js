const CommentService = require("~/services/comment");

const getComment = async (req, res) => {
  const { commentId } = req.params;
  const comment = await CommentService.getComment(commentId);

  res.json(comment);
};

const updateComment = async (req, res) => {
  const data = req.body;
  const { commentId } = req.params;
  await CommentService.updateComment(commentId, data);

  res.sendStatus(204);
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  await CommentService.deleteComment(commentId);

  res.sendStatus(204);
};

const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await CommentService.getCommentsByPostID(postId);

  res.json(comments);
};

const createPostComment = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  const data = req.body;

  await CommentService.createComment(postId, data, id);

  res.sendStatus(204);
};

const commentExistenceCheck = async (req, _res, next) => {
  const { commentId } = req.params;

  await CommentService.checkIfCommentExists(commentId);

  next();
};

const commentAuthorValidation = async (req, _res, next) => {
  const { commentId } = req.params;
  const { id } = req.user;

  await CommentService.checkCommentAuthor(commentId, id);

  next();
};

module.exports = {
  getComment,
  updateComment,
  deleteComment,
  getPostComments,
  createPostComment,
  commentExistenceCheck,
  commentAuthorValidation,
};

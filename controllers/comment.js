const { Comment } = require("~/models");
const { authorValidation, existenceCheck, updateOne, deleteOne } = require("~/controllers/factory");
const { CommentService, FactoryService } = require("~/services");

const getComment = async (req, res) => {
  const { id } = req.params;
  const comment = await CommentService.getComment(id);

  res.json(comment);
};

const getPostComments = async (req, res) => {
  const { id } = req.params;

  const comments = await CommentService.getCommentsByPostID(id);

  res.json(comments);
};

const createPostComment = async (req, res) => {
  const { id: postId } = req.params;
  const { id: author } = req.user;
  const data = req.body;

  await FactoryService.createOne(Comment, { postId, author, ...data });

  res.sendStatus(204);
};

const updateComment = updateOne(Comment);
const deleteComment = deleteOne(Comment);

const commentExistenceCheck = existenceCheck(Comment);

const commentAuthorValidation = authorValidation(Comment);

module.exports = {
  getComment,
  updateComment,
  deleteComment,
  getPostComments,
  createPostComment,
  commentExistenceCheck,
  commentAuthorValidation,
};

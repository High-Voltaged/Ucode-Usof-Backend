const { Comment } = require("~/models");
const { authorValidation, existenceCheck, deleteOne, updateOne } = require("~/controllers/factory");
const { CommentService, FactoryService } = require("~/services");

const getAnswerComments = async (req, res) => {
  const { id } = req.params;

  const comments = await CommentService.getCommentsByAnswerID(id);

  res.json(comments);
};

const createComment = async (req, res) => {
  const { id: answerId } = req.params;
  const { id: author } = req.user;
  const data = req.body;

  await FactoryService.createOne(Comment, { answerId, author, ...data });

  res.sendStatus(204);
};

const updateComment = updateOne(Comment);
const deleteComment = deleteOne(Comment);
const commentExistenceCheck = existenceCheck(Comment);
const commentAuthorValidation = authorValidation(Comment);

module.exports = {
  getAnswerComments,
  updateComment,
  deleteComment,
  createComment,
  commentExistenceCheck,
  commentAuthorValidation,
};

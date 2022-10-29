const { Answer } = require("~/models");
const { authorValidation, existenceCheck, updateOne, deleteOne } = require("~/controllers/factory");
const { AnswerService, FactoryService } = require("~/services");

const getAnswer = async (req, res) => {
  const { id } = req.params;
  const answer = await AnswerService.getAnswer(id);

  res.json(answer);
};

const getPostAnswers = async (req, res) => {
  const { id } = req.params;

  const answers = await AnswerService.getAnswersByPostID(id);

  res.json(answers);
};

const createPostAnswer = async (req, res) => {
  const { id: postId } = req.params;
  const { id: author } = req.user;
  const data = req.body;

  await FactoryService.createOne(Answer, { postId, author, ...data });

  res.sendStatus(204);
};

const updateAnswer = updateOne(Answer);
const deleteAnswer = deleteOne(Answer);

const answerExistenceCheck = existenceCheck(Answer);

const answerAuthorValidation = authorValidation(Answer);

module.exports = {
  getAnswer,
  updateAnswer,
  deleteAnswer,
  getPostAnswers,
  createPostAnswer,
  answerExistenceCheck,
  answerAuthorValidation,
};

const { FactoryService } = require("~/services");

const getOne = (Model) => async (req, res) => {
  const { id } = req.params;
  const entity = await FactoryService.getOne(Model, id);

  res.json(entity);
};

const createOne = (Model) => async (req, res) => {
  const data = req.body;
  const { id } = await FactoryService.createOne(Model, data);

  res.json({ data: { id } });
};

const updateOne = (Model) => async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  await FactoryService.updateOne(Model, id, data);

  res.sendStatus(204);
};

const deleteOne = (Model) => async (req, res) => {
  const { id } = req.params;
  await FactoryService.deleteOne(Model, id);

  res.sendStatus(204);
};

const existenceCheck = (Model) => async (req, _res, next) => {
  const { id } = req.params;

  await FactoryService.existenceCheck(Model, id);

  next();
};

const authorValidation = (Model) => async (req, _res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  await FactoryService.authorValidation(Model, id, userId);

  next();
};

module.exports = { getOne, createOne, updateOne, deleteOne, existenceCheck, authorValidation };

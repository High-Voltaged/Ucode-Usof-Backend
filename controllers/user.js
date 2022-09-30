const multerUpload = require("~/utils/multer");
const { User } = require("~/models");
const { UserService, FactoryService, UploadsService, PostService } = require("~/services");
const { existenceCheck } = require("~/controllers/factory");
const { USER_ATTRS } = require("~/consts/query-attrs");

const getUsers = async (_req, res) => {
  const users = await UserService.getUsers();

  res.json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await FactoryService.getOne(User, id, { attributes: USER_ATTRS });

  res.json(user);
};

const updateUser = async (req, res) => {
  const data = req.body;
  const { id } = req.user;

  await FactoryService.updateOne(User, id, data);

  res.sendStatus(204);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  await FactoryService.deleteOne(User, id);

  res.sendStatus(204);
};

const uploadPhoto = multerUpload.single("photo");

const resizeAndSavePhoto = async (req, _res, next) => {
  const { id } = req.user;

  req.file = await UploadsService.resizeAndSaveAvatar(req.file, id);

  next();
};

const updateUserPhoto = async (req, res) => {
  const filename = req.file.filename;

  await UserService.updateUserPhoto(req.user.id, filename);

  res.sendStatus(204);
};

const getUserPosts = async (req, res) => {
  const { id } = req.user;
  const { page, limit } = req.query;

  const posts = await PostService.getPosts(page, limit, { author: id, auth: true });

  res.json(posts);
};

const userExistenceCheck = existenceCheck(User);

module.exports = {
  getUsers,
  getUser,
  getUserPosts,
  updateUser,
  deleteUser,
  uploadPhoto,
  resizeAndSavePhoto,
  updateUserPhoto,
  userExistenceCheck,
};

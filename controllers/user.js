const multerUpload = require("~/utils/multer");
const UserService = require("~/services/user");
const UploadService = require("~/services/uploads");

const getUsers = async (_req, res) => {
  const users = await UserService.getUsers();

  res.json(users);
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await UserService.getUser(userId);

  res.json(user);
};

const updateUser = async (req, res) => {
  const data = req.body;

  await UserService.updateUser(req.user.id, data);

  res.sendStatus(204);
};

const deleteUser = async (req, res) => {
  await UserService.deleteUser(req.user.id);

  res.sendStatus(204);
};

const uploadPhoto = multerUpload.single("photo");

const resizeAndSavePhoto = async (req, _res, next) => {
  const { id } = req.user;

  req.file = await UploadService.resizeAndSaveAvatar(req.file, id);

  next();
};

const updateUserPhoto = async (req, res) => {
  const filename = req.file.filename;

  await UserService.updateUserPhoto(req.user.id, filename);

  res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadPhoto,
  resizeAndSavePhoto,
  updateUserPhoto,
};

const sharp = require("sharp");
const path = require("path");
const UserService = require("~/services/user");
const multerUpload = require("~/utils/multer");
const ServerError = require("~/utils/errors");

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

const resizeAndSavePhoto = async (req, res, next) => {
  if (!req.file) {
    next(new ServerError(500, "Error saving the file."));
  }

  req.file.filename = `avatar-${Date.now()}-${req.user.id}.jpeg`;
  const filePath = path.resolve(`public/images/users/${req.file.filename}`);

  await sharp(req.file.buffer)
    .resize(600, 600)
    // .toFormat("jpeg")
    // .jpeg({ quality: 90 })
    .toFile(filePath);

  next();
};

const updateUserPhoto = async (req, res) => {
  const filename = req.file.filename;

  await UserService.updateUserPhoto(req.user.id, filename);

  res.sendStatus(204);
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  uploadPhoto,
  resizeAndSavePhoto,
  updateUserPhoto,
};

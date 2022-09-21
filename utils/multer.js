const multer = require("multer");
const ServerError = require("./errors");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    const err = new ServerError(400, "You provided an invalid image.");
    cb(err, false);
  }
};
const upload = multer({ storage, fileFilter });

module.exports = upload;

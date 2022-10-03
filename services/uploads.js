const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { AVATAR_NAME, AVATAR_FILE_PATH } = require("~/consts/utils");
const ServerError = require("~/utils/errors");

class UploadService {
  static async resizeAndSaveAvatar(fileToSave, userId) {
    if (!fileToSave) {
      throw new ServerError(500, "Error saving the file.");
    }
    const resultFile = fileToSave;

    const avatarPath = path.resolve(AVATAR_FILE_PATH);
    if (!fs.existsSync(avatarPath)) {
      fs.mkdirSync(avatarPath, { recursive: true });
    }

    resultFile.filename = AVATAR_NAME(userId);
    const filePath = path.resolve(`${AVATAR_FILE_PATH}${resultFile.filename}`);

    await sharp(resultFile.buffer).resize(500, 500).toFormat("jpeg").jpeg({ quality: 90 }).toFile(filePath);

    return resultFile;
  }
}

module.exports = UploadService;

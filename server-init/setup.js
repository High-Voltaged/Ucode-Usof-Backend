const serverInit = require("~/server-init/init");
const logger = require("~/logger/logger");
const databaseInit = require("~/server-init/database");

const serverSetup = async (app) => {
  serverInit(app);
  await databaseInit();

  app.listen(process.env.SERVER_PORT, () => {
    logger.info(`Server is running on port ${process.env.SERVER_PORT}`);
  });
};

module.exports = serverSetup;

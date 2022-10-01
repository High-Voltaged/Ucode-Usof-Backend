const redis = require("redis");
const redisClient = redis.createClient({ socket: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT } });
const logger = require("~/logger/logger");

redisClient
  .connect()
  .then(() => logger.info("Connected to Redis"))
  .catch((err) => logger.error(err));

module.exports = redisClient;

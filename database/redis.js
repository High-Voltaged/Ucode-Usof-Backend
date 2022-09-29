const redis = require("redis");
const redisClient = redis.createClient();
const logger = require("~/logger/logger");

redisClient.on("error", (err) => logger.error(err));

redisClient.connect().then(() => logger.info("Connected to Redis"));

module.exports = redisClient;

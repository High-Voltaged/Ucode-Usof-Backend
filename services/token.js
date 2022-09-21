const redis = require("redis");
const logger = require("~/logger/logger");
const JWTR = require("jwt-redis").default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);

const TOKEN_SECRET = process.env.TOKEN_SECRET;

class TokenService {
  static async init() {
    await redisClient.connect();
  }

  static async generateToken(payload) {
    const expiresIn = process.env.TOKEN_EXPIRES_IN;
    return await jwtr.sign(payload, TOKEN_SECRET, { expiresIn });
  }

  static async validateToken(token) {
    try {
      return await jwtr.verify(token, TOKEN_SECRET);
    } catch (_err) {
      return null;
    }
  }

  static async destroyToken(jti) {
    await jwtr.destroy(jti);
  }
}

TokenService.init().catch((err) => logger.error(err));

module.exports = TokenService;

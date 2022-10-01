const redisClient = require("~/database/redis");
const JWTR = require("jwt-redis").default;
const jwtr = new JWTR(redisClient);

const TOKEN_SECRET = process.env.TOKEN_SECRET;

class TokenService {
  static async generateToken(payload, options = {}) {
    const expiresIn = options.expiresIn || process.env.TOKEN_EXPIRES_IN;

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

module.exports = TokenService;

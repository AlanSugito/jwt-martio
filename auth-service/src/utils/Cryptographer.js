const jwt = require('jsonwebtoken');
const APIError = require('./APIError');
const bcrypt = require('bcrypt');

class Cryptographer {
  static generateToken(data, secret, ttl) {
    return jwt.sign(data, secret, {expiresIn: ttl});
  }

  static async verifyToken(token, secret) {
    try {
      const payload = await jwt.verify(token, secret);

      return payload;
    } catch (error) {
      let status = 403;
      if (error instanceof jwt.JsonWebTokenError) {
        status = 401;
      }

      if (error instanceof jwt.TokenExpiredError) {
        status = 403;
      }

      throw new APIError(status, error.message);
    }
  }

  static async hash(str) {
    const salt = bcrypt.genSaltSync(10);
    const result = await bcrypt.hash(str, salt);

    return result;
  }

  static async isValidPassword(str, hashed) {
    return await bcrypt.compare(str, hashed);
  }
}

module.exports = Cryptographer;

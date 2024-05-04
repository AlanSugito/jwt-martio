const AuthService = require('../services/AuthService');
const APIError = require('../utils/APIError');

const service = new AuthService();
class AuthController {
  static async register(req, res, next) {
    try {
      const {data} = req.body;
      const result = await service.register(data);

      res.status(200);
      res.json({
        message: 'Succesfully register user',
        data: {result},
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const {data} = req.body;

      const {accessToken, refreshToken} = await service.login(data);

      res.cookie('jwt', refreshToken, {httpOnly: true});
      res.status(200).json({
        message: 'Successfully login',
        data: {accessToken},
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAccessToken(req, res, next) {
    try {
      const {jwt} = req.cookies;

      if (!jwt) throw new APIError(403, 'Forbidden');

      const accessToken = await service.getAccessToken(jwt);

      res.status(200).json({
        message: 'Successfully get access token',
        data: {accessToken},
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;

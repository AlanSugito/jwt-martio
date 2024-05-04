const UserRepository = require('../repositories/UserRepositories');
const APIError = require('../utils/APIError');
const Cryptographer = require('../utils/Cryptographer');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../configs');

class AuthService {
  constructor() {
    this.user = new UserRepository();
    this.accessTokenTTL = '15min';
    this.refreshTokenTTL = '15days';
  }

  async register(data) {
    const result = await this.user.save(data);

    return result;
  }

  generateToken(email) {
    const accessToken = Cryptographer.generateToken(
      {email},
      ACCESS_TOKEN_SECRET,
      this.accessTokenTTL
    );
    const refreshToken = Cryptographer.generateToken(
      {email},
      REFRESH_TOKEN_SECRET,
      this.refreshTokenTTL
    );

    return {accessToken, refreshToken};
  }

  async login(data) {
    try {
      const user = await this.user.getUserCredentials(data.email);

      if (!user) throw new APIError(404, 'User not found');

      if (!Cryptographer.isValidPassword(data.password, user.password)) {
        throw new APIError(400, 'Password is not valid');
      }

      const tokens = this.generateToken(user.email);
      this.user.setUserToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      console.log(error);
    }
  }

  async getAccessToken(refreshToken) {
    try {
      const {token} = await this.user.getUserToken(refreshToken);

      const {email} = await Cryptographer.verifyToken(
        token,
        REFRESH_TOKEN_SECRET
      );

      const newAccessToken = Cryptographer.generateToken(
        {email},
        this.accessTokenSecret,
        this.accessTokenTTL
      );

      return newAccessToken;
    } catch (error) {
      if (error instanceof APIError) {
        throw new APIError(error.statusCode, error.message);
      }
    }
  }
}

module.exports = AuthService;

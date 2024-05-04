const APIError = require('../utils/APIError');
const Cryptographer = require('../utils/Cryptographer');
const {ACCESS_TOKEN_SECRET} = require('../configs');

const authHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new APIError(401, 'no token provided');

    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) throw new APIError(401, 'no token provided');

    const {email} = await Cryptographer.verifyToken(
      accessToken,
      ACCESS_TOKEN_SECRET
    );

    req.email = email;

    next();
  } catch (error) {
    let statusCode = 401;
    if (error instanceof APIError) {
      statusCode = error.statusCode;
    }

    res.status(statusCode).json({message: error.message});
  }
};

module.exports = authHandler;

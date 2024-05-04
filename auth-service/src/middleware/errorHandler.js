const APIError = require('../utils/APIError');

const errorHandler = (err, _, res, next) => {
  if (!err) return next();
  console.log(err);
  if (err instanceof APIError)
    return res.status(err.statusCode).json({message: err.message});

  return res.status(500).json({message: 'Internal server error'});
};

module.exports = errorHandler;

const { getKnownError } = require('../exceptions/exception');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const error = getKnownError(err);
  return res.status(error.status || 500).json({
    message: error.message,
  });
};

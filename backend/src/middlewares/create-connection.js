const { generate } = require('../config/connection');

module.exports = async (req, res, next) => {
  try {
    req.conn = await generate(req.conn);
    next();
  } catch (error) {
    next(error);
  }
};

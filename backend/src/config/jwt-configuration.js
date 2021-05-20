const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

const getToken = (user) => {
  const payload = {
    id: user.id,
    lastLogin: user.lastLogin
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  return token;
};

const configuration = expressJWT({
  secret: JWT_SECRET, algorithms: ['SHA256'],
});

module.exports = { getToken, configuration };

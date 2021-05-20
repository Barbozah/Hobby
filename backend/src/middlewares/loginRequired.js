const jwt = require('jsonwebtoken');
const UserSchema = require ('../models/userModel');

module.exports.loginRequired =  async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).end("Token ausente");
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserSchema.findOne({ id: decoded.id });

    if (!user || !user.status) { res.status(401).end("usuário não encontrado"); }

    req.token = decoded;    

    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).end("Token expirado ou inválido");
  }
};

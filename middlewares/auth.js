const jwt = require('jsonwebtoken');
const { JWT_SECRET, UNAUTHORIZED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) {
    const error = new Error('Необходма авторизация');
    error.statusCode = UNAUTHORIZED;
    next(error);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const error = new Error('Переда не верный токен');
    error.statusCode = UNAUTHORIZED;
    next(error);
  }
  req.user = payload;
  next();
};

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) {
    return (next(new AuthError('Необходима авторизация')));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return (next(new AuthError('Необходима авторизация')));
  }
  req.user = payload;
  return (next());
};

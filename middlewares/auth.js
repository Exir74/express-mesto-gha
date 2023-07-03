const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) {
    const error = new Error('Необходма авторизация');
    error.statusCode = 401;
    next(error);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error = new Error('Переда не верный токен');
    error.statusCode = 401;
    next(error);
  }
  req.user = payload;
  next();
};

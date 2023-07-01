const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) {
    return res
      .status(401)
      .send({ message: '1Необходма авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  // jwt.verify(token, process.env.JWT_SECRET);
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .send({ message: '2Необходма авторизация' });
  }
  req.user = payload;
  next();
};

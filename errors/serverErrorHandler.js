const router = require('express').Router();
const ServerError = require('./ServerError');

router.all('*', (req, res, next) => {
  next(new ServerError('Ошибка на стороне сервера'));
});
module.exports = router;

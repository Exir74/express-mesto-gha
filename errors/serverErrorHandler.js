const router = require('express').Router();
// const ServerError = require('./ServerError');

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  console.log('errerererererererer');
  res.status(err.statusCode).send({ message: 'Ошибка на стороне сервера' });
});
module.exports = router;

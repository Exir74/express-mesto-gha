module.exports = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Выход осуществлен' });
};

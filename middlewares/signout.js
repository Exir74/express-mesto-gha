module.exports = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход осуществлен' });
};

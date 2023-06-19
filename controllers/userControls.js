const userSchema = require('../models/userSchema');

module.exports.getUsers = (req, res) => {
  userSchema.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  userSchema.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => res.status(500).send({ message: 'Такого пользователя нет' }));
};

module.exports.createUser = (req, res) => {
  console.log(req);
  const { name, about, avatar } = req.body;
  userSchema.create({ name, about, avatar })
    .then((person) => res.send({ data: person }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

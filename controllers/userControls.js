const userSchema = require('../models/User');

module.exports.getUsers = (req, res) => {
  userSchema.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  // console.log(userSchema.error());
  userSchema.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).res.send({ message: 'Такого пользователя нет' });
        return;
      }
      res.send(user);
    })
    .catch(() => {
      res.status(404).send({ message: 'Такого пользователя нет' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSchema.create({ name, about, avatar })
    .then((person) => res.send({ data: person }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  userSchema.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((data) => res.send({ data }))
    .catch(() => res.status(404).send({ message: 'Произошла ошибка' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userSchema.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((data) => res.send({ data }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

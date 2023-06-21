const User = require('../models/User');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ServerError = require('../errors/ServerError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => next(new ServerError('Ошибка сервера')));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError('id не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// .then((user) => {
//   if (user) { // если передал не валидный id
//     return res.send(user);
//   } // если пользователя не нашел
//   // res.send(user);
//   throw new NotFoundError('Пользователь с таким id на найден');
// })
// .catch((err) => {
//   res.send(err.message);
// });
// };
//     .then((user) => {
//       if (!user) {
//         console.log('Хтооооо????');
//         throw new NotFoundError('Пользователь с таким id на найден');
//       }
//       res.send(user);
//     })
//     .catch((err) => {
//       console.log(err.name);
//       // res.status(err.statusCode).send({ message: err.message });
//       if (err.name === 'CastError') {
//         next(new ValidationError('Передан не верный id'));
//         // res.status(err.statusCode).send({ message: err.message });
//         res.send(ValidationError.name);
//       // } else {
//       //   next(err);
//       }
//     });
// };

// module.exports.getUser = (req, res) => {
//   User.findById(req.params.id).exec()
//     .then((user) => {
//       if (!user) {
//         res.status(404).send({ message: 'Пользователь не найден' });
//         return;
//       }
//       res.send(user);
//     })
//     .catch(() => {
//       res.status(400).send({ message: 'Id не верный' });
//     });
// };
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((person) => res.send({ data: person }))
    .catch(() => next(new ValidationError('Переданы некорректные данные')));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError('id не найден'));
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данныее'));
      } else {
        next(err);
      }
    });
  // .then((data) => res.send({ data }))
  // .catch(() => res.status(404).send({ message: 'Произошла ошибка' }));
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((userAvatar) => {
      if (userAvatar) {
        res.send(userAvatar);
      } else {
        next(new NotFoundError('id не найден'));
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данныее'));
      } else {
        next(err);
      }
    });
};

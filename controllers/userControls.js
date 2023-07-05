const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { JWT_SECRET, UNAUTHORIZED, CONFLICT } = require('../utils/constants');

function createError(errMessage, statusCode, next) {
  const error = new Error(errMessage);
  error.statusCode = statusCode;
  next(error);
  return (error);
}

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      // if (err.name === 'ValidationError') {
      //   next(new ValidationError('Переданы некорректные данные'));
      // } else {
      //   next(err);
      // }
      next(err);
    });
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

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password) {
    throw createError('Введите пароль', UNAUTHORIZED, next);
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      })
        .then((person) => {
          res.send({ data: person });
        })
        .catch((err) => {
          // if (err.name === 'ValidationError' && !err.message) {
          //   next(new ValidationError('Переданы некорректные данные'));
          // } else if (err.code === 11000) {
          //   createError('Такой email уже зарегистрирорван', CONFLICT, next);
          // } else if
          // (err.message.includes('User validation failed:')) { // Скорее всего нужно будет убрать
          //   next(new ValidationError(err.message));
          // } else {
          //   next(err);
          // }
          if (err.code === 11000) {
            createError('Такой email уже зарегистрирорван', CONFLICT, next);
          }
          next(err);
        }));
  }
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
      // if (err.name === 'CastError' || err.name === 'ValidationError') {
      //   next(new ValidationError('Переданы некорректные данныее'));
      // } else {
      //   next(err);
      // }
      next(err);
    });
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
      // if (err.name === 'CastError' || err.name === 'ValidationError') {
      //   next(new ValidationError('Переданы некорректные данныее'));
      // } else {
      //   next(err);
      // }
      next(err);
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.login(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send(user)
        .end();
    })
    .catch((err) => {
      createError(err.message, UNAUTHORIZED, next);
      next(err);
    });
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

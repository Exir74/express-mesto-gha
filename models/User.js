require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введен не коректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    select: false,
  },
});

user.statics.login = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((userData) => {
      if (!userData) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, userData.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return userData;
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = mongoose.model('User', user);

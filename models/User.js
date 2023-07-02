const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Введен некорректный адрес почты',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

user.statics.findUserByCredentials = function finderUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((userData) => {
      console.log(userData);
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
        .catch(() => Promise.reject(new Error('Неправильные почта или пароль')));
    })
    .catch(() => Promise.reject(new Error('Неправильные почта или пароль')));
};

module.exports = mongoose.model('User', user);

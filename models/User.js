require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Поле name должно быть больше 2 символов'],
    maxLength: [30, 'Поле name должно быть меньше 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: [2, 'Поле about должно быть больше 2 символов'],
    maxLength: [30, 'Поле about должно быть меньше 30 символов'],
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
      message: 'Введен не корректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [3, 'Пароль должен быть не меньше 3 символов'],
    select: false,
  },
});

user.statics.login = function login(email, password, next) {
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

user.set('toJSON', {
  transform(doc, ret) {
    // eslint-disable-next-line no-param-reassign
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model('User', user);

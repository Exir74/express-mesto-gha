const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ValidationError = require('../errors/ValidationError');

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
  },
  password: {
    type: String,
    required: true,

  },
});

// user.static.findUserByCredentials = function (email, password) {
//   return this.findOne({ email })
//     .then((userData) => {
//       if (!userData) {
//         return Promise.reject(new ValidationError('Неверные почта или пароль'));
//       }
//       return bcrypt.compare(password, userData.password);
//     });
// };

// module.exports.login = (req, res) => {
//   const { email, password } = req.body;
//   user.findOne({ email })
//     .then((userData) => {
//       if (!userData) {
//         throw (new Error('Неправильные почта или пароль'));
//       }
//       return bcrypt.compare(password, userData.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new Error('Неправильные почта или пароль'));
//           }
//           // Дописал ниже ретерн возможно не нужен
//           // const token = jwt.sign(
//           //   { _id: userData._id },
//           //   process.env.JWT_SECRET,
//           //   { expiresIn: '7d' },
//           // );
//           return userData;
//         });
//     })
//     .catch((err) => {
//       res
//         .status(401)
//         .send({ message: err.message });
//     });
// };

user.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
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
        });
    });
};
module.exports = mongoose.model('User', user);

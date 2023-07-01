const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const ValidationError = require('../errors/ValidationError');

const user = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,

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

module.exports = mongoose.model('User', user);

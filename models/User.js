// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const user = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,

  },
  avatar: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('User', user);

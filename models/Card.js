const mongoose = require('mongoose');

const card = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: [{
    default: [],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Card', card);

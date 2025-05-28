const mongoose = require('mongoose');
const { Schema } = mongoose;

const book = new Schema({
  name: {
    type:String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', book);

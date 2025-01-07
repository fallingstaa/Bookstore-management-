const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  imageUrl: String
});

module.exports = mongoose.model('cart', cartSchema);

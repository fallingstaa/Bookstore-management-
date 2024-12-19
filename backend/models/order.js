// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // You can add the user ID to link the order to a user
  books: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      author: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      genre: { type: String, required: true },
      publishedDate: { type: String, required: true }
    }
  ]
}, { timestamps: true });  // Optionally track when the order was created

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

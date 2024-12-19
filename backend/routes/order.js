// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');  // Import the Order model

// Create a new order (this is where you will store the cart data as an order)
router.post('/api/order/create', async (req, res) => {
  const { userId, cartItems } = req.body;  // Receive the cart data from the frontend

  try {
    // Create a new order and store the cart items in the 'books' field
    const newOrder = new Order({
      userId, 
      books: cartItems
    });

    // Save the new order to the database
    await newOrder.save();

    res.status(200).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order. Please try again later.' });
  }
});

module.exports = router;

const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

// Get cart details
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.bookId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cart', details: err });
    }
});

// Add or update items in the cart
router.post('/update', async (req, res) => {
    const { userId, cartItems } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: cartItems });
            await cart.save();
            return res.status(200).json({ message: 'Cart created successfully', updatedCart: cart });
        }

        cart.items = cartItems;
        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully', updatedCart: cart });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update cart', details: err });
    }
});

// Checkout (empty the cart)
router.post('/checkout', async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Create an order (use your order model if needed)
        // For simplicity, we'll just clear the cart
        cart.items = [];
        await cart.save();

        res.status(200).json({ message: 'Checkout successful', cart });
    } catch (err) {
        res.status(500).json({ error: 'Error during checkout', details: err });
    }
});

module.exports = router;


//i do pracctice git 
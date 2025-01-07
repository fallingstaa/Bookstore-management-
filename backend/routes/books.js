const express = require('express');
const Book = require('./models/Book');  // Import the Book model

const router = express.Router();

// Route to fetch all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the collection
    res.json(books);  // Return the books in JSON format
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

module.exports = router;

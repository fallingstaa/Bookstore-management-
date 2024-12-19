const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  genre: { type: String, required: true },
  publishedDate: { type: String, required: true }
});

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

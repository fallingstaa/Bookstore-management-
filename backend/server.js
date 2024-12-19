const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const open = require('open');

// Initialize dotenv for environment variables (e.g., Mongo URI)
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  serverSelectionTimeoutMS: 10000  // Increased timeout (10 seconds)
})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Book model schema (This defines the structure of the books data)
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  price: { type: Number, required: true },
  genre: { type: String },
  publishedDate: { type: Date },
});

const Book = mongoose.model('Book', bookSchema);

// Cart model schema (This defines the structure of the cart data)
const cartItemSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Store API!');
});

// GET Route - Get all books
app.get('/api/books', async (req, res) => {
  try {
    console.log('Fetching all books...');
    const books = await Book.find(); // Fetch all books from MongoDB
    if (!books.length) {
      return res.status(404).json({ message: 'No books found' });
    }
    res.status(200).json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

// POST Route - Add a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, description, imageUrl, price, genre, publishedDate } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      imageUrl,
      price,
      genre,
      publishedDate
    });

    const savedBook = await newBook.save(); // Save the new book to MongoDB
    res.status(201).json(savedBook); // Return the created book in the response
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(500).json({ message: 'Failed to create book' });
  }
});

// DELETE Route - Delete a book by ID
app.delete('/api/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await Book.findByIdAndDelete(bookId); // Find and delete the book by ID

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully', deletedBook });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ message: 'Failed to delete book' });
  }
});

// New Route - Update Cart
app.post('/api/cart/update', async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    if (!bookId || !quantity) {
      return res.status(400).json({ message: 'BookId and quantity are required' });
    }

    // Check if the cart item already exists
    const existingItem = await CartItem.findOne({ bookId });

    if (existingItem) {
      // If item exists, update the quantity
      existingItem.quantity = quantity;
      const updatedItem = await existingItem.save();
      res.status(200).json(updatedItem);
    } else {
      // If item doesn't exist, create a new cart item
      const newCartItem = new CartItem({ bookId, quantity });
      const savedItem = await newCartItem.save();
      res.status(201).json(savedItem);
    }
  } catch (err) {
    console.error('Error updating cart:', err);
    res.status(500).json({ message: 'Failed to update cart' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  // You can remove this in production or leave it for development
  if (process.env.NODE_ENV !== 'production') {
    open(`http://localhost:${port}`);
  }
});

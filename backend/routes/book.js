const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Assuming your model is in models/book.js
const Review = require('../models/review');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload')
// Add a new book
const { check } = require('express-validator');

// Simple validation rules
const validateReview = [
  check('rating').isInt({ min: 1, max: 5 }),
  check('comment').notEmpty().isLength({ max: 500 })
];
router.post('/add-book', upload.single('image'), async (req, res) => {
  try {
    const { name, author, genre, publisher, description } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const newBook = new Book({
      name,
      author,
      genre,
      publisher,
      description,
      images: imagePath // Save image file path
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Error adding book', error: error.message });
  }
});

// Get all books (optional, but useful for testing)
router.get('/books', async (req, res) => {
  try {
    // Extract query parameters
    const { page = 1, limit = 10, author, name } = req.query;
    
    // Create filter object
    const filter = {};
    if (author) filter.author = { $regex: author, $options: 'i' }; // Case-insensitive search
    if (name) filter.name = { $regex: name, $options: 'i' };

    // Execute query with pagination
    const books = await Book.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination info
    const count = await Book.countDocuments(filter);

    // Return response with pagination metadata
    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalBooks: count
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});
//single book details using id para
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
});
router.get('/books/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

router.post('/books/:id/reviews', validateReview, auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const bookId = req.params.id;

    // Check if the user already reviewed this book
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book.' });
    }

    // Create new review
    const review = new Review({
      book: bookId,
      user: userId,
      rating: rating || 1,
      comment
    });

    const savedReview = await review.save();
    const populatedReview = await Review.findById(savedReview._id).populate('user', 'name');

    res.status(201).json(populatedReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
});

// Edit a review (only by the owner)
router.put('/reviews/:id', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Find the review first
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Check if the user is the owner of the review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this review' });
    }
    
    // Update the review
    review.rating = rating;
    review.comment = comment;
    
    const updatedReview = await review.save();
    const populatedReview = await Review.findById(updatedReview._id).populate('user', 'name');
    
    res.json(populatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
});

// Delete a review (only by the owner)
router.delete('/reviews/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Check if the user is the owner of the review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }
    
    // Use deleteOne() or findByIdAndDelete() instead of remove()
    await Review.deleteOne({ _id: req.params.id });
    // Alternatively: await Review.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
});

module.exports = router;
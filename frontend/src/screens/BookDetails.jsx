import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaStar, FaRegStar } from 'react-icons/fa';
//import jwtDecode from 'jwt-decode'; 
import ReviewsSection from '../components/ReviewSection';
const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to handle edit
  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Manual JWT decoding (for simple cases)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64));
      setCurrentUser(decoded.user);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}, []);
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/books/books/${id}`);
        setBook(response.data);
        
        //Fetch reviews for this book (optional)
        const reviewsResponse = await axios.get(`http://localhost:5000/api/books/books/${id}/reviews`);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError(err.response?.data?.message || 'Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);
 
  const handleSubmitReview = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  if (!token) {
    setError('You must be logged in to submit a review');
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:5000/api/books/books/${id}/reviews`,
      {
        rating,
        comment: review
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setReviews([...reviews, response.data]);
    setReview('');
    setRating(0);
  } catch (err) {
    console.error('Error submitting review:', err);
    setError(err.response?.data?.message || 'Failed to submit review');
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>{error}</p>
        <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
          Back to Books
        </Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-8">
        <p className="text-xl">Book not found</p>
        <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
          Back to Books
        </Link>
      </div>
    );
  }
const handleEditReview = async (reviewId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/books/reviews/${reviewId}`, updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      setReviews(reviews.map(review => 
        review._id === reviewId ? response.data : review
      ));
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  };
  
  // Function to handle delete
  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  return (
    
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/dashboard" 
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Books
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8">
            {book.images ? (
              <img 
                src={`http://localhost:5000/${book.images}`}
                alt={book.name} 
                className="max-h-96 w-auto object-contain"
              />
            ) : (
              <div className="text-gray-400 text-center">
                <FaBook className="text-8xl mb-2 mx-auto" />
                <p>No cover available</p>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.name}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
            
            <div className="flex items-center mb-6">
              <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full mr-4">
                {book.genre}
              </span>
              <span className="text-gray-500">Published by {book.publisher}</span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Author</p>
                  <p className="font-medium">{book.author}</p>
                </div>
                <div>
                  <p className="text-gray-500">Genre</p>
                  <p className="font-medium">{book.genre}</p>
                </div>
                <div>
                  <p className="text-gray-500">Publisher</p>
                  <p className="font-medium">{book.publisher}</p>
                </div>
                <div>
                  <p className="text-gray-500">Added on</p>
                  <p className="font-medium">
                    {new Date(book.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
 {/* Add Review Form */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      {star <= rating ? 
                        <FaStar className="text-yellow-400 text-2xl" /> : 
                        <FaRegStar className="text-yellow-400 text-2xl" />
                      }
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="review" className="block text-gray-700 mb-2">Your Review</label>
                <textarea
                  id="review"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit Review
              </button>
            </form>
          </div>
        {/* Reviews Section */}
        <ReviewsSection 
        reviews={reviews}
        currentUserId={currentUser?.id}
        onEdit={handleEditReview}
        onDelete={handleDeleteReview}
      />
      </div>
    </div>
  );
};

export default BookDetails;
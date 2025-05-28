import { useState } from 'react';
import { FaStar, FaRegStar, FaEdit, FaTrash } from 'react-icons/fa';

const ReviewsSection = ({ reviews, currentUserId, onEdit, onDelete }) => {
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');

  const handleEditClick = (review) => {
    setEditingReviewId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleSaveEdit = async () => {
    try {
      await onEdit(editingReviewId, { rating: editRating, comment: editComment });
      setEditingReviewId(null);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div className="border-t border-gray-200 p-8">
      <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
              {editingReviewId === review._id ? (
                <div className="space-y-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setEditRating(i + 1)}
                        className="focus:outline-none"
                      >
                        {i < editRating ? 
                          <FaStar className="text-yellow-400 text-xl" /> : 
                          <FaRegStar className="text-yellow-400 text-xl" />}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setEditingReviewId(null)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          i < review.rating ? 
                            <FaStar key={i} className="text-yellow-400" /> : 
                            <FaRegStar key={i} className="text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm">
                        by {review.user?.name || 'Anonymous'} on {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {currentUserId === review.user?._id && (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditClick(review)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => onDelete(review._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default ReviewsSection;
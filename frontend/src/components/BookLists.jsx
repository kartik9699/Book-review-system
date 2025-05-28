import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    author: '',
    name: ''
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    totalBooks: 0
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        // Add filters to params
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });

        const response = await axios.get(`http://localhost:5000/api/books/books?${params.toString()}`);
        setBooks(response.data.books);
        setPagination({
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
          totalBooks: response.data.totalBooks
        });
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.response?.data?.message || 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Catalog</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={filters.author}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Filter by author"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Filter by Title"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Items per page</label>
            <select
              name="limit"
              value={filters.limit}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-2">Loading books...</p>
        </div>
      )}

      {/* Books list */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map(book => (
              <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {book.images ? (
                    <img 
                      src={`http://localhost:5000/${book.images}`}
                      alt={book.name} 
                      className="h-full w-full object-contain-fit"
                    />
                  ) : (
                    <span className="text-gray-500">No image</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 truncate">{book.name}</h3>
                  <p className="text-gray-600 mb-1">by {book.author}</p>
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mb-2">
                    {book.genre}
                  </span>
                  <p className="text-gray-700 text-sm line-clamp-3">{book.description}</p>
                  <Link 
                    to={`/books/${book._id}`} 
                    className="mt-3 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                  className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {[...Array(pagination.totalPages).keys()].map(num => (
                  <button
                    key={num + 1}
                    onClick={() => handlePageChange(num + 1)}
                    className={`px-3 py-2 border-t border-b border-gray-300 ${filters.page === num + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    {num + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === pagination.totalPages}
                  className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}

          {/* Results count */}
          <div className="mt-4 text-center text-gray-600">
            Showing {(filters.page - 1) * filters.limit + 1} - {Math.min(filters.page * filters.limit, pagination.totalBooks)} of {pagination.totalBooks} books
          </div>
        </>
      )}
    </div>
  );
};

export default BooksList;
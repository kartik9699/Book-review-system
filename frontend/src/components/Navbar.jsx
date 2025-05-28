import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    // Remove token or user data from storage
    localStorage.removeItem('token'); // Or sessionStorage.removeItem('token');
    
    // Optionally clear any other auth-related state

    // Redirect to login or homepage
    navigate('/');
  };
  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <svg
              className="h-8 w-8 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-xl font-bold">Reviewer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition duration-300"
            >
              Browse Books
            </Link>
            <Link
              to="/add-book"
              className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-800 hover:bg-indigo-900 transition duration-300 flex items-center"
            >
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Book
            </Link>
            {/* <Link
              to="/my-reviews"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition duration-300"
            >
              My Reviews
            </Link> */}
            <button onClick={handleLogout}
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition duration-300">
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-600 focus:outline-none transition duration-300"
            >
              <svg
                className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition duration-300"
          >
            Browse Books
          </Link>
          <Link
            to="/add-book"
            className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-800 hover:bg-indigo-900 transition duration-300"
          >
            Add Book
          </Link>
          {/* <Link
            to="/my-reviews"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition duration-300"
          >
            My Reviews
          </Link> */}
          <button onClick={handleLogout}
          className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition duration-300">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
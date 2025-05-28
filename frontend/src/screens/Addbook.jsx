import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    genre: '',
    publisher: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null); // <-- File state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    if (imageFile) {
      formPayload.append('image', imageFile); // Use 'image' as field name
    }

    try {
      const response = await axios.post('http://localhost:5000/api/books/add-book', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Book added:', response.data);
      navigate('/books');
    } catch (err) {
      console.error('Error adding book:', err);
      setError(err.response?.data?.message || 'Failed to add book');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      
      <div className="max-w-2xl mx-auto p-6 mt-1 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Book</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Existing input fields... */}

          {['name', 'author', 'genre', 'publisher'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 mb-2" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="image">
              Upload Book Cover
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Adding Book...' : 'Add Book'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;

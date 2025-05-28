import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    password: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const { name, email, mobile_no, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
      const body = isLogin ? { email, password } : { name, email, mobile_no, password };
      
      const res = await axios.post(url, body);
      console.log(res.data.token); // JWT token
      
      if (isLogin) {
        // Store token in localStorage or context
        localStorage.setItem('token', res.data.token);
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // After registration, switch to login form
        setIsLogin(true);
        
        alert('Registration successful. Please login.');
      }
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          {isLogin ? 'Login to Your Account' : 'Create a New Account'}
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Mobile Number"
                name="mobile_no"
                value={mobile_no}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 w-full text-blue-600 hover:underline text-sm"
        >
          {isLogin ? 'Need to register?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
}

export default Login;
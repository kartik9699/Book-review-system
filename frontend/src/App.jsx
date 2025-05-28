import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AddBook from './screens/Addbook';
import BookDetails from './screens/BookDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

// Simple auth check
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

function AppLayout({ children }) {
  const location = useLocation();

  // Don't show Navbar and Footer on the login page
  const hideLayout = location.pathname === '/';

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated() ? 
                <Dashboard /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;

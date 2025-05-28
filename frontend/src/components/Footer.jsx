import { Link } from 'react-router-dom';
import { FaBook, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <FaBook className="text-2xl mr-2" />
              <span className="text-xl font-bold">Reviewer</span>
            </div>
            <p className="text-indigo-200">
              Your go-to platform for honest book reviews and recommendations. 
              Discover new reads, share your thoughts, and connect with fellow book lovers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-indigo-200 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-indigo-200 hover:text-white transition">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link href="/add-book" className="text-indigo-200 hover:text-white transition">
                  Add Book
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-200 hover:text-white transition text-xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-200 hover:text-white transition text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-200 hover:text-white transition text-xl"
              >
                <FaLinkedin />
              </a>
            </div>
            <p className="text-indigo-200">contact@Reviewer.com</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-indigo-700 mt-8 pt-6 text-center text-indigo-300">
          <p>&copy; {new Date().getFullYear()} Reviewer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

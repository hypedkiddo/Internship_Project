import React from 'react';
import { Link } from 'react-router-dom';
 // Ensure react-router-dom is installed for navigation

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4 px-6 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img 
            src="https://git.edu/wp-content/uploads/2024/04/GIT-logo.png" // Replace with the actual path to your logo
            alt="GIT Logo"
            className="w-12 h-12 animate-bounce" // Animation for the logo
          />
          <h1 className="text-2xl font-semibold animate-pulse">
            Gogte Institute of Technology Belgaum
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">
        
          <Link to="/" className="hover:underline hover:text-gray-200 transition duration-300">Home</Link>
          <Link to="/Reports" className="hover:underline hover:text-gray-200 transition duration-300">Reports</Link>
          <Link to="/about" className="hover:underline hover:text-gray-200 transition duration-300">About</Link>
          <Link to="/contact" className="hover:underline hover:text-gray-200 transition duration-300">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

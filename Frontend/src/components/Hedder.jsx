import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Using Lucide icons for the menu

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white py-4 px-6 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img 
            src="https://git.edu/wp-content/uploads/2024/04/GIT-logo.png"
            alt="GIT Logo"
            className="w-12 h-12 animate-bounce"
          />
          <h1 className="text-2xl font-semibold animate-pulse">
            Gogte Institute of Technology Belgaum
          </h1>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button className="sm:hidden text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden sm:flex space-x-6">
          <Link to="/" className="hover:underline hover:text-gray-200 transition duration-300">Home</Link>
          <Link to="/Reports" className="hover:underline hover:text-gray-200 transition duration-300">Reports</Link>
          <Link to="/about" className="hover:underline hover:text-gray-200 transition duration-300">About</Link>
          <Link to="/contact" className="hover:underline hover:text-gray-200 transition duration-300">Contact Us</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="sm:hidden mt-2 bg-blue-800 p-4 rounded-md shadow-md">
          <Link to="/" className="block py-2 hover:underline hover:text-gray-200" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/Reports" className="block py-2 hover:underline hover:text-gray-200" onClick={() => setIsOpen(false)}>Reports</Link>
          <Link to="/about" className="block py-2 hover:underline hover:text-gray-200" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="block py-2 hover:underline hover:text-gray-200" onClick={() => setIsOpen(false)}>Contact Us</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;

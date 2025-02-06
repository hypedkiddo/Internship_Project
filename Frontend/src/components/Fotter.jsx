import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-8 shadow-inner">
      <div className="max-w-6xl mx-auto px-6">
        {/* Contact Information */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <h3 className="text-xl font-semibold">Gogte Institute of Technology</h3>
            <p>Udyambag, Belgaum, Karnataka, India - 590008</p>
            <p>Phone: +91 831 240 5500</p>
            <p>Email: info@git.edu</p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition duration-300">Facebook</a>
            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition duration-300">Twitter</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition duration-300">Instagram</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition duration-300">LinkedIn</a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Copyright Section */}
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Gogte Institute of Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './navbar.css'; // Import the CSS file
import Loader from './Loader.js'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-content">
          {/* Logo */}
          <div className="nav-logo">
            <a href="/" className="text-2xl font-bold">
              Platform
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-menu">
            <a href="/" className="nav-link" >Home</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
            
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-button">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none btn"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="/" className="nav-link">Home</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './fnavbar.css'; // Import the CSS file
import Loader from './Loader.js';
import { HashLink as NavLink } from 'react-router-hash-link';
const Navbar = () => {
    const navigate = useNavigate();
   

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogin = () => {
      navigate('/flogin');
    };

    const handleRegister = () => {
      navigate('/fregister');
    };

        const toggleNav = () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    };

    return (
        <nav>
            <div id="nav-container" className="nav-container">
                <a href="/" className="logo">Near.in</a>
                <button className="hamburger" onClick={toggleNav}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </button>
                <ul className="nav-links">
                    <li><a href="/" className="nav-link">Home</a></li>
                    <li><a href="/about" className="nav-link">About</a></li>
                    <li>
                        <a  className="nav-link" href='/contact'>Contact</a>
                    </li>
                    <li><button className="login-btn" onClick={handleLogin}>Login</button></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import './Footer.css'; // Assuming you want to keep the styles in a separate file.

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About</h3>
                    <p style={{ color: '#a0aec0', lineHeight: '1.5' }}>
                        Making your daily tasks easier and more efficient.
                    </p>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Links</h3>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>
                    <ul className="footer-links">
                        <li><a href="mailto:info@example.com">info@example.com</a></li>
                        <li><a href="tel:+12345678900">+1 234 567 8900</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Platform. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

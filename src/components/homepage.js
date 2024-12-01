import React from 'react';
import './homepage.css';
import I1 from './images/I1.jpg'
import I2 from './images/I2.png'
import I3 from './images/I3.webp'
import I4 from './images/I4.webp'
import I5 from './images/I5.jpg'
import I6 from './images/I6.jpg'
import I7 from './images/I7.jpg'
import I8 from './images/I8.jpg'
import I9 from './images/I9.jpg'
import Footer from './footer.js'
import { useNavigate} from 'react-router-dom';
import Nav from './fnavbar.js'
const Homepage = () => {
    const navigate = useNavigate();
    const handlelogin = () =>
        {
            navigate('/flogin');
        }
        const handleregister = () =>
        {
            navigate('/fregister');
        }
    const toggleNav = () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    };
    return (
        <>
        
        <div className='body1'>
            {/* <nav>
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
                        <li><a href="/.#nav-container" className="nav-link">Contact</a></li>
                        <li><button className="login-btn" onClick={handlelogin}>Login</button></li>
                    </ul>
                </div>
            </nav> */}
            <Nav/>

            <div className="hero-banner">
                <div className="slogan">
                    <p className="slogan1">Trusted Local Experts at Your Doorstep, Anytime!</p>
                    <hr />
                    <p className="slogan2">Connecting You to Reliable Services, Wherever and Whenever You Need Them!</p>
                </div>
                <div>
                    <img
                        className="hero-banner-image"
                        src={I2}
                        alt="Hero Banner"
                    />
                </div>
            </div>

            <section className="benefits-section">
                <div className="benefits-container">
                    <h2 className="benefits-title">Why Choose Us?</h2>
                    <p className="benefits-description">
                        Discover the advantages that set us apart from the competition.
                    </p>
                </div>
            </section>

            <div className="benefit">
                <div className="card">
                    <img
                        className="cardimg1"
                        src={I1}
                        alt="Digital Innovation"
                    />
                    <h2>Fast & Reliable Service, Anytime You Need</h2>
                    <p>
                        Skip the endless search for dependable help. With our platform, you’re just a
                        few clicks away from trusted, nearby professionals ready to tackle any task, big or small. Save time and stress with quality service you can count on.
                    </p>
                </div>
                <div className="card">
                    <img
                        src={I3}
                        alt="Smart Solutions"
                    />
                    <h2>Transparent Pricing, No Surprises</h2>
                    <p>
                        Get clear, upfront pricing on every service before you book. We ensure you know
                        exactly what to expect, so there are no hidden fees or last-minute changes—just
                        honest rates for the expert help you need.
                    </p>
                </div>
                <div className="card">
                    <img
                        src={I4}
                        alt="Expert Support"
                    />
                    <h2>Quality You Can Trust</h2>
                    <p>
                        We vet every professional, so you don’t have to. Check ratings, read reviews, and
                        hire with confidence, knowing you’re choosing the best in the business. With our
                        quality assurance, satisfaction is guaranteed every time.
                    </p>
                </div>
            </div>

            <div className="services">
                <h1>Our Services</h1>
                <p>
                    ❝ We offer a wide range of services tailored to meet your needs. Our team is
                    dedicated to providing exceptional quality and customer satisfaction. ❞
                </p>
            </div>

            <div className="wrapper">
                <div className="item"><img src={I5} alt="Service 1" /></div>
                <div className="item"><img src={I6} alt="Service 2" /></div>
                <div className="item"><img src={I7} alt="Service 3" /></div>
                <div className="item"><img src={I8} alt="Service 4" /></div>
                <div className="item"><img src={I9} alt="Service 5" /></div>
            </div>

            <section className="benefits-section">
                <div className="benefits-container">
                    <h2 className="benefits-title">Thank you for visiting!</h2>
                    <p className="benefits-description">
                        ❝ We look forward to serving you again soon ❞
                    </p>
                </div>
            </section>

            <div id="contact-us-container" className="contact-us-container">
                <div className="contact-us-wrapper">
                    <div className="contact-header services">
                        <p id='nav-container' name="nav-container"><a href="#nav-container">^</a></p>
                        <h1>Get in Touch</h1>
                        <hr />
                        <p>We'd love to hear from you. Here's how you can reach us.</p>
                    </div>
                    {/* Add the remaining contact section as it is */}
                    <div class="contact-info-grid">
       
        <div class="contact-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h3>Visit Us</h3>
          <p>123 Business Street</p>
          <p>Suite 100</p>
          <p>New York, NY 10001</p>
        </div>
        
       
        <div class="contact-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h3>Call Us</h3>
          <p>Phone: (555) 123-4567</p>
          <p>Fax: (555) 123-4568</p>
          <p>Toll Free: 1-800-123-4567</p>
        </div>
        
     
        <div class="contact-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h3>Email Us</h3>
          <p>info@company.com</p>
          <p>support@company.com</p>
          <p>sales@company.com</p>
        </div>
        
        
        <div class="contact-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </div>
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">Instagram</a>
          </div>
        </div>
      </div>
      
      <div class="business-hours">
        <h3>Business Hours</h3>
        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p>Saturday: 10:00 AM - 4:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
                </div>
            </div>
            <Footer/>
        </div>
        
        </>
    );
};

export default Homepage;

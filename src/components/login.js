import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './login.css'
import Footer from './footer.js'
import Navbar from './navbar.js';
const LoginForm = ({ onSubmit }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(loginData);
  };

  const handleNavigateToRegister = () => {
    navigate('/register'); // Navigate to the registration route
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword'); // Navigate to the forgot password route
  };

  return (
    <>
    <Navbar/>
    <div className='outerbox'>
    <div className='outerboxpaddingtop'></div>
    <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
            <h4>We are <span className="brand-name">NUVA</span></h4>
            <p>Welcome back! Log in to your account to view today's clients:</p>

            <div className="floating-label">
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="input-field"
                />
                <label htmlFor="email" className="input-label">Email:</label>
                <div className="input-icon">
                   
                </div>
            </div>

            <div className="floating-label">
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder=" "
                    className="input-field"
                />
                <label htmlFor="password" className="input-label">Password:</label>
                <div className="input-icon">
                    
                </div>
            </div>

            <button type="submit" className="submit1-button">Login</button>
            <button type="button" onClick={handleNavigateToRegister} className="register-button">Register</button>
            <button type="button" onClick={handleForgotPassword} className="forgot-password-button">Forgot Password?</button>
        </form>
    </div>
    <div className='outerboxpaddingbot'></div>
    </div>
    <Footer/>
    </>
);

};

export default LoginForm;

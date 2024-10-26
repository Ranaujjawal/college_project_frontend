import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RegistrationForm from './components/register.js';
import LoginForm from './components/login.js';
import OTPVerification from './components/otp.js';
import Dashboard from './components/dashboard.js';
import axios from 'axios';

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:4040';
    axios.defaults.withCredentials = true;

    // Check if user is already logged in
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/users/profile');
        if (response.data && response.data.userId) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("User not logged in:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleRegister = async (formData) => {
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const response = await axios.post('/auth/register', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        alert(' Please verify your OTP.');
        navigate('/otp'); // Redirect to OTP verification
      } else {
        alert(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.log('Error during registration:', error);
      alert('User already exists or registration failed.');
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
     const response= await axios.post('/auth/verifyotp', { otp });
      alert('Registration successful! Please log in.');
     if(response.data.success) navigate('/'); // Redirect to login page
    } catch (error) {
      console.log('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    }
  };
  const handleResendOTP = async () => {
    try {
      const response = await axios.post('/auth/resendregisterotp');
      if (response.data.success) {
       // alert('OTP resent successfully!');
      } else {
        alert('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.log('Error resending OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    }
  };
  const handleLogin = async (loginData) => {
    try {
      await axios.post('/auth/login', loginData);
      alert('Login successful!');
      setIsLoggedIn(true); // Update login status
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.log('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Routes>
      <Route path="/register" element={<RegistrationForm onSubmit={handleRegister} />} />
      <Route path="/otp" element={<OTPVerification onVerify={handleVerifyOTP} onResend={handleResendOTP} />} />
      <Route path="/" element={<LoginForm onSubmit={handleLogin} />} />
      {isLoggedIn && <Route path="/dashboard/*" element={<Dashboard />} />} {/* Render dashboard only if logged in */}
      {/* Optionally, you can add a catch-all route for unauthorized access */}
      <Route path="*" element={<div>You are not authorized to view this page.</div>} />
    </Routes>
  );
};

export default App;

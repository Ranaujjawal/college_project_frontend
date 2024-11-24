import React, { useState } from 'react';
import './otp.css'
import axios from 'axios';
import Footer from './footer';
import Navbar from './fnavbar';
// OTP Verification Component
const OTPVerification = ({ onVerify, onResend }) => {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
    axios.defaults.withCredentials = true;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 5) {
      setError('Please enter a valid 5-digit OTP');
      return;
    }
    setLoading(true);
    try {
      await onVerify(otp);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {   
      await onResend(); // Call the onResend prop function
      
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
        alert('OTP sent successfully!');
      setLoading(false);
    }
  };

  return (
    <>
   <Navbar/>
    <div className="container3">
      <div className="card3">
        <h2>Verify OTP</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group3">
            <label htmlFor="otp">Enter OTP</label>
            <input
              id="otp"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit OTP"
              className="otp-input"
            />
          </div>

          <button type="submit" className='otpbtn' disabled={loading}>
            Verify OTP
          </button>

          <button type="button" className='otpbtn' onClick={handleResend} disabled={loading}>
            Resend OTP
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default OTPVerification;

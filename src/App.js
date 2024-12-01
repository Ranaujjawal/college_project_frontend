import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RegistrationForm from './components/register.js';
import Register from './components/finalregister.js'
import LoginForm from './components/login.js';
import Login from './components/finallogin.js'
import OTPVerification from './components/otp.js';
import Dashboard from './components/dashboard.js';
import Landing from './components/Landingpage.js'
import AboutPage from './components/about.js';
import ContactPage from './components/contact.js';
import ForgotPassword from './components/forgotpass.js';
import ForgotOtp from './components/forgototp.js'
import Resetpassword from './components/resetpassword.js'
import  Loader  from './components/Loader.js';
import axios from 'axios';
import Homepage from './components/homepage.js';
// import './App.css'
const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
    axios.defaults.withCredentials = true;
    
    // Check if user is already logged in
    const checkLoginStatus = async () => {
      try {
        setIsloading(true);
        const response = await axios.get('/users/profile');
        if (response.data && response.data.userId) {
          setIsLoggedIn(true);
          setIsloading(false);
          navigate('/dashboard')
        }
      } catch (error) {
        setIsloading(false);
        //console.log("User not logged in:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleRegister = async (formData) => {
    try {
      setIsloading(true);
      const form = new FormData();
      //console.log(formData);
      Object.keys(formData).forEach((key) => {
        // if (key === "avatar" && formData[key] instanceof File) {
        //   console.log(formData[key].name)
        //   form.append(key, formData[key].name);
        // } 
        if (key === "location") {
          // Append nested location object
          form.append(`${key}[description]`, formData[key].description);
          form.append(`${key}[coordinates][]`, formData[key].coordinates[0]); // Longitude
          form.append(`${key}[coordinates][]`, formData[key].coordinates[1]); // Latitude
        }else {
          // Append other fields as strings
          form.append(key, formData[key]);
        }});
        // for (let pair of form.entries()) {
        //   console.log(`${pair[0]}:`, pair);
        // }
      //console.log(form.entries);
      const response = await axios.post('/auth/register', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
     
      if (response.data.success) {
        alert(' Please verify your OTP.');
        setIsloading(false);
        navigate('/otp'); // Redirect to OTP verification
      } else {
        setIsloading(false);
        alert(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      setIsloading(false);
      //console.log('Error during registration:', error);
      alert('User already exists or registration failed.');
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      setIsloading(true);
     const response= await axios.post('/auth/verifyotp', { otp });
      alert('Registration successful! Please log in.');
     if(response.data.success) 
      {
        setIsloading(false);
        navigate('/flogin'); // Redirect to login page
        
      }
      } catch (error) {
      setIsloading(false);
     // console.log('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    }
  };
  const handleResendOTP = async () => {
    setIsloading(true);
    try {
      const response = await axios.post('/auth/resendregisterotp');
      if (response.data.success) {
        setIsloading(false);
       // alert('OTP resent successfully!');
      } else {
        setIsloading(false);
        alert('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      setIsloading(false);
      //console.log('Error resending OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    }
  };
  const handleLogin = async (loginData) => {
    setIsloading(true);
    try {
      await axios.post('/auth/login', loginData);
      alert('Login successful!');
      setIsLoggedIn(true); // Update login status
      setIsloading(false);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setIsloading(false);
      //console.log('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleForgotpassword = async (email) =>
  {
    setIsloading(true);
    try {
     // console.log(email);
     const response =  await axios.post('/auth/forgotPassword',{email});
     if(response.data.status)
     {
      alert(' Please verify your OTP.');
      setIsloading(false);
        navigate('/forgotpasswordotp');
     }
     else{
      setIsloading(false);
      alert(response.data.message || 'Something went wrong.');
     }
    } catch (error) {
      setIsloading(false);
      console.log('something went wrong', error);
      alert('User not Found');
    }
  }

  const handleForgotpasswordotp = async (otp) => {
    setIsloading(true);
    try {
      //console.log(otp);
     const response= await axios.post('/auth/verifyforgototppassword', { otp });
     if(response.data.status)
      {
        setIsloading(false);
       alert(' OTP verified successfully');
         navigate('/resetpassword');
      }
      else{
        setIsloading(false);
       alert(response.data.message || 'Something went wrong.');
      }
     // Redirect to login page
    } catch (error) {
      setIsloading(false);
      //console.log('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleResendOTPforgot = async () => {
    setIsloading(true);
    try {
      const response = await axios.post('/auth/resendforgototp');
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      //console.log('Error resending OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    }
  };

  const handleresetpassword = async (newPassword) =>
    {
      setIsloading(true);
      try {
       const response =  await axios.post('/auth/resetpassword',{newPassword});
       setIsloading(false);
          navigate('/flogin');
     
      } catch (error) {
        setIsloading(false);
        //console.log('something went wrong', error);
        alert('User not Found');
      }
    };

  if(isloading)
    {
      return (
        <>
        <Loader/>
        </>
      );
    }

  return (
    <div className="app-container">
        <Routes>
            {/* <Route path="/old" element={<Landing className="landing-page" />} /> */}
            <Route path="/" element={<Homepage className="landing-page" />} />
            <Route path="/about" element={<AboutPage className="landing-page" />} />
            <Route path="/forgotpassword" element={<ForgotPassword className="landing-page" onSubmit={handleForgotpassword} />} />
            <Route path="/forgotpasswordotp" element={<ForgotOtp className="landing-page" onVerify={handleForgotpasswordotp} onResend={handleResendOTPforgot}/>} />
            <Route path="/resetpassword" element={<Resetpassword className="landing-page" onSubmit={handleresetpassword} />} />
            <Route path="/contact" element={<ContactPage className="landing-page" />} />
            {/* <Route path="/register" element={<RegistrationForm className="form-container" onSubmit={handleRegister} />} /> */}
            <Route path="/fregister" element={<Register className="form-container" onSubmit={handleRegister} />} />
            <Route path="/otp" element={<OTPVerification className="otp-verification" onVerify={handleVerifyOTP} onResend={handleResendOTP} />} />
            {/* <Route path="/login" element={<LoginForm className="form-container" onSubmit={handleLogin} />} /> */}
            <Route path="/flogin" element={<Login className="form-container" onSubmit={handleLogin} />} />
            {isLoggedIn && <Route path="/dashboard/*" element={<Dashboard className="dashboard" />} />}
            <Route path="*" element={<div className="unauthorized-message">You are not authorized to view this page.</div>} />
        </Routes>
    </div>
);

};

export default App;

import React, { useState }  from "react";
import "./finallogin.css";
import I10 from './images/I10.png'
import I11 from './images/I11.jpg'
import { useNavigate } from 'react-router-dom';
import Nav from './fnavbar.js'
function Login({onSubmit}) {

    const navigate = useNavigate(); // Initialize useNavigate
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
   // console.log(id)
    setLoginData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 // console.log(loginData)
    if (!loginData.email || !loginData.password) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(loginData);
  };

  const handleNavigateToRegister = () => {
    navigate('/fregister'); // Navigate to the registration route
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword'); // Navigate to the forgot password route
  };

  return (
    <>
    <Nav/>
    <div className="container">
      <div className="login-box">
        <img
          src={I10}
          alt="Tasky Logo"
          className="logo"
        />
        <h1 className="poppins-bold">Welcome Back!</h1>
        <p className="subtitle">Please enter login details below</p>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
            //   value={loginData.email}
              onChange={handleChange}
              
              placeholder="Enter the email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
            //   value={loginData.password}
              onChange={handleChange}
              
              placeholder="Enter the Password"
              required
            />
          </div>
          <a href="/forgotpassword" className="forgot-password">
            Forgot password?
          </a>
          <button type="submit" className="btn-signin">
            Sign In
          </button>
          <div className="or-continue">Or continue</div>
          <div className="signup-link">
            Don't have an account? <a  href="/fregister">Sign Up</a>
          </div>
        </form>
      </div>
      <div className="illustration">
        <img
          src={I11}
          alt="Tasky Illustration"
        />
      </div>
    </div>
    </>
  );
}

export default Login;

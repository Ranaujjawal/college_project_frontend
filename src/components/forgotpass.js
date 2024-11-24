import React, { useState } from "react";
import "./forgotpass.css";
import Footer from './footer.js'
import Navbar from './fnavbar.js';
const ForgotPassword = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
    //console.log("Password reset link sent to:", email);
  };

  return (
    <>
    <Navbar/>
    <div className="body2">  
    <div className="forgot-password-container">
      <h1 >Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <label htmlFor="email"  className="forgottitle">Email Address</label>
          <input
         
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <button  className="forgotbtn" type="submit" >Reset Password</button>
      </form>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default ForgotPassword;

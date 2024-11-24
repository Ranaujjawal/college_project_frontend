// src/components/Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Profile = () => {
  const navigate = useNavigate();
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  axios.defaults.withCredentials = true;

  const handleLogout = async () => {
    // Perform any logout logic here (like clearing tokens, etc.)
    try {
  
        const response = await axios.post('/auth/logout')
  
        if (response.data.success) {
          alert('logout sccessfull');
          navigate('/'); // Redirect to OTP verification
        } else {
          alert(response.data.message || 'Something went wrong.');
        }
      } catch (error) {
        // console.log('Error during registration:', error);
        alert('User already exists or registration failed.');
      }
     // Redirect to login after logging out
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Welcome to your profile!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Chats from './Chats';
import Helper from './Helper';
import Profile from './Profile';
import axios from 'axios';
import './Dashboard.css'; // Add CSS for the layout
import Filter from './filter.js'
const Dashboard = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      navigate('helper'); // Navigate to helper on initial render
      setInitialRender(false); // Prevent subsequent navigation
    }
  }, [initialRender, navigate]);
  const handleLogout = async() => {
    try {
      const response = await axios.post('/auth/logout')
      if (response.data.success) {
        alert('logout sccessfull');
        navigate('/');
      } else {
        alert( 'Something went wrong.');
      }
    } catch (error) {
      console.log('Error during Logout:', error);
    }
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
    <>
    <nav>
            <div id="nav-container" className="nav-container">
                <a href="/" className="logo">Near.in</a>
                <button className="hamburger" onClick={toggleNav}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </button>
                <ul className="nav-links">
                    <li><Link to="helper" className="nav-link">Workers</Link></li>
                    <li><Link to="chats"  className="nav-link">Messages</Link></li>
                    <li> <Link to="profile" className="nav-link">Profile</Link></li>
                    <li><button className="login-btn" onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
        </nav>
    <div className="dashboard-wrapper">

      <main className="main-content">
        <Routes>
          <Route path="helper" element={<Helper />} />
          <Route path="chats" element={<Chats />} />
          <Route path="profile" element={<Profile />} />
          <Route path="" element={<Helper />} /> {/* Default route */}
        </Routes>
      </main>
    </div>
    </>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Chats from './Chats';
import Helper from './Helper';
import Profile from './Profile';
import './Dashboard.css'; // Add CSS for the layout

const Dashboard = () => {
  const navigate = useNavigate();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      navigate('helper'); // Navigate to helper on initial render
      setInitialRender(false); // Prevent subsequent navigation
    }
  }, [initialRender, navigate]);

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <nav className="nav-links">
          <Link to="helper" className="nav-item">Helper</Link>
          <Link to="chats" className="nav-item">Chats</Link>
          <Link to="profile" className="nav-item">Profile</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="helper" element={<Helper />} />
          <Route path="chats" element={<Chats />} />
          <Route path="profile" element={<Profile />} />
          <Route path="" element={<Helper />} /> {/* Default route */}
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;

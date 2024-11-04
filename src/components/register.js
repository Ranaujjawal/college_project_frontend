import React, { useState } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom';
// Registration Form Component
import Footer from './footer.js'
import Navbar from './navbar.js';
const RegistrationForm = ({ onSubmit }) => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    role: '',
    profession: '',
    hourlyRate: '',
    avatar: null
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.location || !formData.password || !formData.role || !formData.profession || !formData.hourlyRate) {
      setError('Please fill in all required fields');
      return;
    }

   

    onSubmit(formData);
  };
  const handleLoginclick = () =>
  {
    navigate('/login');
  }

  return (
    <>
    <Navbar/>
    <div className='outerbox'>
    <div className='outerboxpaddingtop'></div>
    <div className="register-container">
  <form onSubmit={handleSubmit} className="register-form">
    <h2>Register</h2>

    {error && <div className="error">{error}</div>}

    <div className="floating-label">
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder=" "
        className="input-field"
      />
      <label htmlFor="name" className="input-label">Name</label>
    </div>

    <div className="floating-label">
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder=" "
        className="input-field"
      />
      <label htmlFor="email" className="input-label">Email</label>
    </div>

    <div className="floating-label">
      <input
        id="location"
        name="location"
        type="text"
        value={formData.location}
        onChange={handleChange}
        placeholder=" "
        className="input-field"
      />
      <label htmlFor="location" className="input-label">Location</label>
    </div>

    <div className="floating-label">
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder=" "
        className="input-field"
      />
      <label htmlFor="password" className="input-label">Password</label>
    </div>

    <div className="floating-label">
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="input-field"
      >
        <option value="" disabled>Select a role</option>
        <option value="customer">Customer</option>
        <option value="worker">Worker</option>
      </select>
      <label htmlFor="role" className="input-label"></label>
    </div>

    <div className="floating-label">
      <select
        id="profession"
        name="profession"
        value={formData.profession}
        onChange={handleChange}
        className="input-field"
      >
        <option value="" disabled>Select a profession</option>
        <option value="none">None</option>
        <option value="plumber">Plumber</option>
        <option value="electrician">Electrician</option>
        <option value="carpenter">Carpenter</option>
        <option value="painter">Painter</option>
        <option value="cleaner">Cleaner</option>
        <option value="gardener">Gardener</option>
        <option value="other">Other</option>
      </select>
      <label htmlFor="profession" className="input-label"></label>
    </div>

    <div className="floating-label">
      <input
        id="hourlyRate"
        name="hourlyRate"
        type="text"
        value={formData.hourlyRate}
        onChange={handleChange}
        placeholder=" "
        className="input-field"
      />
      <label htmlFor="hourlyRate" className="input-label">Hourly Rate</label>
    </div>

    <div className="file-upload floating-label">
      <label htmlFor="avatar" className="input-label"></label>
      <div>
        <input
          id="avatar"
          name="avatar"
          type="file"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          onClick={() => document.getElementById('avatar').click()}
          className="input-field"
        >
          {formData.avatar ? formData.avatar.name : 'Choose File'}
        </button>
      </div>
    </div>

    <button type="submit" className="submit-button2">Register</button>

    <div className="login-section">
      <p className="login-text">Already a user?</p>
      <button type="button" className="login-button2" onClick={handleLoginclick}>Login</button>
    </div>
  </form>
</div>
<div className='outerboxpaddingbot'></div>
</div>
<Footer/>
</>
  );
  
};

export default RegistrationForm;

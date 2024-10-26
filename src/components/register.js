import React, { useState } from 'react';
import './register.css'
// Registration Form Component
const RegistrationForm = ({ onSubmit }) => {
   
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

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="fullName">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Home"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select a role</option>
            <option value="customer">customer</option>
            <option value="worker">Worker</option>
          </select>
        </div>
         
          <div className="form-group">
          <label htmlFor="profession">Profession</label>
          <select
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
          >
            <option value="">Select a profession</option>
            <option value="none">none</option>
            <option value="plumber">plumber</option>
            <option value="electrician">electrician</option>
            <option value="carpenter">carpenter</option>
            <option value="painter">painter</option>
            <option value="cleaner">cleaner</option>
            <option value="gardner">gardner</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
            <label htmlFor="hourlyRate">hourlyRate</label>
            <input
              id="hourlyRate"
              name="hourlyRate"
              type="text"
              value={formData.hourlyRate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload avatar</label>
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
                
              >
                {formData.avatar ? formData.avatar.name : 'Choose File'}
              </button>
            </div>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginForm = ({ onSubmit }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(loginData);
  };

  const handleNavigateToRegister = () => {
    navigate('/register'); // Navigate to the registration route
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to the forgot password route
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%' }}>
        <h2>Login</h2>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
          Login
        </button>

        <button 
          type="button" 
          onClick={handleNavigateToRegister} 
          style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }}
        >
          Register
        </button>

        <button 
          type="button" 
          onClick={handleForgotPassword} 
          style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'lightgreen', border: 'none', cursor: 'pointer' }}
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import './resetpassword.css';

const EnterNewPassword = ({onSubmit}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword && e.target.value !== newPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Add logic to handle password update here
      onSubmit(newPassword);
      alert('Password updated successfully!');
    } else {
      setError('Passwords do not match');
    }
    
  };

  return (
    <div className='body12'>
    <div className="password-container">
      <h1>Enter New Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group8">
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handlePasswordChange}
            required
            minLength="8"
          />
          <div className="password-strength">Password must be at least 8 characters long</div>
        </div>
        <div className="form-group8">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
    </div>
  );
};

export default EnterNewPassword;

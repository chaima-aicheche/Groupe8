import React, { useState } from 'react';
import './style.css'; 

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <div className="form-paragraphe">
        <p>Forgot your password? Reset it here!</p>
        <div></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              autoComplete="email" 
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="form-input"
              autoComplete="new-password" 
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="form-input"
              autoComplete="new-password" 
              required
            />
          </div>
        </div>
        <button type="submit" className="form-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;

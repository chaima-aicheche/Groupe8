import React, { useState } from 'react';
import './style.css'; 

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending reset password email
    console.log(`Sending reset link to ${formData.email}`);
    setMessage(`A reset link has been sent to ${formData.email}`);
    setFormData({ email: '' });
  };

  return (
    <div className="form-container">
      <div className="form-paragraphe">
        <p>Forgot your password? Reset it here!</p>
        {message && <div className="form-message">{message}</div>}
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
        <button type="submit" className="form-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;


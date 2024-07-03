import React, { useState } from 'react';
import './ContactForm.css'; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-col">
            <label className="form-label">Email:</label>
            <input
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label className="form-label">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>
        </div>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;

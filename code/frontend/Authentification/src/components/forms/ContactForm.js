import React, { useState } from 'react';
import './style.css'; 

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
      <div className="form-paragraphe">
        <p>Get in touch with us today <br />and let's start the conversation!</p>
        <div></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-col">
            <input
              type="email" 
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <textarea
              name="message"
              placeholder="Message"
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

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/contact-us">Contact Us</Link></li>
        <li><Link to="/register-candidate">Register as Candidate</Link></li>
        <li><Link to="/register-recruiter">Register as Recruiter</Link></li>
        <li><Link to="/reset-password">Reset Password</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

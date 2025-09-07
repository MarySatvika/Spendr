import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css'; // This file will contain the CSS from register.html

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Error: Passwords do not match. Please try again.');
      return;
    }

    if (formData.password.length < 6) {
      alert('Error: Password must be at least 6 characters long.');
      return;
    }

    alert(`Registration successful for user: ${formData.username}! You can now log in.`);
  };

  return (
    <div className="register-container">
      <Link to="/" className="home-link">
        ← Home
      </Link>
      
      <h2>Register for Spendr</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
      <div className="login-link">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
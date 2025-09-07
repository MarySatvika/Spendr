import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="welcome-container">
            <h1>Welcome to Spendr</h1>
            <p>Your personal finance tracker to manage expenses, track budgets, and achieve financial goals.</p>
            <div className="cta-buttons">
                <Link to="/login" className="login-btn">Log In</Link>
                <Link to="/register" className="register-btn">Register</Link>
            </div>
        </div>
    );
};

export default HomePage;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TransactionManager from './TransactionManager.jsx';
import LoginPage from './Components/LoginPage.jsx';
import RegisterPage from './Components/RegisterPage.jsx';
import HomePage from './Components/HomePage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<TransactionManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
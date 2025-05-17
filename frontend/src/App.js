import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'; // Create this CSS file for styling

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand">💰🫵 Do Your Taxes</div>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            {/* Add more links as needed */}
          </div>
        </nav>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">HIREBOT</div>
      <ul className="navbar-links">
        <li><Link to="/">Login/Signup</Link></li>
        <li><Link to="/home">Home</Link></li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;

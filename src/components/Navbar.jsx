import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./src/assets/logo.png" alt="Chawpa Logo" style={{height: '80px', borderRadius: '50px'}}/>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>
        <img src="logo.png" alt="Logo" />
      </Link>
      <input type="text" placeholder="Search..." />
      <Link to="/access">
        <button>Profile</button>
      </Link>
    </nav>
  );
};

export default Navbar;

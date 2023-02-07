import React from 'react';
import '../estilos/Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <img src="logo.png" alt="Logo" />
      <input type="text" placeholder="Search..." />
      <button>Profile</button>
    </nav>
  );
};

export default Navbar;

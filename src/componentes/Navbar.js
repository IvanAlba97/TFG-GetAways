import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Navbar.css';
import Logo from '../img/logo.png';
import Profile from '../img/profile-icon.ico';

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>
        <img src={Logo} alt="Logo" />
      </Link>
      <input type="text" placeholder="Buscar..." />
      <Link to="/access">
        <img className = 'contenedor-icono' src={Profile} alt="Profile" />
      </Link>
    </nav>
  );
};

export default Navbar;

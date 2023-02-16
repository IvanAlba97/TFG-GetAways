import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Navbar.css';
import Logo from '../img/logo.png';
import Profile from '../img/profile-icon.ico';
import BarraBusqueda from './BarraBusqueda';

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>
        <img src={Logo} alt="Logo" />
      </Link>
      <BarraBusqueda className = 'barra-busqueda' />
      <Link to="/access">
        <img className = 'contenedor-icono' src={Profile} alt="Profile" />
      </Link>
    </nav>
  );
};

export default Navbar;

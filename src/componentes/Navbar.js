import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Navbar.css';
import Logo from '../img/logo.png';
import Profile from '../img/profile-icon.ico';
import BarraBusqueda from './BarraBusqueda';

const Navbar = ({ user }) => {
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  const mostrarOcultarDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  return (
    <nav>
      <Link to='/'>
        <img src={Logo} alt="Logo" />
      </Link>
      <BarraBusqueda className='barra-busqueda' />
      <div className='contenedor-perfil'>
        {user ? (
          <div onClick={mostrarOcultarDesplegable}>
            <span>{user.nombre}</span>
            <img className="contenedor-icono" src={Profile} alt="Profile" />
            {mostrarDesplegable && (
              <div className="desplegable">
                <Link to='/perfil'>Perfil</Link>
                <Link to='/equipaje'>Equipaje</Link>
                <Link to='/rutas-pendientes'>Rutas pendientes</Link>
                <Link to='/rutas-completadas'>Rutas completadas</Link>
                <Link to='/cerrar-sesion'>Cerrar sesión</Link>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to="/access">
              <img className="contenedor-icono" src={Profile} alt="Profile" />
            </Link>
          </div>
        )
        }
      </div>
    </nav >
  );
};

export default Navbar;


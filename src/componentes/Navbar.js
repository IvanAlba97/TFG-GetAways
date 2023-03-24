import React, { useState } from 'react';
import '../estilos/Navbar.css';
import Logo from '../img/Logo2.1.png';
import Profile from '../img/profile-icon.ico';
import BarraBusqueda from './BarraBusqueda';
import { useEffect } from 'react';

const Navbar = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const mostrarOcultarDesplegable = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3333/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Error al cerrar sesión');
      }
  
      sessionStorage.removeItem('session');
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleOutsideClick = (event) => {
    if (showDropdown && !event.target.closest('.contenedor-perfil')) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [showDropdown]);


  return (
    <nav>
      <a href='/'>
        <img src={Logo} alt="Logo" />
      </a>
      <BarraBusqueda className='barra-busqueda' />
      <div className='contenedor-perfil'>
        {user ? (
          <div className='contenedor-perfil' onClick={mostrarOcultarDesplegable}>
            <span>{user.nombre}</span>
            <img className="contenedor-icono" src={Profile} alt="Profile" />
            {showDropdown && (
              <div className="desplegable">
                <a href='/perfil'>Perfil</a>
                <a href='/equipaje'>Equipaje</a>
                <a href='/rutas-pendientes'>Rutas pendientes</a>
                <a href='/rutas-completadas'>Rutas completadas</a>
                <a href='#' onClick={handleLogout}>Cerrar sesión</a>
              </div>
            )}
          </div>
        ) : (
          <div>
            <a href="/access">
              <img className="contenedor-icono" src={Profile} alt="Profile" />
            </a>
          </div>
        )
        }
      </div>
    </nav >
  );
};

export default Navbar;

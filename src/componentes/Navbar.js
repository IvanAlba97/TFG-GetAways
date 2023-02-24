import React, { useState } from 'react';
import '../estilos/Navbar.css';
import Logo from '../img/logo.png';
import Profile from '../img/profile-icon.ico';
import BarraBusqueda from './BarraBusqueda';

const Navbar = ({ user }) => {
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  const mostrarOcultarDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  const handleLogout = () => {
    fetch('http://localhost:3333/auth/logout', { method: 'POST' })
      .then(response => {
        if (response.ok) {
          // Eliminar información de sesión almacenada en el navegador
          sessionStorage.removeItem('session');
          // Redirigir al usuario a la página de inicio
          window.location.href = '/';
        } else {
          // Mostrar un mensaje de error
        }
      })
      .catch(error => {
        // Mostrar un mensaje de error
      });
  };

  return (
    <nav>
      <a href='/'>
        <img src={Logo} alt="Logo" />
      </a>
      <BarraBusqueda className='barra-busqueda' />
      <div className='contenedor-perfil'>
        {user ? (
          <div onClick={mostrarOcultarDesplegable}>
            <span>{user.nombre}</span>
            <img className="contenedor-icono" src={Profile} alt="Profile" />
            {mostrarDesplegable && (
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

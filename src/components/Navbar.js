import React, { useState } from 'react';
import '../styles/Navbar.css';
import Logo from '../img/Logo2.1.png';
import Profile from '../img/profile-icon.ico';
import SearchBar from './SearchBar';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSupervisor, setIsSupervisor] = useState(false);

  useEffect(() => {
    const isSupervisor = async () => {
      try {
        const response = await fetch(`http://localhost:3333/is-supervisor`, {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setIsSupervisor(data.isSupervisor);
        } else {
          // manejar el error en la respuesta
        }
      } catch (error) {
        console.error(error);
      }
    };
    isSupervisor();
  }, []);

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
      <Link to='/'>
        <img src={Logo} alt="Logo" />
      </Link>
      <SearchBar className='barra-busqueda' />
      <div className='contenedor-perfil'>
        {user ? (
          <div className='contenedor-perfil' onClick={mostrarOcultarDesplegable}>
            <span>{user.nombre}</span>
            <img className="contenedor-icono" src={Profile} alt="Profile" />
            {showDropdown && (
              <div className="desplegable">
                <Link to='/perfil'>Perfil</Link>
                <Link to='/equipaje'>Equipaje</Link>
                <Link to='/rutas-pendientes'>Rutas pendientes</Link>
                <Link to='/rutas-completadas'>Rutas completadas</Link>
                {isSupervisor &&
                  <Link to='/crud-usuarios'>CRUD Usuarios</Link>
                }
                <Link to='#' onClick={handleLogout}>Cerrar sesión</Link>
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

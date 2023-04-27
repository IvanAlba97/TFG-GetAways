import React, { useState, useEffect } from 'react';
import Card from './Card.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../styles/AllRoutes.css';

function AllRoutes() {
  const [routes, setRoutes] = useState([]);
  const [defaultRoutes, setDefaultRoutes] = useState([]);
  const [order, setOrder] = useState('default');
  const [user, setUser] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [location, setLocation] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [routesPerPage, setRoutesPerPage] = useState('');
  const indexOfLastRoute = currentPage * routesPerPage;
  const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
  const currentRoutes = routes.slice(indexOfFirstRoute, indexOfLastRoute);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  })

  useEffect(() => {
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setUser(null);
        }
      })
      .then((data) => {
        if (data) {
          setUser(data.user);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3333/hiking-route')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener las rutas');
        }
      })
      .then((data) => {
        setRoutes(data);
        setDefaultRoutes(data);
        setRoutesPerPage(5);
      })
      .catch((error) => console.error(error));
  }, []);


  useEffect(() => {
    fetch('http://localhost:3333/provinces')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setProvinces(data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (order == 'default' && location == 'default') {
      setRoutes(defaultRoutes);
    } else if (order == 'default') {
      setRoutes(defaultRoutes.filter(route => route.id_provincia == location));
    } else if (location == 'default') {
      switch (order) {
        case 'ratings':
          setRoutes(defaultRoutes.slice().sort((a, b) => b.media_valoraciones - a.media_valoraciones));
          break;
        case 'popular':
          setRoutes(defaultRoutes.slice().sort((a, b) => b.num_ocurrencias - a.num_ocurrencias));
          break;
        default:
          break;
      }
    } else {
      switch (order) {
        case 'ratings':
          setRoutes(defaultRoutes.filter(route => route.id_provincia == location).slice().sort((a, b) => b.media_valoraciones - a.media_valoraciones));
          break;
        case 'popular':
          setRoutes(defaultRoutes.filter(route => route.id_provincia == location).slice().sort((a, b) => b.num_ocurrencias - a.num_ocurrencias));
          break;
        default:
          break;
      }
    }
  }, [order, location, defaultRoutes]);
  

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(routes.length / routesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    // Configurar el desplazamiento suave con window.scrollTo()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    setCurrentPage(pageNumber);
  }

  return (
    <div className='fondo'>
      <Navbar user={user} />
      <div className='contenedor'>
        <h1>Rutas de senderismo</h1>
        <div className='desplegables'>
          <div className='desplegable-individual'>
            <label htmlFor='location'>Filtrar por provincia:</label>
            <select id='location' value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value='default'>Seleccionar una opción</option>
              {provinces.map(province => (
                <option key={province.id} value={province.id}>{province.nombre}</option>
              ))}
            </select>
          </div>
          <div className='desplegable-individual'>
            <label htmlFor='order'>Ordenar por:</label>
            <select id='order' value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value='default'>Seleccionar una opción</option>
              <option value='ratings'>Mejor valoradas</option>
              <option value='popular'>Más populares</option>
            </select>
          </div>
        </div>
      </div>
      {currentRoutes.map(ruta => (
        <Card
          key={ruta.id}
          id={ruta.id}
          name={ruta.nombre}
          description={ruta.descripcion}
          image={ruta.imagen}
          averageRating={ruta.media_valoraciones} />
      ))}
      <div className='pagination'>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage == number ? 'currentPage' : 'no-currentPage'}
          >
            {number}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );

}

export default AllRoutes;

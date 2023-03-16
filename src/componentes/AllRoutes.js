import React, { useState, useEffect } from 'react';
import Tarjeta from './Tarjeta';
import Navbar from './Navbar';
import Footer from './Footer';
import '../estilos/AllRoutes.css';

function AllRoutes() {
  const [routes, setRoutes] = useState([]);
  const [defaultRoutes, setDefaultRoutes] = useState([]);
  const [order, setOrder] = useState('default');
  const [user, setUser] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [location, setLocation] = useState('default');

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
      setRoutes(defaultRoutes.filter(ruta => ruta.id_provincia == location));
    } else if (location == 'default') {
      switch (order) {
        case 'ratings':
          setRoutes(defaultRoutes.slice().sort((a, b) => b.media_valoraciones - a.media_valoraciones));
          break;
        case 'popular':
          setRoutes(defaultRoutes.slice().sort((a, b) => b.num_ocurrencias - a.num_ocurrencias));
          break;
      }
    } else {
      switch (order) {
        case 'ratings':
          setRoutes(defaultRoutes.filter(ruta => ruta.id_provincia == location).slice().sort((a, b) => b.media_valoraciones - a.media_valoraciones));
          break;
        case 'popular':
          setRoutes(defaultRoutes.filter(ruta => ruta.id_provincia == location).slice().sort((a, b) => b.num_ocurrencias - a.num_ocurrencias));
          break;
      }
    }
  }, [order, location]);

  return (
    <div className='fondo'>
      <Navbar user={user} />
      <div className='contenedor'>
        <h1>routes de senderismo</h1>
        <div className='desplegables'>
          <div className='desplegable-individual'>
            <label htmlFor="location">Filtrar por provincia:</label>
            <select id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="default">Seleccionar una opción</option>
              {provinces.map(provincia => (
                <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
              ))}
            </select>
          </div>
          <div className='desplegable-individual'>
            <label htmlFor="order">Ordenar por:</label>
            <select id="order" value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="default">Seleccionar una opción</option>
              <option value="ratings">Mejor valoradas</option>
              <option value="popular">Más populares</option>
            </select>
          </div>
        </div>
      </div>
      {routes.map(ruta => (
        <Tarjeta
          key={ruta.id}
          id={ruta.id}
          name={ruta.nombre}
          description={ruta.descripcion}
          image={ruta.imagen}
          averageRatings={ruta.media_valoraciones} />
      ))}
      <Footer />
    </div>
  );
}

export default AllRoutes;

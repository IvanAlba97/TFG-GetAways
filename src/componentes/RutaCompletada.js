import React, { useState, useEffect } from 'react';
import Tarjeta from './Tarjeta';
import Navbar from './Navbar';
import Footer from './Footer';

function RutaCompletada() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/completed-route', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setRoutes(data));
  }, []);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No se ha iniciado sesión');
        }
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='fondo'>
      <Navbar user={user} />
      <div style={{ textAlign: 'center' }}>
        <h1 style={{color: '#5e451e'}}>Rutas completadas</h1>
      </div>
      {routes.map(route => (
        <Tarjeta
          key={route.id}
          id={route.id}
          name={route.nombre}
          description={route.descripcion}
          image={route.imagen}
          averageRating={route.media_valoraciones} />
      ))}
      <Footer />
    </div>
  );
}

export default RutaCompletada;

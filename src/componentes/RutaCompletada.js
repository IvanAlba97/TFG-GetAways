import React, { useState, useEffect } from 'react';
import Tarjeta from './Tarjeta';
import Navbar from './Navbar';
import Footer from './Footer';

function RutaPendiente() {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/ruta-completada', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setRutas(data));
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
        <h1>Rutas Completadas</h1>
      </div>
      {rutas.map(ruta => (
        <Tarjeta
          key={ruta.id}
          id={ruta.id}
          nombre={ruta.nombre}
          descripcion={ruta.descripcion}
          imagen={ruta.imagen} />
      ))}
      <Footer />
    </div>
  );
}

export default RutaPendiente;

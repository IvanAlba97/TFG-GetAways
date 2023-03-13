import React, { useState, useEffect } from 'react';
import Tarjeta from './Tarjeta';
import Navbar from './Navbar';
import Footer from './Footer';

function AllRoutes() {
  const [rutas, setRutas] = useState([]);
  const [orden, setOrden] = useState(''); // Nuevo estado para almacenar el ordenamiento seleccionado
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setUser(null);
          console.warn('No se ha iniciado sesión');
        }
      })
      .then((data) => {
        if (data) {
          setUser(data.user);
          console.log('User');
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    switch (orden) {
      case 'valoraciones':
        fetch('http://localhost:3333/ruta-senderismo')
          .then(res => res.json())
          .then(data => {
            data.sort((a, b) => b.media_valoraciones - a.media_valoraciones);
            setRutas(data);
            console.log('Valoraciones');
          })
          .catch(error => {
            console.error('Error al obtener datos:', error);
          });
        break;
      case 'completadas':
        fetch('http://localhost:3333/ruta_completada')
          .then(res => res.json())
          .then(data => {
            data.sort((a, b) => b.num_ocurrencias - a.num_ocurrencias);
            setRutas(data);
            console.log('Completadas');
          })
          .catch(error => {
            console.error('Error al obtener datos:', error);
          });
        break;
      default:
        fetch('http://localhost:3333/ruta-senderismo')
          .then(res => res.json())
          .then(data => {
            setRutas(data);
            console.log('Default');
          })
          .catch(error => {
            console.error('Error al obtener datos:', error);
          });
        break;
    }
  }, [orden, setRutas]);

  return (
    <div className='fondo'>
      <Navbar user={user} />
      <div style={{ textAlign: 'center' }}>
        <h1>Todas las rutas</h1>
        <div>
          <label htmlFor="orden">Ordenar por:</label>
          <select id="orden" value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="">Seleccionar una opción</option>
            <option value="valoraciones">Mejor valoradas</option>
            <option value="completadas">Más completadas</option>
          </select>
        </div>
      </div>
      {rutas.map(ruta => (
        <Tarjeta
          key={ruta.id}
          id={ruta.id}
          nombre={ruta.nombre}
          descripcion={ruta.descripcion}
          imagen={ruta.imagen}
          media_valoraciones={ruta.media_valoraciones} />
      ))}
      <Footer />
    </div>
  );
}

export default AllRoutes;

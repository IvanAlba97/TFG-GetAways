import React, { useState, useEffect } from 'react';
import Tarjeta from './Tarjeta';
import Navbar from './Navbar';
import Footer from './Footer';

function AllRoutes() {
  const [rutas, setRutas] = useState([]);
  const [rutasDefault, setRutasDefault] = useState([]);
  const [orden, setOrden] = useState('default');
  const [user, setUser] = useState(null);
  const [provincias, setProvincias] = useState([]);
  const [ubicacion, setUbicacion] = useState('default');

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
    fetch('http://localhost:3333/ruta-senderismo')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener las rutas');
        }
      })
      .then((data) => {
        setRutas(data);
        setRutasDefault(data);
      })
      .catch((error) => console.error(error));
  }, []);


  useEffect(() => {
    fetch('http://localhost:3333/provincias')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }/*  else {
          setProvincias(null);
        } */
      })
      .then((data) => {
        if (data) {
          setProvincias(data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (orden == 'default' && ubicacion == 'default') {
      setRutas(rutasDefault);
    } else if (orden == 'default') {
      setRutas(rutasDefault.filter(ruta => ruta.id_provincia == ubicacion));
    } else if (ubicacion == 'default') {
      console.log('Ordenación');
      switch (orden) {
        case 'valoraciones':
          setRutas(rutasDefault.slice().sort((a, b) => b.media_valoraciones - a.media_valoraciones));
          break;
        case 'completadas':
          setRutas(rutasDefault.slice().sort((a, b) => b.num_ocurrencias - a.num_ocurrencias));
          break;
      }
    } else {
      switch (orden) {
        case 'valoraciones':
          setRutas(rutasDefault.filter(ruta => ruta.id_provincia == ubicacion).slice().sort((a, b) => b.media_valoraciones - a.media_valoraciones));
          break;
        case 'completadas':
          setRutas(rutasDefault.filter(ruta => ruta.id_provincia == ubicacion).slice().sort((a, b) => b.num_ocurrencias - a.num_ocurrencias));
          break;
      }
    }
  }, [orden, ubicacion]);

  return (
    <div className='fondo'>
      <Navbar user={user} />
      <div style={{ textAlign: 'center' }}>
        <h1>Rutas</h1>
        <div>
          <label htmlFor="ubicacion">Ordenar por:</label>
          <select id="ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
            <option value="default">Seleccionar una opción</option>
            {provincias.map(provincia => (
              <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="orden">Ordenar por:</label>
          <select id="orden" value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="default">Seleccionar una opción</option>
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

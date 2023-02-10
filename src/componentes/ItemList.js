import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tarjeta from './Tarjeta.js';

function ItemList() {
  
  const [rutas, setRutas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRutas = async () => {
      try {
        const res = await axios.get('http://localhost:3333');
        setRutas(res.data);
      } catch (err) {
        setError(err);
      }
    };
    getRutas();
  }, []);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {<ul>
        {rutas.map(ruta => (
                <Tarjeta 
                id = {ruta.id} 
                nombre = {ruta.nombre}
                descripcion = {ruta.descripcion}
                imagen = {ruta.imagen}/>
              ))}
      </ul>}
    </div>
  );
}

export default ItemList;

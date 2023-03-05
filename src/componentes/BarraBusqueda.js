import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../estilos/BarraBusqueda.css';

function BarraBusqueda() {
  const [busqueda, setBusqueda] = useState('');
  const [rutas, setRutas] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleBusqueda = async () => {
    const response = await axios.get(`http://localhost:3333/search?busqueda=${busqueda}`);
    setRutas(response.data);
  };

  return (
    <div className='contenedor-busqueda' onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} onKeyUp={handleBusqueda} />
      <div className={`resultados-busqueda ${focused ? '' : 'hidden'}`}>
        {rutas.map((ruta) => (
          <Link key={ruta.id} to={`/ruta/${ruta.id}`} className='enlace-ruta'>
            <div className='contenedor-individual'>{ruta.nombre}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


export default BarraBusqueda;

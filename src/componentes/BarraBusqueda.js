import React, { useState } from 'react';
import axios from 'axios';
import '../estilos/BarraBusqueda.css';

function BarraBusqueda() {
  const [busqueda, setBusqueda] = useState('');
  const [rutas, setRutas] = useState([]);

  const handleBusqueda = async () => {
    const response = await axios.get(`http://localhost:3333/search?busqueda=${busqueda}`);
    setRutas(response.data);
  };

  return (
    <div style={{ position: 'relative' }}>
      <form>
        <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} onKeyUp={handleBusqueda} />
      </form>
      <div className='resultados-busqueda'>
        {rutas.map((ruta) => (
          <div key={ruta.id}>{ruta.nombre}</div>
        ))}
      </div>
    </div>
  );
}

export default BarraBusqueda;

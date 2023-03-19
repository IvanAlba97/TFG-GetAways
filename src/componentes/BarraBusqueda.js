import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../estilos/BarraBusqueda.css';

function BarraBusqueda() {
  const [search, setSearch] = useState('');
  const [routes, setRoutes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);
  const searchResultsRef = useRef(null);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:3333/search/${search}`);
    const data = await response.json();
    setRoutes(data);
    setShowResults(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target) &&
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target)
    ) {
      setShowResults(false);
    }
  };

  return (
    <div className='contenedor-busqueda' ref={searchContainerRef}>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleSearch} />
      {showResults && (
        <div className='resultados-busqueda' ref={searchResultsRef}>
          {routes.map((route) => (
            <Link key={route.id} to={`/ruta/${route.id}`} className='enlace-ruta'>
          <div className='contenedor-individual'>{route.nombre}</div>
        </Link>
      ))}
    </div>
  )
}
</div >
);
}

export default BarraBusqueda;
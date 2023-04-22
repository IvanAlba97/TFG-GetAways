import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import lupaIcono from '../img/lupa.png';
import '../styles/SearchBar.css';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [routes, setRoutes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showFullSearch, setShowFullSearch] = useState(false); // nueva variable
  const searchContainerRef = useRef(null);
  const searchResultsRef = useRef(null);

  const handleSearch = async () => {
    if (search.trim() === '') {
      // Si la barra de búsqueda está vacía, no hacemos la petición fetch
      setRoutes([]);
      setShowResults(false);
      return;
    }
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

  const handleToggleSearch = () => {
    setShowFullSearch(!showFullSearch);
  };

  const handleLinkClick = () => {
    setSearch('');
    setShowResults(false);
    setShowFullSearch(false);
  };

  return (
    <div>
      <div className='contenedor-lupa'>
        <img src={lupaIcono} alt="icono de búsqueda" onClick={handleToggleSearch} />
        {showFullSearch ?
          <div className='contenedor-busqueda-full' ref={searchContainerRef}>
            <input type="text" placeholder='Buscar' value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleSearch} />
            {showResults && (
              <div className='resultados-busqueda-full' ref={searchResultsRef}>
                {routes.map((route) => (
                  <Link key={route.id} to={`/ruta/${route.id}`} className='enlace-ruta' onClick={handleLinkClick}>
                    <div className='contenedor-individual'>{route.nombre}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          : ''
        }
      </div>
      <div className='contenedor-busqueda' ref={searchContainerRef}>
        <input type="text" placeholder='Buscar' value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleSearch} />
        {showResults && (
          <div className='resultados-busqueda' ref={searchResultsRef}>
            {routes.map((route) => (
              <a key={route.id} href={`/ruta/${route.id}`} className='enlace-ruta' onClick={handleLinkClick}>
                <div className='contenedor-individual'>{route.nombre}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );

}

export default SearchBar;

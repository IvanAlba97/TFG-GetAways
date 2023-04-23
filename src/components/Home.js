import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Access from './Access.js';
import '../styles/Home.css';
import Intro from './Intro.js';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';
/* import Map from './Map.js'; */

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Realizar la solicitud para obtener información de sesión
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error('No se ha iniciado sesión'));
        }
      })
      .then(data => {
        setUser(data?.user);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="fondo">
      <Routes>
        <Route path="/access" element={<Access />} />
      </Routes>
      <Navbar user={user} />
      <div className="content">
        <div className="column-1">
          <Intro />
          <Carousel />
          <Link to='/rutas'>
            <div className='todas-las-rutas'>
              Todas las rutas
            </div>
          </Link>
          <Link to='/comunidad'>
            <div className='todas-las-rutas'>
              Comunidad
            </div>
          </Link>
          {/* <Map /> */}
        </div>
        <div className="column-2">
          {/* <Intro /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

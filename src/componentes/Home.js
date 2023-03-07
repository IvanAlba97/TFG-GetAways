import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Access from './Access.js';
import '../estilos/Home.css';
import Intro from './Intro.js';
import Carrusel from './Carrusel';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Realizar la solicitud para obtener información de sesión
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          //throw new Error('No se ha iniciado sesión');
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
          <Carrusel />
          {/* <Map /> */}
          <a href='/rutas'>
            <div className='todas-las-rutas'>
              Todas las rutas
            </div>
          </a>
        </div>
        <div className="column-2">
          <Intro />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Content from './Content.js';
import Access from './Access.js';

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Realizar la solicitud para obtener información de sesión
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          setLoggedIn(true);
          return response.json();
        } else {
          setLoggedIn(false);
          throw new Error('No se ha iniciado sesión');
        }
      })
      .then(data => {
        setUser(data.user);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/access" element={<Access />} />
      </Routes>
      <Navbar user={user} />
      {/* {loggedIn ? (
        <div>
          {sessionStorage.getItem('session') && JSON.parse(sessionStorage.getItem('session')).user ? (
            <p>Has iniciado sesión como {JSON.parse(sessionStorage.getItem('session')).user.nombre}</p>
          ) : (
            <p>Se ha iniciado sesión pero algo no anda bien</p>
          )}
          
        </div>
      ) : (
        <p>No se ha iniciado sesión</p>
      )} */}
      <Content />
      <Footer />
    </div>
  );
}

export default Home;

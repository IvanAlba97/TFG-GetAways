import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Perfil() {
  const [user, setUser] = useState({});
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [correoAntiguo, setCorreoAntiguo] = useState('');
  const [correoError, setCorreoError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No se ha iniciado sesión');
        }
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  function actualizarNombre() {
    fetch('http://localhost:3333/actualizar-nombre', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nuevoNombre }),
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          setUser({ ...user, nombre: nuevoNombre });
          setNuevoNombre('');
          setNombreError(false);
        } else {
          setNombreError(true);
          setCorreoError(false);
          res.json().then(({ message }) => {
            //console.error(message);
            setErrorMessage(message);
          });
        }
      })
      .catch(err => console.error(err));
  }

  function actualizarCorreo() {
    fetch('http://localhost:3333/actualizar-correo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: nuevoCorreo, correoAntiguo: correoAntiguo }),
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          setUser({ ...user, correo: nuevoCorreo });
          setNuevoCorreo('');
          setCorreoAntiguo('');
          setCorreoError(false);
        } else {
          setCorreoError(true);
          setNombreError(false);
          res.json().then(({ message }) => {
            //console.error(message);
            setErrorMessage(message);
          });
        }
      })
      .catch(err => console.error(err));
  }


  return (
    <div>
      <Navbar user={user} />
      <h1>Perfil</h1>
      <p>Hola {user.nombre}</p>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nuevoNombre} onChange={event => setNuevoNombre(event.target.value)} />
        {nombreError && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button onClick={actualizarNombre}>Actualizar</button>
      </div>
      <p>Hola {user.correo}</p>
      <div>
        <label>Correo electrónico antiguo:</label>
        <input type="email" value={correoAntiguo} onChange={event => setCorreoAntiguo(event.target.value)} />
        <label>Correo electrónico nuevo:</label>
        <input type="email" value={nuevoCorreo} onChange={event => setNuevoCorreo(event.target.value)} />
        {correoError && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button onClick={actualizarCorreo}>Actualizar</button>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
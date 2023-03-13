import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../estilos/Perfil.css';

function Perfil() {

  /* USUARIO */
  const [user, setUser] = useState({});

  /* NOMBRE */
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [actualizacionNombreExitosa, setActualizacionNombreExitosa] = useState(false);
  const [successfulNameMessage, setSuccessfulNameMessage] = useState('');

  /* CORREO */
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [correoAntiguo, setCorreoAntiguo] = useState('');
  const [correoError, setCorreoError] = useState(false);
  const [actualizacionCorreoExitosa, setActualizacionCorreoExitosa] = useState(false);
  const [successfulEmailMessage, setSuccessfulEmailMessage] = useState('');

  /* CONTRASEÑA */
  const [contrasenaAntigua, setContrasenaAntigua] = useState('');
  const [contrasenaNueva, setContrasenaNueva] = useState('');
  const [contrasenaNuevaRepetida, setContrasenaNuevaRepetida] = useState('');
  const [contrasenaError, setContrasenaError] = useState(false);
  const [actualizacionContrasenaExitosa, setActualizacionContrasenaExitosa] = useState(false);
  const [successfulPasswordMessage, setSuccessfulPasswordMessage] = useState('');

  /* ERROR */
  const [errorMessage, setErrorMessage] = useState('');

  /* VISIBILIDAD */
  const [showUpdateUsername, setShowUpdateUsername] = useState(false);
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

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
        console.log('PERFIL')
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
          setActualizacionNombreExitosa(true);
          setActualizacionCorreoExitosa(false);
          setActualizacionContrasenaExitosa(false);
          res.json().then(({ message }) => {
            setSuccessfulNameMessage(message);
          });
        } else {
          setNombreError(true);
          setCorreoError(false);
          setContrasenaError(false);
          setActualizacionNombreExitosa(false);
          setActualizacionCorreoExitosa(false);
          setActualizacionContrasenaExitosa(false);
          res.json().then(({ message }) => {
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
          setActualizacionCorreoExitosa(true);
          setActualizacionNombreExitosa(false);
          setActualizacionContrasenaExitosa(false);
          res.json().then(({ message }) => {
            setSuccessfulEmailMessage(message);
          });
        } else {
          setCorreoError(true);
          setNombreError(false);
          setActualizacionCorreoExitosa(false);
          res.json().then(({ message }) => {
            setErrorMessage(message);
          });
        }
      })
      .catch(err => console.error(err));
  }

  function actualizarContrasena() {
    fetch('http://localhost:3333/actualizar-contrasena', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contrasenaAntigua: contrasenaAntigua, contrasenaNueva: contrasenaNueva, contrasenaNuevaRepetida: contrasenaNuevaRepetida }),
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          setContrasenaAntigua('');
          setContrasenaNueva('');
          setContrasenaNuevaRepetida('');
          setContrasenaError(false);
          setActualizacionContrasenaExitosa(true);
          setActualizacionNombreExitosa(false);
          setActualizacionCorreoExitosa(false);
          res.json().then(({ message }) => {
            setSuccessfulPasswordMessage(message);
          });
        } else {
          setContrasenaError(true);
          setActualizacionContrasenaExitosa(false);
          res.json().then(({ message }) => {
            setErrorMessage(message);
          });
        }
      })
      .catch(err => console.error(err));
  }

  const toggleUpdateUsername = () => {
    setShowUpdateUsername(!showUpdateUsername);
  };
  const toggleUpdateEmail = () => {
    setShowUpdateEmail(!showUpdateEmail);
  };
  const toggleUpdatePassword = () => {
    setShowUpdatePassword(!showUpdatePassword);
  };

  return (
    <div className='fondo'>
      <Navbar user={user} />
      <div className="perfil-content">
        <div className='titulo'><h1>Perfil</h1></div>
        <div className='contenedor-botones'>
          <div className='contenedor-boton-individual'>
            <button className='perfil-button' onClick={toggleUpdateUsername}>
              Cambiar nombre
            </button>
            {showUpdateUsername &&
              <div className="perfil-input-container">
                <label>Nombre:</label>
                <input type="text" value={nuevoNombre} onChange={event => setNuevoNombre(event.target.value)} />
                {nombreError && <p className="error-message">{errorMessage}</p>}
                {actualizacionNombreExitosa && <p>{successfulNameMessage}</p>}
                <button className="perfil-button" onClick={actualizarNombre}>Actualizar nombre</button>
              </div>}
          </div>
          <div className='contenedor-boton-individual'>
            <button className='perfil-button' onClick={toggleUpdateEmail}>
              Cambiar correo
            </button>
            {showUpdateEmail &&
              <div className="perfil-input-container">
                <label>Correo electrónico antiguo:</label>
                <input type="email" value={correoAntiguo} onChange={event => setCorreoAntiguo(event.target.value)} />
                <label>Correo electrónico nuevo:</label>
                <input type="email" value={nuevoCorreo} onChange={event => setNuevoCorreo(event.target.value)} />
                {correoError && <p className="error-message">{errorMessage}</p>}
                {actualizacionCorreoExitosa && <p>{successfulEmailMessage}</p>}
                <button className="perfil-button" onClick={actualizarCorreo}>Actualizar correo</button>
              </div>}
          </div>
          <div className='contenedor-boton-individual'>
            <button className='perfil-button' onClick={toggleUpdatePassword}>
              Cambiar contraseña
            </button>
            {showUpdatePassword &&
              <div className="perfil-input-container">
                <label>Contraseña antigua:</label>
                <input type="password" value={contrasenaAntigua} onChange={event => setContrasenaAntigua(event.target.value)} />
                <label>Nueva contraseña:</label>
                <input type="password" value={contrasenaNueva} onChange={event => setContrasenaNueva(event.target.value)} />
                <label>Confirmar nueva contraseña:</label>
                <input type="password" value={contrasenaNuevaRepetida} onChange={event => setContrasenaNuevaRepetida(event.target.value)} />
                {contrasenaError && <p className="error-message">{errorMessage}</p>}
                {actualizacionContrasenaExitosa && <p>{successfulPasswordMessage}</p>}
                <button className="perfil-button" onClick={actualizarContrasena}>Actualizar contraseña</button>
              </div>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DeleteAccount from './DeleteAccount';
import '../styles/Profile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {

  /* USUARIO */
  const [user, setUser] = useState({});

  /* NOMBRE */
  const [newUsername, setNewUsername] = useState('');

  /* CORREO */
  const [newEmail, setNewEmail] = useState('');
  const [oldEmail, setOldEmail] = useState('');

  /* CONTRASEÑA */
  const [password, setPassword] = useState('');   // Necesaria para modificar usuario
  const [password2, setPassword2] = useState('');   // Necesaria para modificar correo
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRepeatedPassword, setNewRepeatedPassword] = useState('');

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
        setUser(data.user);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  function updateUsername() {
    fetch('http://localhost:3333/update-username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: newUsername, password: password }),
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          res.json().then(({ message }) => {
            toast.success(message);
          });
          setUser({ ...user, nombre: newUsername });
        } else {
          res.json().then(({ message }) => {
            toast.error(message);
          });
        }
        setNewUsername('');
        setPassword('');
      })
      .catch(err => console.error(err));
  }

  function actualizarCorreo() {
    fetch('http://localhost:3333/update-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newEmail: newEmail, oldEmail: oldEmail, password: password2 }),
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          res.json().then(({ message }) => {
            toast.success(message);
          });
          setUser({ ...user, correo: newEmail });
        } else {
          res.json().then(({ message }) => {
            toast.error(message);
          });
        }
        setNewEmail('');
        setOldEmail('');
        setPassword2('');
      })
      .catch(err => console.error(err));
  }

  function updatePassword() {
    fetch('http://localhost:3333/update-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword, newRepeatedPassword: newRepeatedPassword }),
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          toast.success("Contraseña modificada correctamente.");
          setOldPassword('');
          setNewPassword('');
          setNewRepeatedPassword('');
        } else {
          res.json().then(({ message }) => {
            toast.error(message);
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
                <label>Nombre nuevo:</label>
                <input type="text" value={newUsername} onChange={event => setNewUsername(event.target.value)} />
                <label>Contraseña:</label>
                <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                <button className="perfil-button-submit" onClick={updateUsername}>Actualizar nombre</button>
              </div>}
          </div>
          <div className='contenedor-boton-individual'>
            <button className='perfil-button' onClick={toggleUpdateEmail}>
              Cambiar correo
            </button>
            {showUpdateEmail &&
              <div className="perfil-input-container">
                <label>Correo electrónico antiguo:</label>
                <input type="email" value={oldEmail} onChange={event => setOldEmail(event.target.value)} />
                <label>Correo electrónico nuevo:</label>
                <input type="email" value={newEmail} onChange={event => setNewEmail(event.target.value)} />
                <label>Contraseña:</label>
                <input type="password" value={password2} onChange={event => setPassword2(event.target.value)} />
                <button className="perfil-button-submit" onClick={actualizarCorreo}>Actualizar correo</button>
              </div>}
          </div>
          <div className='contenedor-boton-individual'>
            <button className='perfil-button' onClick={toggleUpdatePassword}>
              Cambiar contraseña
            </button>
            {showUpdatePassword &&
              <div className="perfil-input-container">
                <label>Contraseña antigua:</label>
                <input type="password" value={oldPassword} onChange={event => setOldPassword(event.target.value)} />
                <label>Contraseña nueva:</label>
                <input type="password" value={newPassword} onChange={event => setNewPassword(event.target.value)} />
                <label>Confirmar contraseña nueva:</label>
                <input type="password" value={newRepeatedPassword} onChange={event => setNewRepeatedPassword(event.target.value)} />
                <button className="perfil-button-submit" onClick={updatePassword}>Actualizar contraseña</button>
              </div>}
          </div>
        </div>
        <ToastContainer />
        <DeleteAccount />
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
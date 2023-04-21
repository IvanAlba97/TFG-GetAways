import React, { useState } from "react";
import '../styles/Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  /* const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false); */

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await fetch('http://localhost:3333/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, confirmPassword })
    })
      .then(async response => {
        if (response.ok) {
          toast.success("Usuario registrado correctamente.");
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          /* setShowErrorMessage(false); */
          fetch('http://localhost:3333/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: username,
              password
            }),
            credentials: 'include',
          })
            .then(async res => {
              if (res.ok) {
                // Almacenar la sesión en sessionStorage
                const data = res.json();
                sessionStorage.setItem('session', JSON.stringify(data));
                window.location.href = '/';
              }
            })
        } else {
          response.json().then(({ error }) => {
            toast.error(error);
            /* setErrorMessage(error); */
            /* setShowErrorMessage(true); */
          });
          throw new Error('Error al iniciar sesión');
        }
      })
      .catch(error => {
        //console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={event => setConfirmPassword(event.target.value)}
      />
      <div className='error-message'>
        {/* {showErrorMessage ? errorMessage : ''} */}
      </div>
      <button type="submit">Registrar</button>
      <ToastContainer />
    </form>
  );
};

export default Register;

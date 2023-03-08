import React, { useState } from "react";
import '../estilos/Register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await fetch('http://localhost:3333/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
      .then(async response => {
        if (response.ok) {
          alert('Usuario registrado correctamente');
          setUsername('');
          setEmail('');
          setPassword('');
          setShowErrorMessage(false);

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
            setErrorMessage(error);
            setShowErrorMessage(true);
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
      <div className='error-message'>
        {showErrorMessage ? errorMessage : ''}
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;

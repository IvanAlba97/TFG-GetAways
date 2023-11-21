import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/Login.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('http://localhost:3333/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message);
    } else {
      const data = await response.json();
      sessionStorage.setItem('session', JSON.stringify(data));
      window.location.href = '/';
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input
        type='text'
        placeholder='Correo electrónico'
        value={identifier}
        onChange={(event) => setIdentifier(event.target.value)}
      />
      <input
        type='password'
        placeholder='Contraseña'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type='submit'>Acceder</button>
      <ToastContainer />
    </form>
  );
};

export default Login;

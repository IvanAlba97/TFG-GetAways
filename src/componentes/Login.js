import React, { useState } from "react";
import '../estilos/Login.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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
        response.json().then(({ error }) => {
          setErrorMessage(error);
          setShowErrorMessage(true);
        });
        throw new Error('Error al iniciar sesión');
      } else {
        setShowErrorMessage(false);
      }

      // Almacenar la sesión en sessionStorage
      const data = await response.json();
      sessionStorage.setItem('session', JSON.stringify(data));

      window.location.href = '/';
    } catch (error) {
      //console.error(error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username or email"
        value={identifier}
        onChange={event => setIdentifier(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <div className='error-message'>
        {showErrorMessage ? errorMessage : ''}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

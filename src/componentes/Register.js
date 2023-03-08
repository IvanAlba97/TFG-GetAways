import React, { useState } from "react";
import '../estilos/Register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    fetch('http://localhost:3333/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
      .then(response => {
        if (response.ok) {
          alert('Usuario registrado correctamente');
          setUsername('');
          setEmail('');
          setPassword('');
          setShowErrorMessage(false);
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
        placeholder="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

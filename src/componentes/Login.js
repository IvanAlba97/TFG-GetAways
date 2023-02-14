import React, { useState } from "react";
import '../estilos/Login.css';

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password })
    })
      .then(response => {
        if (response.ok) {
          alert('Este usuario PERTENECE a esta comunidad.');
          window.location.href = '/';
        } else {
          alert('Este usuario NO PERTENECE a esta comunidad.');
        }
      });
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
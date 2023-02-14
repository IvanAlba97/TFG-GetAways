import React, { useState } from "react";
import '../estilos/Register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    fetch('http://localhost:3333/register', {
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
        } else {
          console.log('Registration failed');
        }
      })
      .catch(error => {
        console.error('Error registering user:', error);
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

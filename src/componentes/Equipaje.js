import React, { useState, useEffect } from 'react';
import '../estilos/Equipaje.css';
import Navbar from './Navbar.js';
import axios from 'axios';


function Equipaje() {

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleNewItemChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleNewItemSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3333/equipaje', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ elemento: newItem }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al añadir nuevo elemento');
        }
      })
      .then(() => {
        return fetch('http://localhost:3333/equipaje', { credentials: 'include' });
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener lista actualizada de elementos');
        }
      })
      .then((data) => {
        setItems(data);
        setNewItem('');
      })
      .catch((error) => console.error(error));
  };
  
  
  

  const handleItemCheck = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3333/equipaje', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener lista de elementos');
        }
      })
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error(error));

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
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="equipaje">
        <h2>Equipaje para la ruta de senderismo:</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleItemCheck(item.id)}
                />
                {item.elemento}
              </label>
            </li>
          ))}
        </ul>
        <form onSubmit={handleNewItemSubmit}>
          <label htmlFor="nuevo-item">Añadir elemento:</label>
          <input
            type="text"
            id="nuevo-item"
            name="nuevo-item"
            value={newItem}
            onChange={handleNewItemChange}
          />
          <button type="submit">Añadir</button>
        </form>
      </div>
    </div>
  );
}

export default Equipaje;

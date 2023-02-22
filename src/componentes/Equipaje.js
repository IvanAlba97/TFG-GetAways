import React, { useState, useEffect } from 'react';
import '../estilos/Equipaje.css';
import Navbar from './Navbar.js';


function Equipaje() {




	

	const [items, setItems] = useState([
		{ id: 1, text: 'Botella de agua', checked: false },
		{ id: 2, text: 'Comida para picnic', checked: false },
		{ id: 3, text: 'Mochila', checked: false },
	]);
	const [newItem, setNewItem] = useState('');

	const handleNewItemChange = (event) => {
		setNewItem(event.target.value);
	};

	const handleNewItemSubmit = (event) => {
		event.preventDefault();
		const newId = Math.max(...items.map((item) => item.id)) + 1;
		const newElement = { id: newId, text: newItem, checked: false };
		setItems([...items, newElement]);
		setNewItem('');
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
    // Realizar la solicitud para obtener información de sesión
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No se ha iniciado sesión');
        }
      })
      .then(data => {
        setUser(data.user);
      })
      .catch(error => console.error(error));
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
								{item.text}
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

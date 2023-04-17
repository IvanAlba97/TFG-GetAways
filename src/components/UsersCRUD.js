import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../styles/UsersCRUD.css';

const UsersCRUD = () => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ nombre: "", correo: "" });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
        setUser(data?.user);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3333/users");
    const data = await response.json();
    setUsers(data);
  };

  const handleNameChange = (e) => {
    setNewUser({ ...newUser, nombre: e.target.value });
  };

  const handleEmailChange = (e) => {
    setNewUser({ ...newUser, correo: e.target.value });
  };

  const handleUpdateUser = async (userId) => {
    // Verificar si los campos están vacíos
    if (!newUser.nombre.trim() || !newUser.correo.trim()) {  // trim() elimina espacios al inicio y al final
      alert("Por favor, complete todos los campos.");
      return;
    }
  
    await fetch(`http://localhost:3333/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newUser }),
    });
    fetchUsers();
  };
  

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?"); // Mostrar ventana de confirmación
    if (confirmDelete) {
      await fetch(`http://localhost:3333/users/${userId}`, {
        method: "DELETE",
      });
      fetchUsers();
    }
  };

  const handleEditUser = (userId) => {
    const selectedUser = users.find(u => u.id === userId); // Buscar el usuario seleccionado
    setNewUser({ nombre: selectedUser.nombre, correo: selectedUser.correo }); // Establecer los datos del usuario seleccionado en newUser
    setSelectedUserId(userId);
    setIsFormVisible(!isFormVisible);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="fondo">
      <Navbar user={user} />
      <div className="contenedor-crud">
        <h1>Gestión de usuarios</h1>
        <ul>
          {currentUsers.map((u) => (
            <li key={u.id} className="user-item">
              <span onClick={() => handleEditUser(u.id)} className="user-name">
                {u.nombre} ({u.correo})
              </span>
              {isFormVisible && selectedUserId === u.id && (
                <div className="user-form">
                  <input
                    type="text"
                    name="nombre"
                    placeholder={u.nombre}
                    value={newUser.nombre || ""}
                    onChange={handleNameChange}
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="correo"
                    placeholder={u.correo}
                    value={newUser.correo || ""}
                    onChange={handleEmailChange}
                    className="form-input"
                  />
                  <button
                    onClick={() => handleUpdateUser(u.id)}
                    className="button"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className='pagination'>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'currentPage' : 'no-currentPage'}
          >
            {number}
          </button>
        ))}
        </div>
      </div>
    </div>
  );

};

export default UsersCRUD;
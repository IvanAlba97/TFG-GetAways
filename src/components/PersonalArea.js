import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/PersonalArea.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalArea = () => {

  const [user, setUser] = useState([]);
  const [publications, setPublications] = useState([]);
  const [newPublication, setNewPublication] = useState({ titulo: "", descripcion: "" });


  useEffect(() => {
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No se ha iniciado sesión.');
        }
      })
      .then((data) => {
        setUser(data?.user);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  useEffect(() => {
    loadPublications();
  }, []);

  function loadPublications() {
    fetch('http://localhost:3333/my-publications', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al cargar publicaciones.');
        }
      })
      .then((data) => {
        setPublications(data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleTitleChange = (event) => {
    setNewPublication({ ...newPublication, titulo: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setNewPublication({ ...newPublication, descripcion: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3333/new-publication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPublication),
      credentials: 'include'
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(({ message }) => {
            toast.success(message);
          });
          setNewPublication({ titulo: "", descripcion: "" });
          loadPublications();
        } else {
          response.json().then(({ message }) => {
            toast.error(message);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="fondo">
      <Navbar user={user} />
      <h2>Área personal</h2>
      <div className="nueva-publicacion">
        <h3>Nueva publicación</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Título" value={newPublication.titulo} onChange={handleTitleChange} />
          <textarea placeholder="Descripción" value={newPublication.descripcion} onChange={handleDescriptionChange} />
          <button type="submit">Publicar</button>
        </form>
      </div>
      <div className="publicaciones">
        <h3>Publicaciones</h3>
        <ul>
          {publications.map((publication) => (
            <li key={publication.id}>
              <span>{publication.titulo}</span>
              <p>{publication.descripcion}</p>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PersonalArea;

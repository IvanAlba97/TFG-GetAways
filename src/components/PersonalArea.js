import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/PersonalArea.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalArea = () => {

  const [user, setUser] = useState([]);
  const [publications, setPublications] = useState([]);
  const [newPublication, setNewPublication] = useState({ titulo: "", descripcion: "" });
  const [editedPublication, setEditedPublication] = useState({ titulo: "", descripcion: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [publicationsPerPage, setPublicationsPerPage] = useState('');
  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = publications.slice(indexOfFirstPublication, indexOfLastPublication);

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
        setPublicationsPerPage(5);
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

  const handleEdit = (publication) => {
    setEditedPublication(publication);
    setSelectedPublication(publication.id);
    setIsEditing(true);
  };

  const handleEditConfirm = (editedPublication) => {
    // Verificar si los campos están vacíos
    if (!editedPublication.titulo.trim() || !editedPublication.descripcion.trim()) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }
    fetch(`http://localhost:3333/edit-publication/${editedPublication.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editedPublication })
    })
      .then(res => {
        if (res.ok) {
          res.json().then(({ message }) => {
            toast.success(message);
            setIsEditing(false);
            loadPublications();
          });
        } else {
          res.json().then(({ message }) => {
            toast.error(message);
          });
        }
      })
  };

  const handleDelete = (publication) => {
    const toastId = toast.warn(
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p>¿Estás seguro de que quieres eliminar esta publicación?</p>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <button style={{ margin: "10px" }} onClick={() => {
            handleDeleteConfirm(publication);
            toast.dismiss();
          }}>Sí</button>
          <button style={{ margin: "10px" }} onClick={() => toast.dismiss()}>No</button>
        </div>
      </div>, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "deleteRoute"
    });
  };

  const handleDeleteConfirm = async (publication) => {
    fetch(`http://localhost:3333/delete-publication/${publication.id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(({ message }) => {
            toast.success(message);
          });
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

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(publications.length / publicationsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    setCurrentPage(pageNumber);
  }

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
          {currentPublications.map((publication) => (
            isEditing && selectedPublication === publication.id ? (
              <div className="edit-publication" key={publication.id}>
                <h4>Título</h4>
                <input type="text" placeholder="Título" value={editedPublication.titulo} onChange={(event) => setEditedPublication({ ...editedPublication, titulo: event.target.value })} />
                <h4>Descripción</h4>
                <textarea placeholder="Descripción" value={editedPublication.descripcion} onChange={(event) => setEditedPublication({ ...editedPublication, descripcion: event.target.value })} />
                <div className="buttons">
                  <button onClick={() => setIsEditing(false)}>Cancelar</button>
                  <button onClick={() => handleEditConfirm(editedPublication)}>Confirmar</button>
                </div>
              </div>
            ) : (
              <li key={publication.id}>
                <span>{publication.titulo}</span>
                <div>
                  {publication.descripcion.split("\n").map((line, index) => (
                    <div key={index}>
                      {line}
                      <br />
                    </div>
                  ))}
                  <div className="buttons">
                    <button onClick={() => handleEdit(publication)}>Editar</button>
                    <button onClick={() => handleDelete(publication)}>Eliminar</button>
                  </div>
                </div>
              </li>
            )
          ))}
        </ul>
        <div className='pagination'>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={currentPage == number ? 'currentPage' : 'no-currentPage'}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );

};

export default PersonalArea;

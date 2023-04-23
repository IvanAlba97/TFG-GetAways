import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Profile from '../img/profile-icon.ico';
import TextTruncator from "./TextTruncator.js";
import "../styles/Community.css";

const Community = () => {

  const [user, setUser] = useState([]);
  const [publications, setPublications] = useState([]);
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
    fetch('http://localhost:3333/publications', { credentials: 'include' })
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
      <div className="publicaciones">
        <h1>Comunidad</h1>
        <ul>
          {currentPublications.map((publication) => (
            <li key={publication.id}>
              <p className="contenedor-autor"><img className="contenedor-icono" src={Profile} alt="Icono-Perfil" />{publication.nombre_usuario}</p>
              <h3>{publication.titulo}</h3>
              <p>
                <TextTruncator text={publication.descripcion} maxLength={400} />
              </p>
            </li>
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
    </div>
  );

};

export default Community;
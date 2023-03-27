import React, { useState, useEffect } from 'react';
import '../estilos/CommentBox.css';
import Profile from '../img/profile-icon.ico';
import { Link } from 'react-router-dom';

function CommentBox(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3333/comments/${props.routeId}`, {
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        data.sort((a, b) => {
          return new Date(b.fecha) - new Date(a.fecha);
        });
        setComments(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [props.routeId]);

  return (
    <div style={{ width: '100%' }}>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div className="comment" key={comment.id}>
            <h3 className="comment-title">{comment.comentario}</h3>
            <p className="comment-author"><img className="contenedor-icono" src={Profile} alt="Icono-Perfil" />{comment.nombre}</p>
            <p className="comment-rating-container">
              {[...Array(comment.valoracion)].map((e, i) => (
                <span key={i}>★</span>
              ))}
            </p>
            <p className="comment-date">Fecha: {comment.fecha}</p>
          </div>
        ))
      ) : (
        <div className='no-comments'>
          <p>Nadie ha comentado aún en esta ruta.</p>
          <Link to="/access" className="comment-button">
            <button>Inicia sesión para añadir tu comentario.</button>
          </Link>
        </div>
      )}
    </div>

  );
}

export default CommentBox;

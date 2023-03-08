import React, { useState, useEffect } from 'react';
import '../estilos/CommentBox.css';
import Profile from '../img/profile-icon.ico';

function CommentBox(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3333/comments/${props.id_ruta}`, {
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
  }, [props.id_ruta]);

  return (
    <div style={{width: '100%'}}>
      {comments.map(comment => (
        <div className="comment" key={comment.id}>
          <h3 className="comment-title">{comment.comentario}</h3>
          <p className="comment-author"><img className="contenedor-icono" src={Profile} alt="Icono-Perfil" />{comment.nombre}</p>
          <p className="comment-rating-container">
            {[...Array(comment.valoracion)].map((e, i) => (
              <span key={i}>★</span>
            ))}
          </p>
          {/* <p className='comment-public'>Pública: {comment.publica === 1 ? 'Sí' : 'No'}</p> */}
          <p className="comment-date">Fecha: {comment.fecha}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentBox;

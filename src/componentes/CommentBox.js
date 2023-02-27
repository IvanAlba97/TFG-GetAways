import React, { useState, useEffect } from 'react';
import '../estilos/CommentBox.css';

function CommentBox() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/comments', {
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
          return new Date(a.fecha) - new Date(b.fecha);
        });
        setComments(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {comments.map(comment => (
        <div className="comment" key={comment.id}>
          <h3 className="comment-title">{comment.comentario}</h3>
          <p className="comment-author">{comment.usuario && comment.usuario.nombre}</p>
          <p className="comment-rating">Valoracion: {comment.valoracion}/5</p>
          <p className='comment-public'>Pública: {comment.publica === 1 ? 'Sí' : 'No'}</p>
          <p className="comment-date">Fecha: {comment.fecha}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentBox;

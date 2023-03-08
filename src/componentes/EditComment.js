import React, { useState, useEffect } from 'react';
import '../estilos/CommentBox.css';
import Profile from '../img/profile-icon.ico';

function EditComment(props) {
  const [comment, setComment] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(undefined);

  useEffect(() => {
    fetch(`http://localhost:3333/my-comment/${props.id_ruta}`, {
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setComment(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [props.id_ruta]);

  const handleEdit = (comment) => {
    setIsEditing(true);
    setNewComment(comment.comentario);
    setNewRating(comment.valoracion);
  };

  const handleSave = (commentId) => {
    fetch('http://localhost:3333/edit-my-comment', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ commentId, newComment, newRating })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(() => {
        return fetch(`http://localhost:3333/my-comment/${props.id_ruta}`, {
          credentials: 'include'
        });
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        setComment(data);
        setNewComment('');
        setNewRating(undefined);
        setIsEditing(false);
        return fetch('http://localhost:3333/actualizar-media-valoraciones', {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_ruta: props.id_ruta })
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div style={{ width: '100%' }}>
      {comment.map(comment => (
        <div className="comment" key={comment.id}>
          {isEditing ? (
            <div className='new-comment'>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <select id="valoracion" value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))}>
                {/* <option value="">Seleccionar valoración</option> */}
                <option value="1">1 estrella</option>
                <option value="2">2 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="5">5 estrellas</option>
              </select>
              <button className='buttom' onClick={() => handleSave(comment.id)}>Publicar</button>
            </div>
          ) : (
            <>
              <h3 className="comment-title">{comment.comentario}</h3>
              <p className="comment-author"><img className="contenedor-icono" src={Profile} alt="Icono-Perfil" />{comment.nombre}</p>
              <p className="comment-rating-container">
                {[...Array(comment.valoracion)].map((e, i) => (
                  <span key={i}>★</span>
                ))}
              </p>
              {/* <p className='comment-public'>Pública: {comment.publica === 1 ? 'Sí' : 'No'}</p> */}
              <button onClick={() => handleEdit(comment)}>Editar</button>
              <p className="comment-date">Fecha: {comment.fecha}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default EditComment;

import React, { useState, useEffect } from 'react';
import '../estilos/CommentBox.css';
import Profile from '../img/profile-icon.ico';

function CommentBox(props) {
  const [comments, setComments] = useState([]);

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
        data.sort((a, b) => {
          return new Date(b.fecha) - new Date(a.fecha);
        });
        setComments(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleEdit = () => {
    // Creamos una copia del array de comentarios para poder modificarlo
    const updatedComments = [...comments];
  
    // Modificamos los valores de comentario y valoracion del primer comentario
    updatedComments[0].comentario = prompt("Introduce el nuevo comentario", updatedComments[0].comentario);
    updatedComments[0].valoracion = parseInt(prompt("Introduce la nueva valoración (de 1 a 5)", updatedComments[0].valoracion));
  
    // Actualizamos el estado de los comentarios
    setComments(updatedComments);
  };
  

  return (
    <div style={{width: '100%'}}>
      {comments.map(comment => (
        <div className="comment" key={comment.id}>
          <h3 className="comment-title">{comment.comentario}</h3>
          <p className="comment-author"><img className="contenedor-icono" src={Profile} />{comment.nombre}</p>
          <p className="comment-rating-container">
            {[...Array(comment.valoracion)].map((e, i) => (
              <span key={i}>★</span>
            ))}
          </p>
          {/* <p className='comment-public'>Pública: {comment.publica === 1 ? 'Sí' : 'No'}</p> */}
          <button onClick={handleEdit}>Editar</button>
          <p className="comment-date">Fecha: {comment.fecha}</p>
          
        </div>
      ))}
    </div>
  );
}

export default CommentBox;

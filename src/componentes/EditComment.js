import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import '../estilos/EditComment.css';
import StarRatings from 'react-star-ratings';
import Profile from '../img/profile-icon.ico';

function EditComment(props) {
  const [comment, setComment] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(undefined);
  const [public_, setpublic_] = useState(true);  // No puedo usar simplemente 'public' porque es una palabra reservada.

  useEffect(() => {
    fetch(`http://localhost:3333/my-comment/${props.routeId}`, {
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
  }, [props.routeId]);

  const handleEdit = (comment) => {
    setIsEditing(true);
    setNewComment(comment.comentario);
    setNewRating(comment.valoracion);
    setpublic_(comment.publica);
  };

  const handleSave = async (commentId) => {
    try {
      const response = await fetch('http://localhost:3333/edit-my-comment', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ commentId, newComment, newRating, public_ })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setComment(data);
      setNewComment('');
      setNewRating(undefined);
      setIsEditing(false);
      const ratingResponse = await fetch('http://localhost:3333/update-average-rating', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ routeId: props.routeId })
      });
      if (!ratingResponse.ok) {
        throw new Error('Network response was not ok.');
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };  

  const handleDelete = (comment) => {
    fetch(`http://localhost:3333/delete-my-comment/${comment.id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(async () => {
        try {
          const response = await fetch('http://localhost:3333/update-average-rating', {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ routeId: props.routeId })
          });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
        window.location.reload();
      })
  };

  const handleSwitchChange = (checked) => {
    setpublic_(checked);
  };

  const handleRatingChange = (newRating) => {
    setNewRating(newRating);
  }

  return (
    <div style={{ width: '100%' }}>
      {comment.map(comment => (
        <div className="comment" key={comment.id}>
          {isEditing ? (
            <form>
              <div>
                <label htmlFor="rating">Valoración:</label>
                <StarRatings
                  rating={newRating}
                  starRatedColor="orange"
                  changeRating={handleRatingChange}
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px"
                />
              </div>
              <div style={{ width: '100%', height: '200px' }}>
                <label htmlFor="comment">Comentario:</label>
                <textarea id="comment" value={newComment} onChange={(event) => setNewComment(event.target.value)} />
              </div>
              <div>
                <label htmlFor="public">Público:</label>
                <Switch id="public" checked={public_ ? true : false} onChange={handleSwitchChange} />
              </div>
              <button type='submit' onClick={() => handleSave(comment.id)}>Publicar</button>
            </form>
          ) : (
            <>
              <h3 className="comment-title">{comment.comentario}</h3>
              <p className="comment-author"><img className="contenedor-icono" src={Profile} alt="Icono-Perfil" />{comment.nombre}</p>
              <p className="comment-rating-container">
                {[...Array(comment.valoracion)].map((e, i) => (
                  <span key={i}>★</span>
                ))}
              </p>
              {/* <p className='comment-public_'>Pública: {comment.publica === 1 ? 'Sí' : 'No'}</p> */}
              <button onClick={() => handleEdit(comment)}>Editar</button>
              <button className='btn-delete' onClick={() => handleDelete(comment)}>Eliminar</button>
              <p className="comment-date">Fecha: {comment.fecha}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default EditComment;

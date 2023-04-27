import React, { useState } from 'react';
import Switch from 'react-switch';
import StarRatings from 'react-star-ratings';
import '../styles/NewComment.css'

function NewComment(props) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [public_, setPublic_] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica que se haya ingresado un comment y una valoración antes de enviar el formulario
    if (!comment.trim() || !rating) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Obtiene el ID de ruta desde las propiedades de los componentes
    const routeId = props.routeId;

    // Crea un objeto con los datos del comment
    const newComment = {
      routeId: routeId,
      rating: rating,
      comment: comment,
      public_: public_
    };

    // Envía los datos del comment al servidor Node.js
    fetch('http://localhost:3333/new-comment', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })
      .then((response) => {
        console.log(response.data);
        setComment('');
        setRating(0);
        setPublic_(false);
        setError('');
      })
      .then(async () => {
        try {
          const response = await fetch('http://localhost:3333/update-average-rating', {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ routeId: routeId })
          });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleSwitchChange = (checked) => {
    setPublic_(checked);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  }

  return (
    <div className='container-new-comment'>
      <h2>Agregar comentario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='rating'>Valoración:</label>
          <StarRatings
            rating={rating}
            starRatedColor='orange'
            changeRating={handleRatingChange}
            numberOfStars={5}
            name='rating'
            starDimension='20px'
          />
        </div>
        <div style={{ width: '100%', height: '200px'}}>
          <label htmlFor='comment'>Comentario:</label>
          <textarea id='comment' value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <div>
          <label htmlFor='public'>Público:</label>
          <Switch id='public' checked={public_} onChange={handleSwitchChange} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default NewComment;

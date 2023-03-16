import React, { useState } from 'react';
import Switch from 'react-switch';
import '../estilos/NewComment.css'

function NewComment(props) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
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
        setRating('');
        setPublic_(false);
        setError('');

        // Llama a la ruta /actualizar-media-ratinges después de realizar correctamente un nuevo comment
        fetch(`http://localhost:3333/update-average-rating`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ routeId: routeId })
        })
          .then((response) => {
            console.log(response);
          })

          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
      window.location.reload();
  };


  const handleSwitchChange = (checked) => {
    setPublic_(checked);
  };

  return (
    <div className='container-new-comment'>
      <h2>Agregar comentario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comentario:</label>
          <textarea id="comment" value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <div>
          <label htmlFor="rating">Valoración:</label>
          <select id="rating" onChange={(event) => setRating(event.target.value)}>
            {<option value="">Seleccionar valoración</option>}
            <option value="1">1 estrella</option>
            <option value="2">2 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="5">5 estrellas</option>
          </select>
        </div>
        <div>
          <label htmlFor="public">Público:</label>
          <Switch id="public" checked={public_} onChange={handleSwitchChange} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default NewComment;

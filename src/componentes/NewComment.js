import React, { useState } from 'react';

function NewComment(props) {
  const [comentario, setComentario] = useState('');
  const [valoracion, setValoracion] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Obtiene el ID de ruta desde las propiedades de los componentes
    const id_ruta = props.id_ruta;

    // Crea un objeto con los datos del comentario
    const nuevoComentario = {
      id_ruta: id_ruta,
      valoracion: valoracion,
      comentario: comentario,
      publica: true
    };

    // Envía los datos del comentario al servidor Node.js
    fetch('http://localhost:3333/nuevo-comentario', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoComentario)
    })

      .then((response) => {
        console.log(response.data);
        setComentario('');
        setValoracion(0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Agregar comentario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="valoracion">Valoración:</label>
          <select id="valoracion" value={valoracion} onChange={(event) => setValoracion(event.target.value)}>
            <option value="0">Seleccionar valoración</option>
            <option value="1">1 estrella</option>
            <option value="2">2 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="5">5 estrellas</option>
          </select>
        </div>
        <div>
          <label htmlFor="comentario">Comentario:</label>
          <textarea id="comentario" value={comentario} onChange={(event) => setComentario(event.target.value)} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default NewComment;

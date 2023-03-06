import React, { useState } from 'react';
import Switch from 'react-switch';
import '../estilos/NewComment.css'

function NewComment(props) {
  const [comentario, setComentario] = useState('');
  const [valoracion, setValoracion] = useState('');
  const [publico, setPublico] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica que se haya ingresado un comentario y una valoración antes de enviar el formulario
    if (!comentario.trim() || !valoracion) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Obtiene el ID de ruta desde las propiedades de los componentes
    const id_ruta = props.id_ruta;

    // Crea un objeto con los datos del comentario
    const nuevoComentario = {
      id_ruta: id_ruta,
      valoracion: valoracion,
      comentario: comentario,
      publica: publico
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
        setValoracion('');
        setPublico(false);
        setError('');

        // Llama a la ruta /actualizar-media-valoraciones después de realizar correctamente un nuevo comentario
        fetch(`http://localhost:3333/actualizar-media-valoraciones`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_ruta: id_ruta })
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
  };


  const handleSwitchChange = (checked) => {
    setPublico(checked);
  };

  return (
    <div className='container-new-comment'>
      <h2>Agregar comentario</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comentario">Comentario:</label>
          <textarea id="comentario" value={comentario} onChange={(event) => setComentario(event.target.value)} />
        </div>
        <div>
          <label htmlFor="valoracion">Valoración:</label>
          <select id="valoracion" value={valoracion} onChange={(event) => setValoracion(event.target.value)}>
            <option value="">Seleccionar valoración</option>
            <option value="1">1 estrella</option>
            <option value="2">2 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="5">5 estrellas</option>
          </select>
        </div>
        <div>
          <label htmlFor="publico">Público:</label>
          <Switch id="publico" checked={publico} onChange={handleSwitchChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default NewComment;

import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import '../estilos/Tarjeta.css';
import TextTruncator from "./TextTruncator.js";

function Tarjeta(props) {
  const [pendientes, setPendientes] = useState(false);
  const [completada, setCompletada] = useState(false);

  useEffect(() => {
    async function obtenerDatos() {
      try {
        const resPendientes = await fetch(`http://localhost:3333/ruta-pendiente/${props.id}`, {
          credentials: 'include'
        });
        const { existe: pendientesExiste } = await resPendientes.json();
        setPendientes(Boolean(pendientesExiste));

        const resCompletada = await fetch(`http://localhost:3333/ruta-completada/${props.id}`, {
          credentials: 'include'
        });
        const { existe: completadaExiste } = await resCompletada.json();
        setCompletada(Boolean(completadaExiste));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    obtenerDatos();
  }, [props.id]);

  async function manejarCambio(checked, tipo) {
    const endpoint = tipo === 'pendientes' ? 'actualizar-pendientes' : 'actualizar-completadas';
    try {
      const res = await fetch(`http://localhost:3333/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: props.id,
          checked: checked
        }),
        credentials: 'include'
      });
      if (res.ok) {
        if (tipo === 'pendientes') {
          setPendientes(checked);
        } else {
          setCompletada(checked);
        }
      } else {
        console.error('Error updating data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  return (
    <div className='contenedor-tarjeta'>
      <a href={`http://localhost:3000/ruta/${props.id}`}>
        <img className='imagen-tarjeta'
          src={props.imagen}
          alt='Foto de ruta' />
      </a>
      <div className='contenedor-informacion-general'>
        <a href={`http://localhost:3000/ruta/${props.id}`}>
          <h2>{props.nombre}</h2>
        </a>
        <div>
          <TextTruncator text={props.descripcion} maxLength={300} />
        </div>
      </div>
      <div className='contenedor-interaccion'>
        <div>
          <p>Media de valoraciones</p>
          {props.media_valoraciones}
        </div>
        <div>
          <p>Pendiente</p>
          <Switch checked={pendientes} onChange={(checked) => manejarCambio(checked, 'pendientes')} />
        </div>
        <div>
          <p>Completada</p>
          <Switch checked={completada} onChange={(checked) => manejarCambio(checked, 'completadas')} />
        </div>
      </div>
    </div>
  );
}

export default Tarjeta;

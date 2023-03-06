import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import '../estilos/Tarjeta.css';
import TextTruncator from "./TextTruncator.js";

function Tarjeta(props) {
  const [pendientes, setPendientes] = useState(false);
  const [completadas, setCompletadas] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        setCompletadas(Boolean(completadaExiste));

        const resUser = await fetch(`http://localhost:3333/user`, {
          credentials: 'include'
        });
        if (resUser.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        // Si se produce un error al obtener la información del usuario,
        // es posible que el usuario no esté autenticado
        setIsAuthenticated(false);
      }
    }

    obtenerDatos();
  }, [props.id]);

  async function manejarCambio(checked, tipo) {
    if (isAuthenticated) {
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
            setCompletadas(checked);
          }
        } else {
          console.error('Error updating data');
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
    } else {
      window.location.href = '/access';
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
        <dl>
            <dt>Media de valoraciones</dt>
            <dd>{props.media_valoraciones == null ? 'Sin valoraciones' : props.media_valoraciones + '/5'}</dd>
            <dt>Pendiente</dt>
            <dd>{isAuthenticated ?
              <Switch checked={pendientes} onChange={(checked) => manejarCambio(checked, 'pendientes')} />
              : <Switch checked={pendientes} onClick={() => window.location.href = '/access'} onChange={(checked) => manejarCambio(checked, 'pendientes')} />}</dd>
            <dt>Completada</dt>
            <dd><Switch checked={completadas} onChange={(checked) => manejarCambio(checked, 'completadas')} /></dd>

        </dl>
      </div>
    </div>
  );
}

export default Tarjeta;
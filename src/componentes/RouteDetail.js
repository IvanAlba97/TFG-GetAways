import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Switch from 'react-switch';
import '../estilos/RouteDetail.css';
import CommentBox from './CommentBox.js';
import NewComment from './NewComment.js';
import EditComment from './EditComment';

function RouteDetail() {

  const { id } = useParams();
  const [routeDetails, setRouteDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3333/ruta_senderismo/${id}`)
      .then(response => response.json())
      .then(data => setRouteDetails(data))
      .catch(error => console.error(error));
  }, [id]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No se ha iniciado sesión');
        }
      })
      .then((data) => {
        setUser(data?.user);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error(error);
        setIsAuthenticated(false);
      })
  }, []);

  const [pendientes, setPendientes] = useState(false);
  const [completadas, setCompletadas] = useState(false);
  const [commentExists, setCommentExists] = useState(false);

  useEffect(() => {
    async function obtenerDatos() {
      try {
        const resPendientes = await fetch(`http://localhost:3333/ruta-pendiente/${id}`, {
          credentials: 'include'
        });
        const { existe: pendientesExiste } = await resPendientes.json();
        setPendientes(Boolean(pendientesExiste));

        const resCompletada = await fetch(`http://localhost:3333/ruta-completada/${id}`, {
          credentials: 'include'
        });
        const { existe: completadaExiste } = await resCompletada.json();
        setCompletadas(Boolean(completadaExiste));

        const resMyComment = await fetch(`http://localhost:3333/my-comment/${routeDetails.id}`, {
          credentials: 'include'
        });
        const comentarios = await resMyComment.json();
        setCommentExists(comentarios.length > 0);
      } catch (error) {
        setCommentExists(false);
      }
    }
    obtenerDatos();
  }, [id, routeDetails]);



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
            id: routeDetails.id,
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
    <div className='fondo'>
      <Navbar user={user} />
      <div className='container'>
        {routeDetails && (
          <div className="route-details">
            <h3>{routeDetails.nombre}</h3>
            <div>
            {Array.from({ length: Math.round(routeDetails.media_valoraciones) }, (_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p>{routeDetails.descripcion}</p>
            <img className='imagen' src={routeDetails.imagen} alt={routeDetails.nombre} />
            <dl>
              <dt>Provincia:</dt>
              <dd>{routeDetails.provincia}</dd>
              <dt>Longitud:</dt>
              <dd>{routeDetails.longitud} km</dd>
              <dt>Tipo:</dt>
              <dd>{routeDetails.tipo}</dd>
              <dt>Permiso necesario:</dt>
              <dd>{routeDetails.permiso_necesario === 1 ? 'Sí' : 'No'}</dd>
              <dt>Cómo llegar:</dt>
              <dd>{routeDetails.como_llegar}</dd>
              <dt>Enlace a Google Maps:</dt>
              <dd>{<a href={routeDetails.enlace_maps} target="_blank" rel="noopener noreferrer">{routeDetails.enlace_maps}</a>}</dd>
              <dt>Media de valoraciones:</dt>
              <dd>{routeDetails.media_valoraciones == null ? 'Sin valoraciones' : routeDetails.media_valoraciones + '/5'}</dd>
              <dt>Pendiente:</dt>
              <dd><Switch checked={pendientes} onChange={(checked) => manejarCambio(checked, 'pendientes')} /></dd>
              <dt>Completada:</dt>
              <dd><Switch checked={completadas} onChange={(checked) => manejarCambio(checked, 'completadas')} /></dd>
            </dl>
          </div>
        )}
      </div>
      <div className='comments'>
        <h3>Comentarios</h3>
        {isAuthenticated ?
          (commentExists ? <EditComment id_ruta={id} /> : <NewComment id_ruta={id} />)
          : null
        }
        <CommentBox id_ruta={id} />
      </div>
      <Footer />
    </div>
  );
}

export default RouteDetail;

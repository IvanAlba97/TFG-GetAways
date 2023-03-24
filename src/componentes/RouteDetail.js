import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Switch from 'react-switch';
import CommentBox from './CommentBox.js';
import NewComment from './NewComment.js';
import EditComment from './EditComment';
import Share from './Share';
import '../estilos/RouteDetail.css';

function RouteDetail() {

  const { id } = useParams();
  const [routeDetails, setRouteDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendings, setPendings] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [commentExists, setCommentExists] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3333/hiking-route/${id}`)
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

  useEffect(() => {
    async function getData() {
      try {
        const resPendings = await fetch(`http://localhost:3333/pending-route/${id}`, {
          credentials: 'include'
        });
        const { exists: pendingsExists } = await resPendings.json();
        setPendings(Boolean(pendingsExists));

        const resCompleted = await fetch(`http://localhost:3333/completed-route/${id}`, {
          credentials: 'include'
        });
        const { exists: completadaExists } = await resCompleted.json();
        setCompleted(Boolean(completadaExists));

        const resMyComment = await fetch(`http://localhost:3333/my-comment/${routeDetails.id}`, {
          credentials: 'include'
        });
        const comments = await resMyComment.json();
        setCommentExists(comments.length > 0);
      } catch (error) {
        setCommentExists(false);
      }
    }
    getData();
  }, [id, routeDetails]);



  async function handleChange(checked, type) {
    if (isAuthenticated) {
      const endpoint = type === 'pendings' ? 'update-pendings' : 'update-completed';
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
          if (type === 'pendings') {
            setPendings(checked);
          } else {
            setCompleted(checked);
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
              <dt>Tipo:</dt>
              <dd>{routeDetails.tipo}</dd>
              <dt>Longitud:</dt>
              <dd>{routeDetails.longitud} km</dd>
              <dt>Permiso necesario:</dt>
              <dd>{routeDetails.permiso_necesario === 1 ? 'Sí' : 'No'}</dd>
              <dt>Media de valoraciones:</dt>
              <dd>{routeDetails.media_valoraciones == null ? 'Sin valoraciones' : routeDetails.media_valoraciones + '/5'}</dd>
              <dt>Provincia:</dt>
              <dd>{routeDetails.provincia}</dd>
              <dt>Cómo llegar:</dt>
              <dd>{routeDetails.como_llegar}</dd>
              <dt>Enlace a Google Maps:</dt>
              <dd className="google-maps-link">{<a href={routeDetails.enlace_maps} target="_blank" rel="noopener noreferrer">{routeDetails.enlace_maps}</a>}</dd>
              <dt>Pendiente:</dt>
              <dd><Switch checked={pendings} onChange={(checked) => handleChange(checked, 'pendings')} /></dd>
              <dt>Completada:</dt>
              <dd><Switch checked={completed} onChange={(checked) => handleChange(checked, 'completed')} /></dd>
            </dl>
            <Share />
          </div>
        )}
      </div>
      <div className='comments'>
        <h3>Comentarios</h3>
        {isAuthenticated ?
          (commentExists ? <EditComment routeId={id} /> : <NewComment routeId={id} />)
          : null
        }
        <CommentBox routeId={id} />
      </div>
      <Footer />
    </div>
  );
}

export default RouteDetail;

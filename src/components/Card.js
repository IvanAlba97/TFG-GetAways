import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import '../styles/Card.css';
import TextTruncator from './TextTruncator.js';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card(props) {
  const [pendings, setPendings] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const resPendings = await fetch(`http://localhost:3333/pending-route/${props.id}`, {
          credentials: 'include'
        });
        const { exists_: pendingsExists } = await resPendings.json();
        setPendings(Boolean(pendingsExists));

        const resCompleted = await fetch(`http://localhost:3333/completed-route/${props.id}`, {
          credentials: 'include'
        });
        const { exists_: completedExists } = await resCompleted.json();
        setCompleted(Boolean(completedExists));

        const resUser = await fetch(`http://localhost:3333/user`, {
          credentials: 'include'
        });
        if (resUser.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    }

    getData();
  }, [props.id]);

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
            id: props.id,
            /* checked: checked */
          }),
          credentials: 'include'
        });
        if (res.ok) {
          if (type === 'pendings') {
            setPendings(checked);
            if(checked) {
              toast.success('Ruta añadida a Pendientes.');
            } else {
              toast.success('Ruta eliminada de Pendientes.');
            }
          } else {
            setCompleted(checked);
            if(checked) {
              toast.success('Ruta añadida a Completadas.');
            } else {
              toast.success('Ruta eliminada de Completadas.');
            }
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
      <div className='contenedor-imagen'>
        <Link to={`http://localhost:3000/ruta/${props.id}`}>
          <img className='imagen-tarjeta'
            src={props.image}
            alt='Foto de ruta' />
        </Link>
      </div>
      <div className='contenedor-informacion-general'>
        <Link to={`http://localhost:3000/ruta/${props.id}`}>
          <h2>{props.name}</h2>
        </Link>
        <div>
          <TextTruncator text={props.description} maxLength={300} />
        </div>
      </div>
      <div className='contenedor-interaccion'>
        <dl>
          <dt>Media de valoraciones</dt>
          <dd>{props.averageRating == null ? 'Sin valoraciones' :
            <>
              {Array.from({ length: Math.round(props.averageRating) }, (_, i) => (
                <span key={i}>★</span>
              ))}
            </>
          }
          </dd>
          <dt>Pendiente</dt>
          <dd>{isAuthenticated ?
            <Switch checked={pendings} onChange={(checked) => handleChange(checked, 'pendings')} />
            : <Switch checked={pendings} onClick={() => window.location.href = '/access'} onChange={(checked) => handleChange(checked, 'pendings')} />}</dd>
          <dt>Completada</dt>
          <dd><Switch checked={completed} onChange={(checked) => handleChange(checked, 'completed')} /></dd>

        </dl>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Card;
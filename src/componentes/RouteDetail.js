import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../estilos/RouteDetail.css';

function RouteDetail() {
  const { id } = useParams();
  const [routeDetails, setRouteDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3333/ruta_senderismo/${id}`)
      .then(response => response.json())
      .then(data => setRouteDetails(data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div style={routeDetails ? { 
      backgroundImage: `url(${routeDetails.imagen})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    } : {}}>
      <Navbar />
      <div className="container">
        {routeDetails && (
          <div className="route-details">
            <h3>{routeDetails.nombre}</h3>
            <p>{routeDetails.descripcion}</p>
            <img src={routeDetails.imagen} alt={routeDetails.nombre} />
            <dl>
              <dt>Longitud:</dt>
              <dd>{routeDetails.longitud} km</dd>
              <dt>Tipo:</dt>
              <dd>{routeDetails.tipo}</dd>
              <dt>Permiso necesario:</dt>
              <dd>{routeDetails.permiso_necesario}</dd>
              <dt>Cómo llegar:</dt>
              <dd>{routeDetails.como_llegar}</dd>
              <dt>Enlace a Google Maps:</dt>
              <dd><a href={routeDetails.enlace_maps} target="_blank" rel="noopener noreferrer">{routeDetails.enlace_maps}</a></dd>
              <dt>Media de valoraciones:</dt>
              <dd>{routeDetails.media_valoraciones}</dd>
            </dl>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default RouteDetail;

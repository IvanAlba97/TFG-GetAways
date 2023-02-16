import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";

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
    <div>
      <Navbar />
      {routeDetails && (
        <div>
          <h3>{routeDetails.nombre}</h3>
          <p>{routeDetails.descripcion}</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default RouteDetail;
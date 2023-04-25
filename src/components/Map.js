import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ routeDetails }) {
  
  return (
    <MapContainer className='contenedor-map' center={[routeDetails.latitud, routeDetails.longitud]} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://stamen.com/">Stamen</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[routeDetails.latitud, routeDetails.longitud]}>
        <Popup>
          {routeDetails.nombre}
        </Popup>
      </Marker>
    </MapContainer>
  );
}


export default Map;
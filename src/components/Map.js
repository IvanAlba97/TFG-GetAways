import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ routeDetails }) {
  
  return (
    <MapContainer className='contenedor-map' center={[routeDetails.lat, routeDetails.long]} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://stamen.com/">Stamen</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[routeDetails.lat, routeDetails.long]}>
        <Popup>
        <a href={routeDetails.enlace_maps} target="_blank" rel="noopener noreferrer">{routeDetails.nombre}</a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}


export default Map;
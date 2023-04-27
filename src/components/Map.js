import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import marcadorImg from '../img/marcador.png'; // Importa la imagen del marcador

function Map({ routeDetails }) {
  
  const marcadorIcon = L.icon({ // Crea el icono del marcador usando L.icon
    iconUrl: marcadorImg, // Ruta de la imagen del marcador
    iconSize: [35, 38], // Tamaño de la imagen del marcador
    iconAnchor: [12, 41], // Punto de anclaje del marcador
    popupAnchor: [1, -34] // Punto de anclaje del popup del marcador
  });

  return (
    <MapContainer className='contenedor-map' center={[routeDetails.lat, routeDetails.lon]} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://stamen.com/">Stamen</a> contributors'
        url='https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png'
      />
      <Marker position={[routeDetails.lat, routeDetails.lon]} icon={marcadorIcon}>
        <Popup>
        <a href={routeDetails.enlace_maps} target='_blank' rel='noopener noreferrer'>{routeDetails.nombre}</a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;

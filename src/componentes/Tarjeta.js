import '../estilos/Tarjeta.css';
import TextTruncator from "./TextTruncator.js";

function Tarjeta(props) {
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
          <p>Añadir a pendientes</p>
        </div>
        <div>
          <p>Añadir a completadas</p>
        </div>
      </div>
    </div>
  );
}

export default Tarjeta;

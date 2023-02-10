import React from "react";
import '../estilos/Tarjeta.css';
import TextTruncator from "./TextTruncator.js";

function Tarjeta (props) {
  return (
    <div className = 'contenedor-tarjeta'>
      <a href={props.id}>
        <img className = 'imagen-tarjeta'
          src = {props.imagen}
          alt = 'Foto de ruta' />
      </a>
      <div className = 'contenedor-informacion-General'>
        <a href={props.id}>
          <h2>{props.nombre}</h2>
        </a>
        <p>
          <TextTruncator text={props.descripcion} maxLength={300} />
        </p>
      </div>
      <div className = 'contenedor-interaccion'>
        
      </div>
    </div>
  );
}

export default Tarjeta;

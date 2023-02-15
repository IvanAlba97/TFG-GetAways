import React from 'react';
import '../estilos/Content.css';
/* import ItemList from './ItemList'; */
import Carrusel from './Carrusel';
/* import Map from './Map'; */
import Intro from './Intro.js';

const Content = () => {
  return (
    <div className="content">
      <div className="column-1">
        {/* <p>Contenido de la columna 1</p> */}
        {/* <ItemList /> */}
        <Carrusel />
        {/* <Map /> */}
      </div>
      <div className="column-2">
        {/* <p>Contenido de la columna 2</p> */}
        <Intro />
      </div>
    </div>
  );
};

export default Content;

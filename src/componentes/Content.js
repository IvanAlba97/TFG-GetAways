import React from 'react';
import '../estilos/Content.css';
import Carrusel from './Carrusel';
/* import Map from './Map'; */
import Intro from './Intro.js';

const Content = () => {
  return (
    <div className="content">
      <div className="column-1">
        <Carrusel />
        {/* <Map /> */}
        <div className='todas-las-rutas'>
          <a href='/rutas'>Todas las rutas</a>
        </div>
      </div>
      <div className="column-2">
        <Intro />
      </div>
    </div>
  );
};

export default Content;

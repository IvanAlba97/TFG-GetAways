import React from 'react';
import '../estilos/Content.css';
import ItemList from './ItemList';

const Content = () => {
  return (
    <div className="content">
      <div className="column-1">
        {/* <p>Contenido de la columna 1</p> */}
        <ItemList />
      </div>
      <div className="column-2">
        {/* <p>Contenido de la columna 2</p> */}
      </div>
    </div>
  );
};

export default Content;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../estilos/Carrusel.css";

const Carrusel = () => {

  const [Images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://localhost:3333"
      );

      setImages(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="carrusel">
      <figure className="icon-cards mt-3">
        <div className="icon-cards__content">
          {Images.map((imagen, index) => (
            <div key={index} className="icon-cards__item">
              <img className='image' src={imagen.imagen} alt="" />
            </div>
          ))}
        </div>
      </figure>
    </div>
  );
};

export default Carrusel;

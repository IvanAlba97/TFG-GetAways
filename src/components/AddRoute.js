import React, { useState, useEffect } from "react";
import '../styles/AddRoute.css';

const AddRoute = () => {
  const [provinces, setProvinces] = useState([]);
  const [newRoute, setNewRoute] = useState({
    id_provincia: "",
    nombre: "",
    descripcion: "",
    imagen: "",
    longitud: "",
    tipo: "",
    dificultad: "",
    permiso_necesario: false,
    como_llegar: "",
    enlace_maps: ""
  });
  const dificultad = {
    Fácil: 'Fácil',
    Moderado: 'Moderado',
    Difícil: 'Difícil'
  };
  const tipo = {
    Lineal: 'Lineal',
    Circular: 'Circular',
    Semicircular: 'Semicircular'
  };

  useEffect(() => {
    fetch('http://localhost:3333/provinces')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setProvinces(data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleProvinceChange = (e) => {
    setNewRoute({ ...newRoute, id_provincia: e.target.value });
  };

  const handleNameChange = (e) => {
    setNewRoute({ ...newRoute, nombre: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewRoute({ ...newRoute, descripcion: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewRoute({ ...newRoute, imagen: e.target.value });
  };

  const handleLengthChange = (e) => {
    setNewRoute({ ...newRoute, longitud: e.target.value });
  };

  const handleTypeChange = (e) => {
    setNewRoute({ ...newRoute, tipo: e.target.value });
  };

  const handleDifficultyChange = (e) => {
    setNewRoute({ ...newRoute, dificultad: e.target.value });
  };

  const handlePermissionChange = (e) => {
    setNewRoute({ ...newRoute, permiso_necesario: e.target.checked });
  };

  const handleArriveChange = (e) => {
    setNewRoute({ ...newRoute, como_llegar: e.target.value });
  };

  const handleMapsChange = (e) => {
    setNewRoute({ ...newRoute, enlace_maps: e.target.value });
  };

  const handleAddRoute = async (e) => {
    e.preventDefault();
    if (!newRoute.id_provincia ||
      !newRoute.nombre ||
      !newRoute.descripcion ||
      !newRoute.imagen ||
      !newRoute.longitud ||
      !newRoute.tipo ||
      !newRoute.dificultad ||
      !newRoute.como_llegar ||
      !newRoute.enlace_maps) {
      alert("Por favor, complete todos los campos");
      return;
    }
    if (isNaN(parseFloat(newRoute.longitud))) {
      alert("La longitud debe ser un número");
      return;
    }
    const response = await fetch("http://localhost:3333/routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRoute),
    });
    if (response.ok) {
      setNewRoute({
        id_provincia: "",
        nombre: "",
        descripcion: "",
        imagen: "",
        longitud: "",
        tipo: "",
        dificultad: "",
        permiso_necesario: "",
        como_llegar: "",
        enlace_maps: "",
      });
      alert("Ruta añadida correctamente.");
    }
  };


  return (
    <div className="contenedor-add">
      <h2>Añadir ruta</h2>
      <div className="addroute-form">
        <label>
          <span>Provincia:</span>
          <select className="form-input" value={newRoute.id_provincia} onChange={handleProvinceChange}>
            <option value="">Seleccione una provincia</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Nombre:</span>
          <input className="form-input" type="text" value={newRoute.nombre} onChange={handleNameChange} />
        </label>
        <label>
          <span>Descripción:</span>
          <textarea className="form-input"
            value={newRoute.descripcion}
            onChange={handleDescriptionChange}
          ></textarea>
        </label>
        <label>
          <span>Imagen:</span>
          <input className="form-input" type="text" value={newRoute.imagen} onChange={handleImageChange} />
        </label>
        <label>
          <span>Longitud:</span>
          <input className="form-input"
            type="text"
            value={newRoute.longitud}
            onChange={handleLengthChange}
          />
        </label>
        <label>
          <span>Tipo:</span>
          <select className="form-input" value={newRoute.tipo} onChange={handleTypeChange}>
            <option value="">Seleccione un tipo</option>
            {Object.keys(tipo).map((key) => (
              <option key={key} value={tipo[key]}>
                {tipo[key]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Dificultad:</span>
          <select className="form-input"
            value={newRoute.dificultad}
            onChange={handleDifficultyChange}
          >
            <option value="">Seleccione una dificultad</option>
            {Object.keys(dificultad).map((key) => (
              <option key={key} value={dificultad[key]}>
                {dificultad[key]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Permiso necesario:</span>
          <input className="form-check"
            type="checkbox"
            checked={newRoute.permiso_necesario}
            onChange={handlePermissionChange}
          />
        </label>
        <label>
          <span>Cómo llegar:</span>
          <textarea className="form-input"
            value={newRoute.como_llegar}
            onChange={handleArriveChange}
          ></textarea>
        </label>
        <label>
          <span>Enlace a Google Maps:</span>
          <input className="form-input"
            type="text"
            value={newRoute.enlace_maps}
            onChange={handleMapsChange}
          />
        </label>
        <button type="button" onClick={handleAddRoute}>
          Añadir ruta
        </button>
      </div>
    </div>
  );
};

export default AddRoute;
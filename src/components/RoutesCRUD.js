import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import AddRoute from "./AddRoute.js";
import '../styles/RoutesCRUD.css';

const UsersCRUD = () => {
  const [user, setUser] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [newRoute, setNewRoute] = useState({
    id_provincia: "",
    nombre: "",
    descripcion: "",
    imagen: "",
    longitud: "",
    tipo: "",
    dificultad: "",
    permiso_necesario: "",
    como_llegar: "",
    enlace_maps: ""
  });
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [routesPerPage, setRoutesPerPage] = useState('');
  const indexOfLastRoute = currentPage * routesPerPage;
  const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
  const currentRoutes = routes.slice(indexOfFirstRoute, indexOfLastRoute);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3333/user', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No se ha iniciado sesión');
        }
      })
      .then((data) => {
        setUser(data?.user);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  useEffect(() => {
    const isAdmin = async () => {
      try {
        const response = await fetch(`http://localhost:3333/is-admin`, {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } else {
          // manejar el error en la respuesta
        }
      } catch (error) {
        console.error(error);
      }
    };
    isAdmin();
  }, []);

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

  const fetchRoutes = async () => {
    const response = await fetch("http://localhost:3333/routes");
    const data = await response.json();
    setRoutes(data);
    setRoutesPerPage(10);
  };

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

  const handleUpdateRoute = async (routeId) => {
    // Verificar si los campos están vacíos
    if (!newRoute.nombre.trim() || !newRoute.descripcion.trim() || !newRoute.imagen.trim() || !newRoute.longitud || !newRoute.como_llegar.trim() || !newRoute.enlace_maps.trim()) {  // Verificar que newRoute.longitud no sea nulo o indefinido
      alert("Por favor, complete todos los campos.");
      return;
    }
    if (isNaN(parseFloat(newRoute.longitud))) {
      alert("La longitud debe ser un número");
      return;
    }
    await fetch(`http://localhost:3333/routes/${routeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newRoute }),
    });
    alert("Ruta modificada correctamente.");
    fetchRoutes();
  };

  const handleDeleteRoute = async (routeId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta ruta?"); // Mostrar ventana de confirmación
    if (confirmDelete) {
      await fetch(`http://localhost:3333/routes/${routeId}`, {
        method: "DELETE",
      });
      fetchRoutes();
    }
  };

  const handleEditRoute = (routeId) => {
    const selectedRoute = routes.find(r => r.id === routeId); // Buscar la ruta seleccionada
    setNewRoute({
      id_provincia: selectedRoute.id_provincia,
      nombre: selectedRoute.nombre,
      descripcion: selectedRoute.descripcion,
      imagen: selectedRoute.imagen,
      longitud: selectedRoute.longitud,
      tipo: selectedRoute.tipo,
      dificultad: selectedRoute.dificultad,
      permiso_necesario: selectedRoute.permiso_necesario,
      como_llegar: selectedRoute.como_llegar,
      enlace_maps: selectedRoute.enlace_maps
    }); // Establecer los datos de la ruta seleccionada en newRoute
    setSelectedRouteId(routeId);
    setIsFormVisible(!isFormVisible);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(routes.length / routesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    // Configurar el desplazamiento suave con window.scrollTo()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    setCurrentPage(pageNumber);
  }

  return (
    <div className="fondo">
      <Navbar user={user} />
      {isAdmin &&
        <div>
          <div className="contenedor-crud">
            <h1>Gestión de rutas</h1>
            <ul>
              {currentRoutes.map((r) => (
                <li key={r.id} className="user-item">
                  <span onClick={() => handleEditRoute(r.id)} className="user-name">
                    {r.nombre}
                  </span>
                  {isFormVisible && selectedRouteId === r.id && (
                    <div className="user-form">
                      <span>Nombre</span>
                      <input
                        type="text"
                        name="nombre"
                        placeholder={r.nombre}
                        value={newRoute.nombre || ""}
                        onChange={handleNameChange}
                        className="form-input"
                      />
                      <span>Descripción</span>
                      <textarea
                        name="descripcion"
                        placeholder={r.descripcion}
                        value={newRoute.descripcion || ""}
                        onChange={handleDescriptionChange}
                        className="form-input"
                      />
                      <span>Provincia</span>
                      <select
                        name="provincia"
                        value={newRoute.id_provincia}
                        onChange={handleProvinceChange}
                        className="form-input"
                      >
                        {provinces.map((provincia) => {
                          return (
                            <option key={provincia.id} value={provincia.id}>
                              {provincia.nombre}
                            </option>
                          );
                        })}
                      </select>
                      <span>Imagen</span>
                      <input
                        type="text"
                        name="imagen"
                        placeholder={r.imagen}
                        value={newRoute.imagen || ""}
                        onChange={handleImageChange}
                        className="form-input"
                      />
                      <span>Longitud (Km)</span>
                      <input
                        type="text"
                        name="longitud"
                        placeholder={r.longitud}
                        value={newRoute.longitud || ""}
                        onChange={handleLengthChange}
                        className="form-input"
                      />
                      <span>Tipo</span>
                      <select
                        name="tipo"
                        value={newRoute.tipo}
                        onChange={handleTypeChange}
                        className="form-input"
                      >
                        {Object.values(tipo).map((t) => {
                          return (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          );
                        })}
                      </select>
                      <span>Dificultad</span>
                      <select
                        name="dificultad"
                        value={newRoute.dificultad}
                        onChange={handleDifficultyChange}
                        className="form-input"
                      >
                        {Object.values(dificultad).map((d) => {
                          return (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          );
                        })}
                      </select>
                      <span>Permiso necesario</span>
                      <input
                        type="checkbox"
                        name="permiso"
                        checked={newRoute.permiso_necesario}
                        onChange={handlePermissionChange}
                        className="form-check"
                      />
                      <span>Cómo llegar</span>
                      <textarea
                        name="como-llegar"
                        placeholder={r.como_llegar}
                        value={newRoute.como_llegar || ""}
                        onChange={handleArriveChange}
                        className="form-input"
                      />
                      <span>Enlace Google Maps</span>
                      <input
                        type="text"
                        name="enlace-maps"
                        placeholder={r.enlace_maps}
                        value={newRoute.enlace_maps || ""}
                        onChange={handleMapsChange}
                        className="form-input"
                      />
                      <button
                        onClick={() => handleUpdateRoute(r.id)}
                        className="button"
                      >
                        Actualizar
                      </button>
                      <button
                        onClick={() => handleDeleteRoute(r.id)}
                        className="btn-delete"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className='pagination'>
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={currentPage === number ? 'currentPage' : 'no-currentPage'}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
          <div className="addroute">
            <AddRoute />
          </div>
        </div>
      }
      {!isAdmin &&
        <div>
          <h2>Acceso no autorizado</h2>
          <h2>Este apartado es solo para administradores</h2>
        </div>
      }
    </div>
  );

};

export default UsersCRUD;
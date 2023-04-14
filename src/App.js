import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Access from './components/Access.js';
import Home from './components/Home.js';
import RouteDetail from './components/RouteDetail.js';
import Baggage from './components/Baggage.js';
import PendingRoute from './components/PendingRoute.js';
import CompletedRoute from './components/CompletedRoute.js';
import AllRoutes from './components/AllRoutes.js';
import Profile from './components/Profile.js';
import UsersCRUD from './components/UsersCRUD.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<Home />} />
        <Route path="/access" element={<Access />} />
        <Route path="/ruta/:id" element={<RouteDetail />} />
        <Route path="/equipaje" element={<Baggage />} />
        <Route path="/rutas-pendientes" element={<PendingRoute />} />
        <Route path="/rutas-completadas" element={<CompletedRoute />} />
        <Route path="/rutas" element={<AllRoutes />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/crud-usuarios" element={<UsersCRUD />} />
      </Routes>
    </Router>
  );
};

export default App;

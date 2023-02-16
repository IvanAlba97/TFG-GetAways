import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Access from './componentes/Access.js';
import Home from './componentes/Home.js';
import RouteDetail from './componentes/RouteDetail.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<Home />} />
        <Route path="/access" element={<Access />} />
        <Route path="/ruta/:id" element={<RouteDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

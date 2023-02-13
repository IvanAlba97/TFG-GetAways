import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Access from './componentes/Access.js';
import Home from './componentes/Home.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<Home />} />
        <Route path="/access" element={<Access />} />
      </Routes>
    </Router>
  );
};

export default App;

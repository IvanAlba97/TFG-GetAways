import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Content from './Content.js';
import Access from './Access.js';

function Home() {
  return (
    <div className="App">
      <Routes>
        <Route path="/access" element={<Access />} />
      </Routes>
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}

export default Home;

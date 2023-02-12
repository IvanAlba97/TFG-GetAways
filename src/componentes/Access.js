import React from "react";
import "../estilos/Access.css";
import Login from "./Login.js";
import Register from "./Register.js";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Access = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="login">
          <Login />
        </div>
        <div className="register">
          <Register />
        </div>
      </div>
      <Footer />
    </div>
  );
};



export default Access;

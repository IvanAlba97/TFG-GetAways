import React from "react";
import "../estilos/Access.css";
import Login from "./Login.js";
import Register from "./Register.js";

const Access = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Login />
      <Register />
    </div>
  );
};

export default Access;

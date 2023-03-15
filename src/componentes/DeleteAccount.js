import React, { useState } from "react";
import '../estilos/Perfil.css';

function DeleteAccount() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleAcceptClick = () => {
    fetch("http://localhost:3333/eliminar-cuenta", {
      method: "DELETE",
      credentials: 'include'
    }).then(() => {
      setShowConfirm(false);
      sessionStorage.removeItem('session');
      window.location.href = '/';
    });
  };

  const handleCancelClick = () => {
    setShowConfirm(false);
  };

  return (
    <div style={{textAlign: "center"}}>
      {showConfirm ? (
        <div>
          <p>¿Está seguro que desea eliminar su cuenta? Esta acción es irreversible.</p>
          <button className='btn-cancel' onClick={handleCancelClick}>Cancelar</button>
          <button className='btn-accept' onClick={handleAcceptClick}>Aceptar</button>
        </div>
      ) : (
        <button className='btn-delete-account' onClick={handleDeleteClick}>Eliminar cuenta</button>
      )}
    </div>
  );
}

export default DeleteAccount;

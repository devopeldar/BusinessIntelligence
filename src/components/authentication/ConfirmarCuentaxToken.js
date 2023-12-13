import React from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../../config';
function ConfirmarCuentaxToken() {
    let { token } = useParams();
  console.log(666666);
    return (
      <div>
        <h1>Confirmación de Cuenta</h1>
        <p>Token recibido: {token}</p>
        {/* Otro contenido relacionado con la confirmación de la cuenta */}
      </div>
    );
  } 
export default ConfirmarCuentaxToken;

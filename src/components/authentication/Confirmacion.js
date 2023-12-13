import React from 'react';
import { useParams } from 'react-router-dom';


const Confirmacion = () => {
    const { email } = useParams();
  return (
    <div>
      <h2>¡Registro exitoso!</h2>
      <p>Felicitaciones ${email} por registrarte con éxito. En minutos mas recibiras un correo con instrucciones de como activar tu usuario</p>
      <p>Recuerda revisar tu casilla de correo no deseado, si al pasar 10 minutos aun no has recibido</p>
      {/* Agrega más contenido según lo necesites */}
    </div>
  );
};

export default Confirmacion;



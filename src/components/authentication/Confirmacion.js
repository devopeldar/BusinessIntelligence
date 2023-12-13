import React from 'react';
import { useParams } from 'react-router-dom';


const Confirmacion = (handleLogin) => {
    const { email } = useParams();
  return (
    <div>
      <h2 className='mensajeregister'>¡Registro exitoso!</h2>
      <p className='mensajeregister' > Felicitaciones <b>{email}</b> por registrarte con éxito. En minutos mas recibiras un correo con instrucciones de como activar tu usuario</p>
      <p className='mensajeregister' >Recuerda revisar tu casilla de correo no deseado, si al pasar 10 minutos aun no has recibido</p>
      {/* Agrega más contenido según lo necesites */}

      <button handleLogin={handleLogin}>Comenzar</button>


    </div>
    
  );
};

export default Confirmacion;



import React, { useEffect } from 'react';
import axios from 'axios';
import API_URL from './config';

const SessionChecker = () => {
  console.log('Presione la Tecla ......')
  useEffect(() => {
    console.log('Presione la Tecla ...............')
    const handleKeyPress = (event) => {
      console.log('Presione la Tecla ' + event.keyCode)
      if (event.keyCode === 116) { // Verifica si la tecla presionada es F5
        checkSession(); // Llama a la función para verificar la sesión
        console.log('Presione la Tecla ' + event.keyCode)
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    console.log('Presione la Tecla ...............')
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const checkSession = () => {
    console.log('response SessionChecker');
    // Realiza la solicitud GET al servidor para verificar la sesión
    axios.get(API_URL + '/api/check-session') // Reemplaza '/api/check-session' con tu ruta de verificación en el servidor
      .then(response => {
        // Si la sesión ha expirado, redirige al usuario al inicio de sesión
        console.log('response ssss' +  response);
        if (response.data.sessionExpired) {
          window.location.href = '/login'; // Redirige al inicio de sesión
        }
      })
      .catch(error => {
        
        console.error('Error al verificar la sesión:', error);
      });
  };

  return <></>; // Este componente no renderiza nada visible en la interfaz
};

export default SessionChecker;
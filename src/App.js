import React from 'react';
import Login from './components/auth/Login'; // Ruta relativa al componente Login.js

const App = () => {
  return (
    <div>
      {/* Otros componentes de tu aplicación */}
      <Login /> {/* Utiliza el componente de inicio de sesión aquí */}
    </div>
  );
};

export default App;
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para verificar el usuario y contraseña
    // Puedes enviar estos datos a tu backend para autenticación
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
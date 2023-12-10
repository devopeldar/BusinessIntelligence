import React, { useState } from 'react';

const Perfil = () => {
  const [nombre, setNombre] = useState('');
  const [activo, setActivo] = useState(false);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleActivoChange = (event) => {
    setActivo(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes utilizar la información de 'nombre' y 'activo' para crear un nuevo perfil
    // Por ejemplo, podrías enviar esta información a tu servidor para almacenarla en la base de datos
    console.log('Nombre:', nombre);
    console.log('Activo:', activo);
    // Lógica para enviar la información al backend
    // ...
  };

  return (
    <div className="container mt-4">
      <h2>Mantenimiento Perfiles</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={handleNombreChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="activo"
            checked={activo}
            onChange={handleActivoChange}
          />
          <label htmlFor="activo" className="form-check-label">Activo</label>
        </div>
        <button type="submit" className="btn btn-primary">Guardar Perfil</button>
      </form>
    </div>
  );
};

export default Perfil;
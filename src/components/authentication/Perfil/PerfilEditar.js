// EditarPerfil.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_URL from '../../../config';

const PerfilEditar = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL (el ID del perfil a editar)
  const [perfil, setPerfil] = useState(null);
  const [nombre, setNombre] = useState('');
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    // Aquí realizas la llamada a tu API para obtener el perfil específico por su ID
    const GetPerfil = async () => {
      try {
        const response = await fetch( API_URL + `/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el perfil');
        }
        const data = await response.json();
        setPerfil(data);
        setNombre(data.nombre); // Puedes prellenar los campos con la información del perfil
        setActivo(data.activo);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    GetPerfil();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Aquí realizas la llamada a tu API para actualizar el perfil con los nuevos datos
      await fetch( API_URL + `/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, activo }),
      });
      // Manejar la lógica después de actualizar el perfil
      console.log('Perfil actualizado');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  if (!perfil) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="activo"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
          />
          <label htmlFor="activo" className="form-check-label">Activo</label>
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default PerfilEditar;
// EditarPerfil.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_URL from '../../../config';
import { useNavigate } from 'react-router-dom';
import LSButton from '../../controls/Button/LSButton';

const PerfilEdit = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL (el ID del perfil a editar)
  const [perfil, setPerfil] = useState(null);
  const [idperfil, setidperfil] = useState('');
  const [nombre, setNombre] = useState('');
  const [activo, setActivo] = useState(false);
  const [nombreboton, setnombreboton] = useState('Cancelar'); 
  const [mensaje, setMensaje] = useState('');
  const history = useNavigate();
  const [grabando, setGrabando] = useState(false);

  const handleVolver = () => {
    history('/Perfil/Perfiles'); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  useEffect(() => {
    setidperfil(id);
    // Aquí realizas la llamada a tu API para obtener el perfil específico por su ID
    const GetPerfil = async () => {
      try {
        const response = await fetch( API_URL + `/PerfilesGetById?idperfil=${id}`);
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
      setGrabando(true); // Inicia la grabación
      setnombreboton('Volver');

      // Aquí realizas la llamada a tu API para actualizar el perfil con los nuevos datos
      const response = await fetch( API_URL + `/PerfilesUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({idperfil, nombre, activo }),
      });
      const res = await response.json();

      console.log(res.rdoAccion);
      // Manejar la lógica después de actualizar el perfil
      if (res.rdoAccion) {
        // Manejar respuesta exitosa
        setMensaje('¡Datos actualizados exitosamente!');
        
      } else {
        // Manejar errores si la respuesta no es exitosa
        setMensaje(res.rdoAccionDesc);
        setGrabando(true); // Inicia la grabación
        setnombreboton('Cancelar');
      }
    } catch (error) {
      setMensaje('Error en la solicitud:', error);
      setGrabando(true); // Inicia la grabación
      setnombreboton('Cancelar');
      console.log('Error en la solicitud:' +  error);
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
        <div> 
        <LSButton caption='Guardar Cambios' type="submit" className="buttonnodal btn btn-primary"></LSButton>
        <LSButton type="button" caption={nombreboton} onClick={handleVolver} className="buttonnodal btn btn-danger"></LSButton>
        </div>
      </form>
       {/* Mensaje de grabación */}
       {mensaje && (
        <div className="alert alert-success mt-3" role="alert">
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default PerfilEdit;
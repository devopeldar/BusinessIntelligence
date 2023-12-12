import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../config';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import LSButton from '../../controls/Button/LSButton';



const PerfilAdd = () => {
  // const [nombre, setNombre] = useState('');
  // const [activo, setActivo] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    activo: true
  });

  const [mensaje, setMensaje] = useState('');
  const [grabando, setGrabando] = useState(false); // Nuevo estado para controlar la grabación
  const [nombreboton, setnombreboton] = useState('Cancelar'); 
  const history = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleVolver = () => {
    history('/Perfil/Perfiles'); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setGrabando(true); // Inicia la grabación
      setnombreboton('Volver');
      const response = await fetch(API_URL + '/PerfilesAdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response);

      if (response.ok) {
        // Manejar respuesta exitosa
        setMensaje('¡Datos grabados exitosamente!');
        
      } else {
        // Manejar errores si la respuesta no es exitosa
        setMensaje('¡Datos grabados exitosamentesssssssss!');
        setGrabando(true); // Inicia la grabación
        setnombreboton('Cancelar');
      }
    } catch (error) {
      setMensaje('Error en la solicitud:', error);
      setGrabando(true); // Inicia la grabación
      setnombreboton('Cancelar');
    }
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
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>


        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="activo"
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
          />
          <label htmlFor="activo" className="form-check-label">Activo</label>
        </div>
        <div> 
        <LSButton type="submit" caption={'Guardar Perfil'} disabled={grabando} className="buttonnodal btn btn-primary"></LSButton>
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

export default PerfilAdd;
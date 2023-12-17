import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../../config';

const TipoEventoList = () => {
  const [eventosTipo, setEventosTipo] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [idEventoTipo, setIdEventoTipo] = useState(null);
  const [descripcionEventoTipo, setDescripcionEventoTipo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + '/EventoTipoListar', {
          headers: {
            accept: 'application/json',
          },
        });
        setEventosTipo(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (id, descripcion) => {
    setIdEventoTipo(id);
    setDescripcionEventoTipo(descripcion);
    setShowConfirmation(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setIdEventoTipo(null);
    document.body.style.overflow = 'auto';
  };

  const handleConfirmDelete = async () => {
    try {
      // Lógica para eliminar el EventoTipo
      // ...

      setShowConfirmation(false);
      document.body.style.overflow = 'auto';

      // Actualiza la lista de EventosTipo en el estado después de eliminar
      setEventosTipo((prevEventosTipo) =>
        prevEventosTipo.filter((evento) => evento.idEventoTipo !== idEventoTipo)
      );
    } catch (error) {
      console.error('Error al eliminar el EventoTipo:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Tipos de Evento</h2>
      {/* Agregar enlace para agregar nuevo EventoTipo */}
      <Link to="/EventoTipoAdd" className="btn btn-success">Agregar Tipo de Evento</Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>ID Tarea Estado</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventosTipo.map((evento) => (
            <tr key={evento.idEventoTipo}>
              <td>{evento.idEventoTipo}</td>
              <td>{evento.descripcion}</td>
              <td>{evento.idTareaEstado}</td>
              <td>{evento.activo ? 'Sí' : 'No'}</td>
              <td>
                {/* Enlaces para editar y eliminar */}
                <Link to={`/EventoTipoEdit/${evento.idEventoTipo}`} className="btn btn-primary me-2">Editar</Link>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(evento.idEventoTipo, evento.descripcion)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirmation && (
        <div className="modalconf-overlay">
          <div className="modalconf">
            <p className="modal-title">
              ¿Estás seguro de que deseas eliminar el tipo de evento <b>{descripcionEventoTipo}</b>?
            </p>
            <div className="containernodal">
              <button className="buttonnodal btn btn-danger" onClick={handleConfirmDelete}>Eliminar</button>
              <button className="buttonnodal btn btn-success" onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TipoEventoList;
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../../config';

const TareaEstado = () => {
  const [tareaEstados, setTareaEstados] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [idTareaEstado, setIdTareaEstado] = useState(null);
  const [descripcionTareaEstado, setDescripcionTareaEstado] = useState('');

  const handleDeleteClick = (id, descripcion) => {
    setIdTareaEstado(id);
    setDescripcionTareaEstado(descripcion);
    setShowConfirmation(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setIdTareaEstado(null);
    document.body.style.overflow = 'auto';
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(API_URL + '/TareaEstadosDelete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idTareaEstado: `${idTareaEstado}` }),
      });

      setShowConfirmation(false);
      document.body.style.overflow = 'auto';

      setTareaEstados((prevTareaEstados) =>
        prevTareaEstados.filter((estado) => estado.idTareaEstado !== idTareaEstado)
      );
    } catch (error) {
      console.error('Error al eliminar el estado de tarea:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + '/TareaEstadoListar', {
            method:'POST',
          headers: {
            accept: 'application/json',
          },
        });
        setTareaEstados(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Estados de Tarea</h2>
      <Link to="/TareaEstado/TareaEstadoAdd" className="btn btn-success">
        Agregar Estado de Tarea
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareaEstados.map((estado) => (
            <tr key={estado.idTareaEstado}>
              <td>{estado.idTareaEstado}</td>
              <td>{estado.descripcion}</td>
              <td>
                <Link
                  to={`../../TareaEstado/TareaEstadoEdit/${estado.idTareaEstado}`}
                  className="btn btn-primary me-2"
                >
                  Modificar
                </Link>
                {/* <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(estado.idTareaEstado, estado.descripcion)}
                >
                  Eliminar
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirmation && (
        <div className="modalconf-overlay">
          <div className="modalconf">
            <p className="modal-title">
              ¿Estás seguro de que deseas eliminar el estado de tarea <b>{descripcionTareaEstado}</b>?
            </p>
            <div className="containernodal">
              <button
                className="buttonnodal btn btn-danger"
                onClick={handleConfirmDelete}
              >
                Eliminar
              </button>
              <button
                className="buttonnodal btn btn-success"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TareaEstado;
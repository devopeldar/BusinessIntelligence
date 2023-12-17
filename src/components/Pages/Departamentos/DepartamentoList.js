import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../../config';

const DepartamentoList = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [idDepartamento, setIdDepartamento] = useState(null);
  const [nombreDepartamento, setNombreDepartamento] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + '/DepartamentoListar', {
          headers: {
            accept: 'application/json',
          },
        });
        setDepartamentos(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (id, nombre) => {
    setIdDepartamento(id);
    setNombreDepartamento(nombre);
    setShowConfirmation(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setIdDepartamento(null);
    document.body.style.overflow = 'auto';
  };

  const handleConfirmDelete = async () => {
    try {
      // Lógica para eliminar el Departamento
      // ...

      setShowConfirmation(false);
      document.body.style.overflow = 'auto';

      // Actualiza la lista de Departamentos en el estado después de eliminar
      setDepartamentos((prevDepartamentos) =>
        prevDepartamentos.filter((departamento) => departamento.idDepartamento !== idDepartamento)
      );
    } catch (error) {
      console.error('Error al eliminar el Departamento:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Departamentos</h2>
      {/* Agregar enlace para agregar nuevo Departamento */}
      <Link to="/DepartamentoAdd" className="btn btn-success">Agregar Departamento</Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {departamentos.map((departamento) => (
            <tr key={departamento.idDepartamento}>
              <td>{departamento.idDepartamento}</td>
              <td>{departamento.nombre}</td>
              <td>
                {/* Enlaces para editar y eliminar */}
                <Link to={`/DepartamentoEdit/${departamento.idDepartamento}`} className="btn btn-primary me-2">Editar</Link>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(departamento.idDepartamento, departamento.nombre)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirmation && (
        <div className="modalconf-overlay">
          <div className="modalconf">
            <p className="modal-title">
              ¿Estás seguro de que deseas eliminar el departamento <b>{nombreDepartamento}</b>?
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

export default DepartamentoList;
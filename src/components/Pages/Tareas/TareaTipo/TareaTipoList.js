import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LSButton from '../../../controls/Button/LSButton';

const TareaTipoList = ({ handleEditar, handleEliminar }) => {
  const [tareasTipos, setTareasTipos] = useState([]);

  // Simulación de carga inicial de datos (puedes reemplazar esto con llamadas a tu API)
  useEffect(() => {
    // Aquí debes realizar la llamada al backend para obtener los datos de los tipos de tareas
    // Por ahora, usaré datos simulados
    const datosSimulados = [
      { IDTareaTipo: 1, Nombre: 'Tarea 1', Codigo: 'COD001', VencimientoDias: 5, VencimientoLegal: 10, Puntacion: 20 },
      // ... más datos simulados aquí si es necesario
    ];
    setTareasTipos(datosSimulados);
  }, []);

  return (
    <div>
      <h2>Listado de Tipos de Tareas</h2>
      <Link to="/TareaTipo/TareaTipoAdd">
        <LSButton type="button" className="btn btn-success" caption={'Agregar Tipo Tarea'}></LSButton>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Vencimiento en días</th>
            <th>Vencimiento legal</th>
            <th>Puntuación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareasTipos.map((tareaTipo) => (
            <tr key={tareaTipo.IDTareaTipo}>
              <td>{tareaTipo.IDTareaTipo}</td>
              <td>{tareaTipo.Nombre}</td>
              <td>{tareaTipo.Codigo}</td>
              <td>{tareaTipo.VencimientoDias}</td>
              <td>{tareaTipo.VencimientoLegal}</td>
              <td>{tareaTipo.Puntacion}</td>
              <td>
                <Button variant="info" onClick={() => handleEditar(tareaTipo.IDTareaTipo)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleEliminar(tareaTipo.IDTareaTipo)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TareaTipoList;
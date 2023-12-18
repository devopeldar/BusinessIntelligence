import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../../config";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

const TareaTipoList = () => {
  const [tareaTipos, setTareaTipos] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [idTareaTipo, setIdTareaTipo] = useState(null);
  const [nombreTareaTipo, setNombreTareaTipo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "/TareaTipoListar", {
          headers: {
            accept: "application/json",
          },
        });
        setTareaTipos(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // const handleDeleteClick = (id, nombre) => {
  //   setIdTareaTipo(id);
  //   setNombreTareaTipo(nombre);
  //   setShowConfirmation(true);
  //   document.body.style.overflow = 'hidden';
  // };

  const handleCancel = () => {
    setShowConfirmation(false);
    setIdTareaTipo(null);
    document.body.style.overflow = "auto";
  };

  const handleConfirmDelete = async () => {
    try {
      // Lógica para eliminar el TareaTipo
      // ...

      setShowConfirmation(false);
      document.body.style.overflow = "auto";

      // Actualiza la lista de TareaTipos en el estado después de eliminar
      setTareaTipos((prevTareaTipos) =>
        prevTareaTipos.filter((tipo) => tipo.idTareaTipo !== idTareaTipo)
      );
    } catch (error) {
      console.error("Error al eliminar el TareaTipo:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Agregar enlace para agregar nuevo TareaTipo */}
      <Link to="/TareaTipoAdd" className="btn btn-success">
        Agregar Tipo de Tarea
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareaTipos.map((tipo) => (
            <tr key={tipo.idTareaTipo}>
              <td>{tipo.idTareaTipo}</td>
              <td>{tipo.nombre}</td>
              <td>
                {/* Enlaces para editar y eliminar */}
                <Link
                  to={`/TareaTipoEdit/${tipo.idTareaTipo}`}
                  className="btn btn-primary me-2"
                >
                  Modificar
                </Link>
                {/* <button className="btn btn-danger" onClick={() => handleDeleteClick(tipo.idTareaTipo, tipo.nombre)}>Eliminar</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <TableContainer component={Paper}>
        <Table aria-label="caption table">
          <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell>idTareaTipo</TableCell>
              <TableCell align="right">Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tareaTipos.map((row) => (
              <TableRow key={row.idTareaTipo}>
                <TableCell component="th" scope="row">
                  {row.idTareaTipo}
                </TableCell>
                <TableCell align="right">{row.nombre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      {showConfirmation && (
        <div className="modalconf-overlay">
          <div className="modalconf">
            <p className="modal-title">
              ¿Estás seguro de que deseas eliminar el tipo de tarea{" "}
              <b>{nombreTareaTipo}</b>?
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

export default TareaTipoList;

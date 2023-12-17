import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el archivo CSS de Bootstrap
import { Link } from "react-router-dom";
import API_URL from "../../../config";
import axios from "axios";
import LSButton from "../../controls/Button/LSButton";

const Perfiles = () => {
  const [perfiles, setPerfiles] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [idperfil, setidperfil] = useState(null);
  const [nombreperfil, setnombreperfil] = useState("");

  const handleDeleteClick = (id, nombre) => {
    // Mostrar el modal de confirmación

    setidperfil(id);
    setnombreperfil(nombre);
    setShowConfirmation(true);
    document.body.style.overflow = "hidden"; // Bloquear el scroll del body
  };
  const handleCancel = () => {
    // Cancelar la eliminación y ocultar el modal de confirmación
    setShowConfirmation(false);
    setidperfil(null);
    document.body.style.overflow = "auto"; // Habilitar el scroll del body nuevamente
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "/PerfilesGet", {
          headers: {
            accept: "application/json",
          },
        });
        setPerfiles(response.data);
      } catch (error) {
        setError(error);

        console.log(error);
      }
    };

    fetchData();
  }, []);

  // const handleConfirmDelete = async () => {
  //   try {
  //     // Realizar la solicitud DELETE al confirmar
  //     await axios.delete(API_URL + '/PerfilesDelete/6'); // Cambia el ID por el correspondiente
  //     // Aquí puedes manejar la actualización de la lista de perfiles o hacer otras acciones después de eliminar

  //     // Ocultar el modal de confirmación después de la eliminación exitosa
  //     setShowConfirmation(false);
  //   } catch (error) {
  //     // Manejar errores en caso de que la eliminación falle
  //     console.error('Error al eliminar:', error);
  //   }
  // };

  const handleConfirmDelete = async () => {
    try {
      await fetch(API_URL + "/PerfilesDelete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idperfil: `${idperfil}` }),
      });

      setShowConfirmation(false);
      document.body.style.overflow = "auto"; // Habilitar el scroll del body nuevamente

      // Actualiza la lista de perfiles en el estado después de eliminar el perfil
      setPerfiles((prevPerfiles) =>
        prevPerfiles.filter((perfil) => perfil.idPerfil !== idperfil)
      );
    } catch (error) {
      console.error("Error al eliminar el perfil:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Perfiles</h2>
      {/* <button type="button" as={Link} to="/Perfil" className="btn btn-success">Agregar Perfil</button> */}
      <Link to="/Perfil/PerfilAdd">
        <LSButton
          type="button"
          as={Link}
          to="/Perfil"
          className="btn btn-success"
          caption={"Agregar Perfil"}
        ></LSButton>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {perfiles.map((perfil) => (
            <tr key={perfil.idPerfil}>
              <td>{perfil.idPerfil}</td>
              <td>{perfil.nombre}</td>
              <td>
                <input type="checkbox" checked={perfil.activo} readOnly />
              </td>

              <td>
                <Link
                  to={`../../Perfil/PerfilEdit/${perfil.idPerfil}`}
                  className="btn btn-primary me-2"
                >
                  Modificar
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDeleteClick(perfil.idPerfil, perfil.nombre)
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal de confirmación */}
      {showConfirmation && (
        // <div className="modal-overlay" style={{display: 'block', width: '600px', height: '200px', marginTop: '400px',marginLeft: '300px',}}>
        //   <div className="modal-content" >
        //   <div className="modal-header">
        <div className="modalconf-overlay">
          <div className="modalconf">
            <p className="modal-title">
              ¿Estás seguro de que deseas eliminar el perfil{" "}
              <b>{nombreperfil}</b>?
            </p>
            <div className="containernodal">
              <LSButton
                caption={"Eliminar"}
                type={"button"}
                className="buttonnodal btn btn-danger"
                onClick={handleConfirmDelete}
              ></LSButton>
              <LSButton
                caption={"Cancelar"}
                type={"button"}
                className="buttonnodal btn btn-success"
                onClick={handleCancel}
              ></LSButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfiles;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap
import { Link } from 'react-router-dom';
import API_URL from '../../../config';

const Perfiles = () => {
  const [perfiles, setPerfiles] = useState([]);

  useEffect(() => {
    // Aquí realizas la llamada a tu API para obtener los perfiles
    const GetPerfiles = async () => {
      try {
        // Realiza la solicitud a tu API para obtener los perfiles
        console.log(API_URL);
        // const response = await fetch(API_URL + `/PefilesGet`);
        // if (!response.ok) {
        //   throw new Error('Error al obtener los perfiles');
        // }
        const response = await fetch(API_URL + '/PefilesGet', {
          method: 'GET',
          // Otros parámetros de la solicitud, como headers, body, etc., si es necesario
        });

        const data = await response.json();
        setPerfiles(data); // Actualiza el estado con los perfiles obtenidos
      } catch (error) {
        console.error('Error:', error);
      }
    };

    GetPerfiles();
  }, []);

  const eliminarPerfil = async (id) => {
    try {
      // Lógica para eliminar el perfil con el ID proporcionado
      await fetch(API_URL + `/${id}`, {
        method: 'DELETE',
      });

      // Actualiza la lista de perfiles en el estado después de eliminar el perfil
      setPerfiles((prevPerfiles) => prevPerfiles.filter((perfil) => perfil.id !== id));
    } catch (error) {
      console.error('Error al eliminar el perfil:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Perfiles</h2>
      <button type="submit" as={Link} to="/Perfil" className="btn btn-success">Agregar Perfil</button>
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
            <tr key={perfil.id}>
              <td>{perfil.id}</td>
              <td>{perfil.nombre}</td>
              <td>{perfil.activo ? 'Activo' : 'Inactivo'}</td>
              {/* <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => {
                    // Lógica para modificar el perfil con el ID proporcionado
                    // Por ejemplo, redirigir a una página de edición o abrir un modal
                    console.log(`Modificar perfil con ID: ${perfil.id}`);
                  }}
                >
                  Modificar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarPerfil(perfil.id)}
                >
                  Eliminar
                </button>
              </td> */}
               <td>
                <Link to={`/editar/${perfil.id}`} className="btn btn-primary me-2">
                  Modificar
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarPerfil(perfil.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Perfiles;
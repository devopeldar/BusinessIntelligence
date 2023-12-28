import axios from "axios";
import React, { useState, useEffect } from "react";
import API_URL from "../../../config";
import MDTypography from "../../controls/MDTypography";
import MDBox from "../../controls/MDBox";
import MDBadge from "../../controls/MDBadge";
import MDButton from "../../controls/MDButton";
import { PencilSquare } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function PerfilesGet() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "/PerfilListar", {
          headers: {
            accept: "application/json",
          },
        });
        const data = response.data.map((perfil) => ({
          idPerfil: perfil.idPerfil, // Reemplaza 'id' por el nombre de la propiedad correspondiente en tus datos
          nombre: perfil.nombre, // Reemplaza 'nombre' por el nombre de la propiedad correspondiente en tus datos
          activo: perfil.activo, // Reemplaza 'activo' por el nombre de la propiedad correspondiente en tus datos
          cantusuarios: perfil.cantUsuarios,
        }));

        setRows(data);
      } catch (ex) {
        setError(ex);

        console.log(error);
      }
    };

    fetchData();
  }, [error]);

  const Nombre = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        {title}
      </MDTypography>
      <MDTypography variant="caption" color="warning" fontWeight="light">
        {description}{" "}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "IDPerfil", accessor: "idPerfil", align: "left" },
      { Header: "Nombre", accessor: "nombre", width: "45%", align: "left" },
      { Header: "Activo", accessor: "activo", align: "center" },
      { Header: "Acciones", accessor: "action", align: "center" },
    ],
    rows: rows.map((perfil) => ({
      idPerfil: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {perfil.idPerfil}
        </MDTypography>
      ), // Reemplaza <TuComponenteControl1 /> por el componente que desees en esta celda
      nombre: (
        <Nombre
          title={perfil.nombre}
          description={"cantidad usuarios afectados: " + perfil.cantusuarios}
        />
      ),
      activo: (
        <MDBox ml={-1}>
          {perfil.activo ? (
            <MDBadge
              badgeContent="activo"
              color="success"
              variant="gradient"
              size="sm"
            />
          ) : (
            <MDBadge
              badgeContent="desactivado"
              color="error"
              variant="gradient"
              size="sm"
            />
          )}
        </MDBox>
      ),

      action: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
            <Link
              to={`../../Perfil/PerfilEdit/${perfil.idPerfil}`}
            >
          <MDButton variant="text" color="dark">
            <PencilSquare color="blue" />
            
              
           
          </MDButton>
          </Link>
        </MDTypography>
      ),

      // Puedes agregar más propiedades según tus necesidades
    })),
  };
}

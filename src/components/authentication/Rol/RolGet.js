import { useEffect, useState } from "react";
import API_URL from "../../../config";
import MDTypography from "../../controls/MDTypography";
import MDBox from "../../controls/MDBox";
import MDBadge from "../../controls/MDBadge";
import MDButton from "../../controls/MDButton";
import { PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RolGet() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "/RolListar", {
          headers: {
            accept: "application/json",
          },
        });

 
        const data = response.data.map((Rol) => ({
            idRol: Rol.idRol,
            descripcion: Rol.descripcion,
            activo: Rol.activo,
        }));

        setRows(data);
      } catch (ex) {
        setError(ex);

        console.log(error);
      }
    };

    fetchData();
  }, [error]);

  return {
    columns: [
      { Header: "ID Rol", accessor: "idRol", align: "left" },
      { Header: "Descripcion", accessor: "descripcion", width: "45%", align: "left" },
      { Header: "Activo", accessor: "activo", align: "center" },
      { Header: "Acciones", accessor: "action", align: "center" },
    ],
    rows: rows.map((Rol) => ({
       
        idRol: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {Rol.idRol}
        </MDTypography>
      ), // Reemplaza <TuComponenteControl1 /> por el componente que desees en esta celda
      descripcion: (
        <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {Rol.descripcion}
      </MDTypography>
      ),

      activo: (
        <MDBox ml={-1}>
          {Rol.activo ? (
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
          <Link to={`../RolEdit/${Rol.idRol}`}>
            <MDButton variant="text" color="dark">
              <PencilSquare color="blue" />
            </MDButton>
          </Link>
        </MDTypography>
      ),

    })),
  };
}

import { useEffect, useState } from "react";
import API_URL from "../../../config";
import MDTypography from "../../controls/MDTypography";
import MDBox from "../../controls/MDBox";
import MDBadge from "../../controls/MDBadge";
import MDButton from "../../controls/MDButton";
import { PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DepartamentoGet() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "/DepartamentoListar", {
          headers: {
            accept: "application/json",
          },
        });

 
        const data = response.data.map((Departamento) => ({
            idDepartamento: Departamento.idDepartamento,
            nombre: Departamento.nombre,
            activo: Departamento.activo,
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
      //{ Header: "ID Depto", accessor: "idDepartamento", align: "left" },
      { Header: "Nombre", accessor: "nombre", width: "45%", align: "left" },
      { Header: "Activo", accessor: "activo", align: "center" },
      { Header: "Acciones", accessor: "action", align: "center" },
    ],
    rows: rows.map((Departamento) => ({
       
      //   idDepartamento: (
      //   <MDTypography
      //     component="a"
      //     href="#"
      //     variant="caption"
      //     color="text"
      //     fontWeight="medium"
      //   >
      //     {Departamento.idDepartamento}
      //   </MDTypography>
      // ), // Reemplaza <TuComponenteControl1 /> por el componente que desees en esta celda
      nombre: (
        <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {Departamento.nombre}
      </MDTypography>
      ),

      activo: (
        <MDBox ml={-1}>
          {Departamento.activo ? (
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
          <Link to={`../Departamento/DepartamentoEdit/${Departamento.idDepartamento}`}>
            <MDButton variant="text" color="dark">
              <PencilSquare color="blue" />
            </MDButton>
          </Link>
        </MDTypography>
      ),

    })),
  };
}

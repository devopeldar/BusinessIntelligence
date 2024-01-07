
import { useEffect, useState } from "react";
import API_URL from "../../../config";
import MDTypography from "../../controls/MDTypography";
import MDBox from "../../controls/MDBox";
import MDBadge from "../../controls/MDBadge";
import MDButton from "../../controls/MDButton";
import { PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ClienteGet() {

  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "/ClienteListar", {
          headers: {
            accept: "application/json",
          },
        });

     
        const data = response.data.map((Cliente) => ({
            idCliente: Cliente.idCliente,
            nombre: Cliente.nombre,
            activo: Cliente.activo,
            contacto: Cliente.contacto,
            telefono: Cliente.telefono,
            email: Cliente.email,
            cuit: Cliente.cuit,
            observaciones: Cliente.observaciones,
            tipoIVA: Cliente.tipoIVA,
            descripcionIVA: Cliente.descripcionIVA
        }));

        setRows(data);
      } catch (ex) {
        setError(ex);

        console.log(error);
      }
    };

    fetchData();
  }, [error]);

  const Nombre = ({ nombre, contacto, email, telefono }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        {nombre}
      </MDTypography>
      <MDTypography variant="caption" color="warning" fontWeight="light">
        {contacto}{" "}
      </MDTypography>
      <MDTypography variant="caption" color="warning" fontWeight="light">
        {email}{" "}{telefono}{" "}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      // { Header: "ID Cliente", accessor: "idCliente", align: "left" },
      { Header: "Cliente", accessor: "nombre", width: "25%", align: "left" },
      { Header: "Cuit", accessor: "cuit", align: "left" },
      { Header: "Cond. Iva", accessor: "descripcionIVA", align: "left" },
      { Header: "observaciones", accessor: "observaciones", align: "left" },
      { Header: "Activo", accessor: "activo", align: "center" },
      { Header: "Acciones", accessor: "action", align: "center" },
    ],
    rows: rows.map((Cliente) => ({
       
      //   idCliente: (
      //   <MDTypography
      //     component="a"
      //     href="#"
      //     variant="caption"
      //     color="text"
      //     fontWeight="medium"
      //   >
      //     {Cliente.idCliente}
      //   </MDTypography>
      // ), // Reemplaza <TuComponenteControl1 /> por el componente que desees en esta celda
      nombre: (
        <Nombre
          nombre={Cliente.nombre}
          contacto={"Contacto: " + Cliente.contacto}
          email={"Email: " + Cliente.email}
          telefono={"Telefono: " + Cliente.telefono}
        />
      ),
      cuit: (
        <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {Cliente.cuit}
      </MDTypography>
      ),
      descripcionIVA: (
        <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {Cliente.descripcionIVA}
      </MDTypography>
      ),
      observaciones: (
        <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {Cliente.observaciones}
      </MDTypography>
      ),
      activo: (
        <MDBox ml={-1}>
          {Cliente.activo ? (
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
          <Link to={`../ClienteEdit/${Cliente.idCliente}`}>
            <MDButton variant="text" color="dark">
              <PencilSquare color="blue" />
            </MDButton>
          </Link>
        </MDTypography>
      ),

    })),
  };
}

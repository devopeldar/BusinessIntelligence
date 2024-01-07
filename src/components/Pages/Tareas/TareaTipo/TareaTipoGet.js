import { useEffect, useState } from "react";
import API_URL from "../../../../config";
import MDTypography from "../../../controls/MDTypography";
import MDBox from "../../../controls/MDBox";
import MDBadge from "../../../controls/MDBadge";
import MDButton from "../../../controls/MDButton";
import { PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TareasTipoGet() {
 
  const [rows, setRows] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "/TareaTipoListar", {
          headers: {
            accept: "application/json",
          },
        });
        console.log("response " + response.json);
        //setTareasTipo(response.data);
        const data = response.data.map((tareatipo) => ({
          idTareatipo: tareatipo.idTareaTipo,
          nombre: tareatipo.nombre,
          codigo: tareatipo.codigo,
          activo: tareatipo.activo,
          vencimientosdias: tareatipo.vencimientoDias,
          vencimientoslegal: tareatipo.vencimientoLegal,
        }));

        setRows(data);
      } catch (ex) {
       // setError(ex);

        console.log(ex);
      }
    };

    fetchData();
  }, []);

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
  const Vencimientos = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        {title}
      </MDTypography>
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        {description}
      </MDTypography>
    </MDBox>
  );
  return {
    columns: [
     // { Header: "ID Tipo Tarea", accessor: "idtareatipo", align: "left" },
      { Header: "Nombre", accessor: "nombre", width: "45%", align: "left" },
      { Header: "Vencimientos", accessor: "vencimientos", align: "center" },
      { Header: "Activo", accessor: "activo", align: "center" },
      { Header: "Acciones", accessor: "action", align: "center" },
    ],
    rows: rows.map((tareatipo) => ({
       
      // idtareatipo: (
      //   <MDTypography
      //     component="a"
      //     href="#"
      //     variant="caption"
      //     color="text"
      //     fontWeight="medium"
      //   >
      //     {tareatipo.idTareatipo}
      //   </MDTypography>
      // ), // Reemplaza <TuComponenteControl1 /> por el componente que desees en esta celda
      nombre: (
        <Nombre
          title={tareatipo.nombre}
          description={"Codigo: " + tareatipo.codigo}
        />
      ),

      vencimientos: (
        <Vencimientos
          title={"Vencimiento Dias: " + tareatipo.vencimientosdias}
          description={"Vencimiento Legal: " + tareatipo.vencimientoslegal}
        />
      ),

      activo: (
        <MDBox ml={-1}>
          {tareatipo.activo ? (
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
          <Link to={`../../TareaTipo/TareaTipoEdit/${tareatipo.idTareatipo}`}>
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

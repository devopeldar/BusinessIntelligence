import { useEffect, useState } from "react";
import API_URL from "../../../../config";
import MDTypography from "../../../controls/MDTypography";
import MDBox from "../../../controls/MDBox";
import MDBadge from "../../../controls/MDBadge";
import MDButton from "../../../controls/MDButton";
import { PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TareaEstadoGet() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "/TareaEstadoListar", {
          headers: {
            accept: "application/json",
          },
        });
      //  console.log("response " + response.data);
       // setTareaEstado(response.data);
        const data = response.data.map((tareaestado) => ({
            idTareaEstado: tareaestado.idTareaEstado,
            descripcion: tareaestado.descripcion,
            esEstadoFinal: tareaestado.esEstadoFinal,
            activo: tareaestado.activo,
            observaciones : tareaestado.observaciones
        }));

        setRows(data);
      } catch (ex) {
       // setError(ex);

        console.log(ex);
      }
    };

    fetchData();
  }, []);

  const Observaciones = ({ description }) => (
    <MDBox lineHeight={1} textAlign="right">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="medium"
      >
        {description}
      </MDTypography>
     
    </MDBox>
  );


  return {
    columns: [
      //{ Header: "ID Estado Tarea", accessor: "idTareaEstado", align: "left" },
      { Header: "Descripcion", accessor: "descripcion", width: "45%", align: "left" },
      { Header: "Estado Final", accessor: "esEstadoFinal", align: "center" },
      { Header: "Activo", accessor: "activo", align: "center" },
      { Header: "Observaciones", accessor: "observaciones", align: "center" },
    ],
    rows: rows.map((tareaestado) => ({
       
      //   idTareaEstado: (
      //   <MDTypography
      //     component="a"
      //     href="#"
      //     variant="caption"
      //     color="text"
      //     fontWeight="medium"
      //   >
      //     {tareaestado.idTareaEstado}
      //   </MDTypography>
      // ), // Reemplaza <TuComponenteControl1 /> por el componente que desees en esta celda
      descripcion: (
        <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {tareaestado.descripcion}
      </MDTypography>
      ),

      esEstadoFinal: (
        <MDBox ml={-1}>
          {tareaestado.esEstadoFinal ? (
            <MDBadge
              badgeContent="Si"
              color="success"
              variant="gradient"
              size="sm"
            />
          ) : (
            <MDBadge
              badgeContent="No"
              color="error"
              variant="gradient"
              size="sm"
            />
          )}
        </MDBox>
      ),
      activo: (
        <MDBox ml={-1}>
          {tareaestado.activo ? (
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
      observaciones: (
        <Observaciones
        description={tareaestado.observaciones}
        />
      ),
      // action: (
      //   <MDTypography variant="caption" color="text" fontWeight="medium">
      //     <Link to={`../../TareaEstado/TareaEstadoEdit/${tareaestado.idTareaEstado}`}>
      //       <MDButton variant="text" color="dark">
      //         <PencilSquare color="blue" />
      //       </MDButton>
      //     </Link>
      //   </MDTypography>
      // ),

    })),
  };
}

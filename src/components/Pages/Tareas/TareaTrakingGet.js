import React, { useEffect, useState } from "react";
import API_URL from "../../../config";
import MDTypography from "../../controls/MDTypography";
import MDBox from "../../controls/MDBox";
import axios from "axios";
import MDBadge from "../../controls/MDBadge";
import { IdTarea } from "./IdTarea";


export default function TareaTrakingGet() {
  const [rows, setRows] = useState([]);
  const [id] = IdTarea();

  useEffect(() => {
    const fetchData = async (id) => {
      console.log("TareaTrakingGet(id); ", id);
      try {
        const reqTrk = {
          idTarea: id,
        };
        const response = await axios.post(
          API_URL + "/EventoTrackingDTO",
          reqTrk,
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        console.log(response.data);

        const data = response.data.map((trakingtarea) => ({
          tipoDeTarea: trakingtarea.tipoDeTarea,
          nombreCliente: trakingtarea.nombreCliente,
          fechaEvento: trakingtarea.fechaEvento,
          nombreUsuario: trakingtarea.nombreUsuario,
          descripcionEvento: trakingtarea.descripcionEvento,
          observaciones: trakingtarea.observaciones,
          descripcionEstado: trakingtarea.descripcionEstado,
          seEnvioMailAlCliente: trakingtarea.seEnvioMailAlCliente,
        }));

        setRows(data);
      } catch (ex) {


        console.log(ex);
      }
    };

    fetchData(id);
  }, [id]);

  const Fechas = ({ fechaEvento }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        {formatDateTime(fechaEvento)}
      </MDTypography>
    </MDBox>
  );

  const formatDateTime = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = formattedDate.getFullYear();
    const hours = formattedDate.getHours().toString().padStart(2, "0");
    const minutes = formattedDate.getMinutes().toString().padStart(2, "0");
    const seconds = formattedDate.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  // tipoDeTarea: trakingtarea.tipoDeTarea,
  // nombreCliente: trakingtarea.nombreCliente,

  return {
    columns: [
      { Header: "Fecha Evento", accessor: "fechaEvento", align: "left" },
      { Header: "Usuario", accessor: "nombreUsuario", align: "left" },
      {
        Header: "Descripcion Evento",
        accessor: "descripcionEvento",
        align: "left",
      },
      { Header: "Observaciones", accessor: "observaciones", align: "left" },
      { Header: "Estado", accessor: "descripcionEstado", align: "left" },
      {
        Header: "Mail al Cliente",
        accessor: "seEnvioMailAlCliente",
        align: "left",
      },
    ],
    rows: rows.map((trakingtarea) => ({
      fechaEvento: <Fechas fechaEvento={trakingtarea.fechaEvento} />,
      nombreUsuario: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {trakingtarea.nombreUsuario}
        </MDTypography>
      ),
      descripcionEvento: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {trakingtarea.descripcionEvento}
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
          {trakingtarea.observaciones}
        </MDTypography>
      ),

      descripcionEstado: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {trakingtarea.descripcionEstado}
        </MDTypography>
      ),
      seEnvioMailAlCliente: (
        <MDBox ml={-1}>
          {trakingtarea.seEnvioMailAlCliente ? (
            <MDBadge
              badgeContent="SI"
              color="success"
              variant="gradient"
              size="sm"
            />
          ) : (
            <MDBadge
              badgeContent="NO"
              color="error"
              variant="gradient"
              size="sm"
            />
          )}
        </MDBox>
      ),
    })),
  };
}

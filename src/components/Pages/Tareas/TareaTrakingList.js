import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardLayout from '../../controls/DashboardLayout';
import DashboardNavbar from '../../controls/DashboardNavbar';
import MDBox from '../../controls/MDBox';
import { Grid } from '@mui/material';
import { Card } from 'react-bootstrap';
import MDTypography from '../../controls/MDTypography';
import DataTable from '../../controls/Tables/DataTable';
import TareaTrakingGet from './TareaTrakingGet';
import { useParams } from 'react-router-dom';
//import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import MDButton from '../../controls/MDButton';
import { BuildingFillAdd } from 'react-bootstrap-icons';
import { ExitToApp } from '@mui/icons-material';
import { IdTarea } from './IdTarea';
import axios from 'axios';
import API_URL from '../../../config';
import MDBadge from '../../controls/MDBadge';

function TareaTrakingList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [columns, setColumns] = useState([]);
const [rows, setRows] = useState([]);

 
  const [idTarea, setId] = IdTarea();

  //const { columns, rows } = TareaTrakingGet();

  useEffect(() => {
    setId(id)
    

    const fetchData = async () => {
      try {
        const reqTrk = {
          idTarea: id,
        };
        const response = await axios.post(API_URL + "/EventoTrackingDTO", reqTrk, {
          headers: {
            accept: "application/json",
          },
        });

        // Procesar los datos
        const responseData = response.data;
        const mappedRows = responseData.map((trakingtarea) => {
          const seEnvioMailAlCliente = trakingtarea.seEnvioMailAlCliente ? (
            <MDBadge badgeContent="SI" color="success" variant="gradient" size="sm" />
          ) : (
            <MDBadge badgeContent="NO" color="error" variant="gradient" size="sm" />
          );
        
          return {
            tipoDeTarea: trakingtarea.tipoDeTarea,
            nombreCliente: trakingtarea.nombreCliente,
            fechaEvento: formatDateTime(trakingtarea.fechaEvento),
            nombreUsuario: trakingtarea.nombreUsuario,
            descripcionEvento: trakingtarea.descripcionEvento,
            observaciones: trakingtarea.observaciones,
            descripcionEstado: trakingtarea.descripcionEstado,
            seEnvioMailAlCliente: seEnvioMailAlCliente,
          };
        });

        

        setRows(mappedRows);
        // También actualiza globalColumns si esos datos provienen de esta misma respuesta
        setColumns( [
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
        ]); // Actualiza las columnas que obtuviste de tu lógica

      } catch (ex) {
        console.log(ex);
      }
    };

    fetchData();
  }, [id, setId]);

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

  const handleVolver = () => {
    navigate("/TareaVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>


        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
              >
                <MDTypography variant="h6" color="white">
                  Traking de Tareas

                </MDTypography>
              </MDBox>
              <MDBox pt={3} py={3} px={2}>
                <Grid container justifyContent="space-between" alignItems="center" direction="row">
                  <Grid item>
                    <MDButton
                      onClick={() => {
                        handleVolver();
                      }}
                      variant="gradient"
                      color="primary"
                      endIcon={<ExitToApp />}
                      text="contained"
                    >
                      Volver
                    </MDButton>
                  </Grid>
                  </Grid>
              </MDBox>
              <MDBox pt={3} py={3}
                px={2}>

                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder

                  pagination={{ color: "primary", variant: "gradient" }}
                />
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}


export default TareaTrakingList;
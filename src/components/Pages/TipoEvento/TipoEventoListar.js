import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardLayout from '../../controls/DashboardLayout';
import DashboardNavbar from '../../controls/DashboardNavbar';
import MDBox from '../../controls/MDBox';
import { Grid } from '@mui/material';
import { Card } from 'react-bootstrap';
import MDTypography from '../../controls/MDTypography';
import MDButton from '../../controls/MDButton';
import DataTable from '../../controls/Tables/DataTable';
import { BuildingFillAdd, PencilSquare } from 'react-bootstrap-icons';
import TipoEventoGet from './TipoEventoGet';
import { Link, useNavigate } from 'react-router-dom';
import MDBadge from '../../controls/MDBadge';
import EstadosProgresoTarea from "../../Utils/estadosProgresoTarea";
import axios from 'axios';
import API_URL from '../../../config';
function TipoEventoList() {
  //const { columns, rows } = TipoEventoGet();
  const [error, setError] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const history = useNavigate();
  const handleAdd = () => {
    history('/TipoEventoAdd'); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  useEffect(() => {
    fetchData();
  }, []);

  function obtenerDescripcionPorValor(valor) {
    for (let estado in EstadosProgresoTarea) {
      if (EstadosProgresoTarea[estado].valor === valor) {
        return EstadosProgresoTarea[estado].descripcion;
      }
    }
    return "Estado no encontrado";
  }


    const fetchData = async () => {
        try {
            const response = await axios.post(API_URL + "/EventoTipoListar", {
                headers: {
                    accept: "application/json",
                },
            });

            //setTipoEvento(response.data);
           
            const data = response.data.map((EventoTipo) => ({
                // idEventoTipo: EventoTipo.idEventoTipo,
                // descripcion: EventoTipo.descripcion,
                // activo: EventoTipo.activo,
                // idTareaEstado: EventoTipo.idTareaEstado,
                // estadotareadescripcion: EventoTipo.tareaEstado,
                // enviaMail: EventoTipo.enviaMail,
                // detiene: EventoTipo.detiene,
                // estado: EventoTipo.estado,
                // observaciones:EventoTipo.observaciones
           
                descripcion: (
                
                  <MDTypography
                      component="a"
                      href="#"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {EventoTipo.descripcion}
                  </MDTypography>
              ),
              estadotareadescripcion: (
                  <MDTypography
                      component="a"
                      href="#"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {EventoTipo.estadotareadescripcion}
                  </MDTypography>
              ),
              estado: (
                  <MDTypography
                      component="a"
                      href="#"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {obtenerDescripcionPorValor(EventoTipo.estado)}
                  </MDTypography>
              ),
              enviaMail: (
                  <MDBox ml={-1}>
                      {EventoTipo.enviaMail ? (
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
              detiene: (
                  <MDBox ml={-1}>
                      {EventoTipo.detiene ? (
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
              activo: (
                  <MDBox ml={-1}>
                      {EventoTipo.activo ? (
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
                  <MDTypography
                      component="a"
                      href="#"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                  >
                      {EventoTipo.observaciones}
                  </MDTypography>
              ),
              action: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                      <Link to={`../TipoEventoEdit/${EventoTipo.idEventoTipo}`}>
                          <MDButton variant="text" color="dark">
                              <PencilSquare color="blue" />
                          </MDButton>
                      </Link>
                  </MDTypography>
              ),
  
           
              }));

            setRows(data);
            setColumns([
              // { Header: "ID Tipo Evento", accessor: "idEventoTipo", align: "left" },
               { Header: "Descripcion", accessor: "descripcion", width: "25%", align: "left" },
               { Header: "Estado Tarea", accessor: "estadotareadescripcion", align: "left" },
               { Header: "Estado", accessor: "estado", align: "left" },
               { Header: "Envia Mail", accessor: "enviaMail", align: "center" },
               { Header: "Detiene Tarea",  accessor: "detiene", align: "center" },
               { Header: "Activo",  accessor: "activo", align: "center" },
               { Header: "Observaciones",  accessor: "observaciones", width: "20px", align: "left"},
               { Header: "Acciones",  accessor: "action", align: "center" },
           ]);

        } catch (ex) {
            setError(ex);

            console.log(ex);
        }
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
                  Tipo de Eventos
                 
                </MDTypography>
              </MDBox>
              <MDBox pt={3}  py={3}
                px={2}>
              <MDButton
                    onClick={() => {
                      handleAdd();
                    }}
                    variant="gradient"
                    color="success"
                    endIcon={<BuildingFillAdd />}
                    text="contained"
                  >
                    Agregar
                  </MDButton>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder
                  
                  pagination={{color:"info", variant:"gradient"}}
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


export default TipoEventoList;
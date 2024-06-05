
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import MDBox from '../../../controls/MDBox';
import { Grid } from '@mui/material';
import { Card } from 'react-bootstrap';

import { BuildingFillAdd, PencilSquare } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../../../config';
import 'jspdf-autotable';
import { Delete } from '@mui/icons-material';
import MDTypography from '../../../controls/MDTypography';
import MDButton from '../../../controls/MDButton';
import DashboardLayout from '../../../controls/DashboardLayout';
import DashboardNavbar from '../../../controls/DashboardNavbar';
import MDSnackbar from '../../../controls/MDSnackbar';
import DataTable from '../../../controls/Tables/DataTable';

function NoConformidadAccionListar() {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState([]);
    //const { columns, rows } = NoConformidadAccionGet();
    const history = useNavigate();
    const [NoConformidadAccion, setNoConformidadAccion] = useState([]);
    const [espdf, setEsPDF] = useState(false);
    const closeSuccessSB = () => setSuccessSB(false);
    const [successSB, setSuccessSB] = useState(false);
    const closeSuccessSBPrev = () => setSuccessSBPrev(false);
    const [successSBPrev, setSuccessSBPrev] = useState(false);

    const [dateTime, setDateTime] = useState("");

    const [errorSB, setErrorSB] = useState(false);
    // const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    const [mensajeerror, setMensajeError] = useState("Error al intentar Eliminar La Accion");
    const handleAdd = () => {
        history('/NoConformidadAccionAdd'); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    useEffect(() => {
   
        fetchData();
      }, []);
     

      const handleEliminar = async (idNoConformidadAccion) => {
        try
        {
          setSuccessSBPrev(true);
          const reqNoConformidadAccion = {
            idNoConformidadAccion: idNoConformidadAccion,
            usuario: localStorage.getItem("userlogueado"),
            origenAcceso: "web",
          };
        const response = await axios.post(API_URL + `/NoConformidadAccionEliminar` ,reqNoConformidadAccion, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          }
        });

          const res = await response.data;
          console.log("res:", res);
          if (res.rdoAccion) {
            setSuccessSB(true);
            setSuccessSBPrev(false);
            setErrorSB(false);
            fetchData();
          } else {
              // Manejar errores si la respuesta no es exitosa
              setMensajeError(res.rdoAccionDesc);
              setSuccessSB(false);
              setErrorSB(true);
              setSuccessSBPrev(false);
              
          }
   
        }
        catch(error) {
          console.log("Errores de Proceso:", error.message);
          setSuccessSB(false);
          setErrorSB(true);
          setSuccessSBPrev(false);
      };
    };
    useEffect(() => {
      fetchData();
      
      }, []);

      

        const fetchData = async () => {
          try {
           
            const response = await axios.post(API_URL + "/NoConformidadAccionListar", {
              headers: {
                accept: "application/json",
              },
            });
    
          setNoConformidadAccion(response.data);
            const data = response.data.map((NoConformidadAccion) => ({
  
              accion: (
                    <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                  >
                    {NoConformidadAccion.accion}
                  </MDTypography>
                  ),
                  accionTipo: (
                    <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                  >
                    {NoConformidadAccion.accionTipo}
                  </MDTypography>
                  ),
                 
                  action: (
                    <MDBox ml={-1}>
                      <MDTypography variant="caption" color="text" fontWeight="medium">
                        <Link to={`/NoConformidadAccionEdit/${NoConformidadAccion.idNoConformidadAccion}`}>
                          <MDButton variant="text" color="dark">
                            <PencilSquare color="blue" />
                          </MDButton>
                        </Link>
                      </MDTypography>

                      <MDTypography variant="caption" color="text" fontWeight="medium">
                      
                        <MDButton variant="text" color="dark"
                        onClick={() => {
                          handleEliminar(NoConformidadAccion.idNoConformidadAccion);
                      }}>
                          
                          <Delete color="error" />
                        </MDButton>
                      
                    </MDTypography>
                  </MDBox>
                  ),
            
            
            }));
           
            setRows(data);
            setColumns( [
    
                { Header: "Accion", accessor: "accion", align: "left" },
                { Header: "Tipo Accion", accessor: "accionTipo", align: "left" },
                { Header: "Acciones", accessor: "action", align: "center" },
              ]);
        
          } catch (ex) {
            setError(ex);
    
            console.log(error);
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
                                coloredShadow="secondary"
                            >
                                <MDTypography variant="h6" color="white">
                                    Acciones de No Conformidad

                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3} py={3} px={2}>
                                <Grid container justifyContent="space-between" alignItems="center" direction="row">
                                    <Grid item>
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
                                       
                                        
                                    </Grid>
                                    
                                    <DataTable
                                        table={{ columns, rows }}
                                        isSorted={false}                                        
                                        showTotalEntries={true}
                                        canSearch={false}
                                        pagination={{ color: "secondary", variant: "gradient" }}
                                    />
                                    <MDSnackbar
                                      color="info"
                                      notify={true}
                                      error={false}
                                      icon="notifications"
                                      title="Task Manager"
                                      content="Eliminando Accion de No Conformidad....."
                                      dateTime={dateTime}
                                      open={successSBPrev}
                                      onClose={closeSuccessSBPrev}
                                      close={closeSuccessSBPrev}
                                    />
                                    {/* </MDButton> */}
                                    <MDSnackbar
                                      color="success"
                                      icon="check"
                                      notify={false}
                                      error={false}
                                      title="Task Manager"
                                      content="Accion de No Conformidad eliminado exitosamente"
                                      dateTime={dateTime}
                                      open={successSB}
                                      onClose={closeSuccessSB}
                                      close={closeSuccessSB}
                                    />
                                    <MDSnackbar
                                        color="error"
                                        icon="warning"
                                        notify={false}
                                        error={true}
                                        title="Task Manager"
                                        content={mensajeerror}
                                        dateTime={dateTime}
                                        open={errorSB}
                                        onClose={closeErrorSB}
                                        close={closeErrorSB}
                                        autoHideDuration={null}
                                    />
                                </Grid>
                            </MDBox>
                        </Card>
                    </Grid>

                </Grid>
            </MDBox>
            {/* <Footer /> */}
        </DashboardLayout >
    );
}


export default NoConformidadAccionListar;
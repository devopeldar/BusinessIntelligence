import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el archivo CSS de Bootstrap

import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import { Grid } from "@mui/material";
import { Card } from "react-bootstrap";
import DashboardLayout from "../../../controls/DashboardLayout";
import DashboardNavbar from "../../../controls/DashboardNavbar";
import DataTable from "../../../controls/Tables/DataTable";

import MDButton from "../../../controls/MDButton";
import { Link, useNavigate } from 'react-router-dom';
import { BuildingFillAdd, PencilSquare } from "react-bootstrap-icons";
import API_URL from "../../../../config";
import axios from "axios";
import MDBadge from "../../../controls/MDBadge";
import MDInput from "../../../controls/MDInput";



function TareaTipoList() {
  //const { columns, rows } = TareasTipoGet();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const history = useNavigate();
  const handleAdd = () => {
    history('/TareaTipoAdd'); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  function setCookie(name, value, minutes) {
    const expires = new Date();
    expires.setTime(expires.getTime() + minutes * 60 * 1000);
  
    // Formatea la cookie con el nombre, el valor y la fecha de vencimiento
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
  
  function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
  
    // Busca la cookie por su nombre
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null; // Retorna null si no se encuentra la cookie
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  let nombreCValue ="";

  const filtronombreCCookie = getCookie("FILTROTIPOTAREANOMBRETT");
  if (filtronombreCCookie !== null) {const filtronombreCObjeto = filtronombreCCookie;  nombreCValue = filtronombreCObjeto;}

  const [nombre, setNombre] = useState(nombreCValue);



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

  useEffect(() => {
    if (nombre.length >= 3 || nombre.length === 0) {
      fetchData();
    }
    }, [nombre]
  );


  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
      setCookie("FILTROTIPOTAREANOMBRETT", nombre, 1400) 
      try {
        const reqTipoTarea = {
          nombre:nombre
        };
        const response = await axios.post(API_URL + "/TareaTipoListar",reqTipoTarea, {
          headers: {
            accept: "application/json",
          },
        });

        const data = response.data.map((tareatipo) => ({

          nombre: (
            <Nombre
              title={tareatipo.nombre}
              description={"Codigo: " + tareatipo.codigo}
            />
          ),
    
          vencimientos: (
            <Vencimientos
              title={"Dias Habilies para Vencimiento: " + tareatipo.vencimientosdias}
              // description={"Vencimiento Legal: " + tareatipo.vencimientoslegal}
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
              <Link to={`../../TareaTipo/TareaTipoEdit/${tareatipo.idTareaTipo}`}>
                <MDButton variant="text" color="dark">
                  <PencilSquare color="blue" />
                </MDButton>
              </Link>
            </MDTypography>
          ),

        }));

        setRows(data);
        setColumns([
          // { Header: "ID Tipo Tarea", accessor: "idtareatipo", align: "left" },
           { Header: "Nombre",  accessor: "nombre", width: "45%", align: "left" },
           { Header: "Vencimientos", accessor: "vencimientos", align: "center" },
           { Header: "Activo", accessor: "activo", align: "center" },
           { Header: "Acciones", accessor: "action", align: "center" },
         ])

      } catch (ex) {
       // setError(ex);

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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Tipos de Tarea
                 
                </MDTypography>
              </MDBox>
              <MDBox pt={3} py={3} px={2}>
                                <Grid container justifyContent="space-between" alignItems="center" direction="row">
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
                  <MDBox pt={3} py={3} px={2} style={{ display: "flex" }}>
                    <Grid>
                    <MDTypography variant="h9" color="info">
                        Filtros
                        </MDTypography>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="nombre"
                                label="Tipo Tarea"
                                variant="standard"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                
                            />
                        </MDBox>
                        </Grid>

                    </MDBox>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder
                  pagination={{color:"info", variant:"gradient"}}
                />
                </Grid>
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default TareaTipoList;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el archivo CSS de Bootstrap

import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import { Grid } from "@mui/material";
import { Card } from "react-bootstrap";
import DashboardLayout from "../../../controls/DashboardLayout";
import DashboardNavbar from "../../../controls/DashboardNavbar";
import DataTable from "../../../controls/Tables/DataTable";

import MDButton from "../../../controls/MDButton";
import { useNavigate } from 'react-router-dom';
import { BuildingFillAdd } from "react-bootstrap-icons";
import TareasTipoGet from "./TareaTipoGet";



function TareaTipoList() {
  const { columns, rows } = TareasTipoGet();
  const history = useNavigate();
  const handleAdd = () => {
    history('/TareaTipo/TareaTipoAdd'); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
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
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder
                  pagination={{color:"success", variant:"gradient"}}
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

export default TareaTipoList;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardLayout from '../../controls/DashboardLayout';
import DashboardNavbar from '../../controls/DashboardNavbar';
import MDBox from '../../controls/MDBox';
import { Grid } from '@mui/material';
import { Card } from 'react-bootstrap';
import MDTypography from '../../controls/MDTypography';

import DataTable from '../../controls/Tables/DataTable';

import UsuarioGet from './UsuarioGet';

function UsuarioList() {
  const { columns, rows } = UsuarioGet();

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
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Usuarios

                </MDTypography>
              </MDBox>
              <MDBox pt={3} py={3}
                px={2}>
                {/* <MDButton
                  onClick={() => {
                    handleAdd();
                  }}
                  variant="gradient"
                  color="success"
                  endIcon={<BuildingFillAdd />}
                  text="contained"
                >
                  Agregar
                </MDButton> */}
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder

                  pagination={{ color: "info", variant: "gradient" }}
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


export default UsuarioList;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardLayout from '../../controls/DashboardLayout';
import DashboardNavbar from '../../controls/DashboardNavbar';
import MDBox from '../../controls/MDBox';
import { Grid } from '@mui/material';
import { Card } from 'react-bootstrap';
import MDTypography from '../../controls/MDTypography';
import DataTable from '../../controls/Tables/DataTable';
import TareaTrakingGet from './TareaTrakingGet';
//import { useParams } from 'react-router-dom';


function TareaTrakingList() {
  const { columns, rows } = TareaTrakingGet();

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
              <MDBox pt={3}  py={3}
                px={2}>
              
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder
                  
                  pagination={{color:"primary", variant:"gradient"}}
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
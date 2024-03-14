import React, { useEffect } from 'react';
import BasicLayout from '../layauots/BasicLayout';
import { Card } from '@mui/material';
import MDBox from '../controls/MDBox';
import MDTypography from '../controls/MDTypography';
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../controls/DashboardLayout';
import DashboardNavbar from '../controls/DashboardNavbar';
const ConfirmacionIngreso = () => {

const navigate = useNavigate();
useEffect(() => {
  navigate("/");
}, []);
  return (
    <DashboardLayout >
    <DashboardNavbar />
    
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
      
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            ¡Bienvenido a Task Manager!
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ya puedes comenzar a utilizar el sistema
          </MDTypography>

        </MDBox>
        {/* <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">

            <MDTypography coloredshadow="success"
              textAlign="center" fontWeight="regular" color="dark">
             
            </MDTypography>
          </MDBox>
        </MDBox>
        */}
      </Card>
    
    </DashboardLayout>
  );
};

export default ConfirmacionIngreso;



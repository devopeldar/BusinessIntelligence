import React from 'react';
import BasicLayout from '../layauots/BasicLayout';
import { Card } from '@mui/material';
import MDBox from '../controls/MDBox';
import MDTypography from '../controls/MDTypography';
import MDButton from '../controls/MDButton';
import People from "@mui/icons-material/People";
import { useNavigate } from 'react-router-dom';
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
const ConfirmacionActivacionCuenta = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    localStorage.setItem('isRegister', 'false');
    localStorage.setItem('isLoggedIn', 'false');
    navigate("/Login");
  };


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="warning"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            ¡Activacion de Cuenta exitoso!
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Dirigete al Login para ingresar con tu cuenta
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
          </MDBox>
        </MDBox>
        <MDBox height="150px" textAlign="center">
          <MDButton 
            variant="gradient"
            color="warning"
            endIcon={<People />}
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </MDButton>
          
        </MDBox>
      </Card>
    </BasicLayout >
   
  );
};

export default ConfirmacionActivacionCuenta;



import React from 'react';
import BasicLayout from '../layauots/BasicLayout';
import { Card } from '@mui/material';
import MDBox from '../controls/MDBox';
import MDTypography from '../controls/MDTypography';
import MDButton from '../controls/MDButton';
import People from "@mui/icons-material/People";
import { Link } from 'react-router-dom';
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
const Confirmacion = () => {
//  const navigate = useNavigate();
  // const handleLogin = () => {
  //   navigate("/Login");
  // };

  // const handleRegistrarme = () => {
  //   localStorage.setItem('isRegister', 'false');
  // };
  
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            ¡Registro exitoso!
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Revisa tu casilla de correo electrónico
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">

            <MDTypography coloredshadow="success"
              textAlign="center" fontWeight="regular" color="dark">
              Felicitaciones por registrarte con éxito. En minutos mas recibiras un correo con instrucciones de como activar tu usuario
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox height="150px" textAlign="center">
          <MDButton component={Link} to="/Login"
            variant="gradient"
            color="success"
            endIcon={<People />}
          >
            Comenzar
          </MDButton>
          
        </MDBox>
      </Card>
    </BasicLayout >
   
  );
};

export default Confirmacion;



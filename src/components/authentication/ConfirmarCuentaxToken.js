import React, { useState } from 'react';
import API_URL from '../../config';
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import MDTypography from '../controls/MDTypography';
import BasicLayout from '../layauots/BasicLayout';
import { Card } from 'react-bootstrap';
import MDBox from '../controls/MDBox';
import MDInput from '../controls/MDInput';
import MDButton from '../controls/MDButton';
import { Alert, AlertTitle } from '@mui/material';
import { KeyFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from "react-router-dom";
function ConfirmarCuentaxToken() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [grabando, setGrabando] = useState(false);
  const [showprogrees, setShowprogrees] = useState(0);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    // Inicializa los campos del formulario
    email: "",
    emailconfirmadotoken: ""
    // ... otros campos
  });

  const handleInputChange = (event) => {
    // Maneja los cambios en los campos del formulario
    setGrabando(false);
    setShowprogrees(1);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleConfirmado = () => {
    localStorage.setItem('isRegister', 'false');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('isActivarCuenta', 'false');
    localStorage.setItem('isForgotPassword', 'false');
  };
  const handleSubmit = async (data) => {
    setGrabando(false); // Inicia la grabación
    setExito(true);
    setMensaje('');
      //console.log("formData ", formData);
        try {
          const response = await fetch(API_URL + "/UsuarioConfirmarCuentaxToken", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const res = await response.json();

          if (res.rdoAccion) {
           // console.log("res ", res);
            setGrabando(true);
            setExito(true);
            setMensaje(
              "Usuario Registrado con exito, Ya Puede Ingresar al sistema"
            );
            // setTimeout(() => {
            //   navigate('/'); // Redirige a la ruta deseada
            // }, 3000); // 3000 milisegundos = 3 segundos

          } else {
            // Manejar errores si la respuesta no es exitosa
            setMensaje(res.rdoAccionDesc);
            setGrabando(false);
            setShowprogrees(0);
            setExito(false);
          }
        } catch (error) {
          setShowprogrees(0);
          setMensaje(
            "Error en la solicitud: No se ha podido generar la activacion de la cuenta"
          );
          setGrabando(false);
          setExito(false);
          //console.log("Error en la solicitud:", error);
        }
      finally {
        setShowprogrees(0);
        setProgress(100);

        }
    
      // })
      // .catch((error) => {
      //   console.log("Errores de validación:", error.message);

      //   setMensaje(error.message);
      // });
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
            ¡Bienvenido a la Activacion de su cuenta Task Manager!
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Completa los datos solicitados con el mail que te registraste mas el Token de seguridad que recibiste por correo
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">

            <MDBox mb={2}>
              <MDInput
                type="email"
                name="email"
                label="Email"
                required
                variant="standard"
                value={formData.email}
                onChange={handleInputChange}
                
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="emailconfirmadotoken"
                label="Token"
                required
                variant="standard"
                value={formData.emailconfirmadotoken}
                onChange={handleInputChange}
                
                fullWidth
              />
            </MDBox>
          </MDBox>
          
        </MDBox>
        <MDBox height="150px" textAlign="center">
          <MDButton variant="gradient" color="warning" onClick={() => {
                  handleSubmit();
                 
                }}  disabled={grabando} endIcon={<KeyFill />}>
            Activar Cuenta
          </MDButton>
        </MDBox>
        <MDBox mt={4} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Ya activaste tu cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/Login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                  onClick={() => {
                    handleConfirmado();
                  }}
                >
                  Ir al Inicio
                </MDTypography>
              </MDTypography>
            </MDBox>
            {mensaje !== "" && (
              <Alert severity={exito ? "success" : "error"}>
                <AlertTitle>{exito ? "Felicitaciones" : "Error"}</AlertTitle>
                {mensaje}
              </Alert>
            )}
      </Card>
    </BasicLayout >


      // <div>
      //   <h1>Confirmación de Cuenta</h1>
      //   <p>Token recibido: {token}</p>
      //   {/* Otro contenido relacionado con la confirmación de la cuenta */}
      // </div>
    );
  } 
export default ConfirmarCuentaxToken;

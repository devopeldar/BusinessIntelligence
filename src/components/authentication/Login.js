import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'; // Importar el componente ReCAPTCHA
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import { Link, useNavigate } from 'react-router-dom';
import BasicLayout from '../layauots/BasicLayout';
import { Alert, AlertTitle, Card, Icon, IconButton } from '@mui/material';
import MDBox from '../controls/MDBox';
import MDTypography from '../controls/MDTypography';
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from '../controls/MDInput';
import { People } from 'react-bootstrap-icons';
import MDButton from '../controls/MDButton';
import API_URL from '../../config';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [grabando, setGrabando] = useState(false);
  const captcha = useRef(null);
  const [mensaje, setMensaje] = useState("");

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    passwordInput: {
      flex: 1,
    },
    passwordIcon: {
      position: 'absolute',
      right: 0,
      cursor: 'pointer',
      zIndex: 1, // Asegura que el icono esté en la capa superior
      height: 'auto', // Ajusta la altura según sea necesario
    },
    pwIcon: {
   
      height: 'auto', // Ajusta la altura según sea necesario
    },
  };
  
  localStorage.setItem('isLoggedIn', 'false');

  // useEffect(() => {
  //   // Establece el valor de 'isLoggedIn' en false al cargar la página de inicio

  //   console.log('wwwwwwwwwwwwwww');
  // }, []);
  //const [userPermissions, setUserPermissions] = useState({}); // Datos de permisos del usuario
  const [formData, setFormData] = useState({

    // Inicializa los campos del formulario
    email: "",
    pass: "",

  });

  const handleInputChange = (event) => {
    // Maneja los cambios en los campos del formulario

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleCuentaXToken = (value) => {
 
      setCaptchaValue(true);
      localStorage.setItem('isRegister', 'false');
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.setItem('isActivarCuenta', 'true');
      localStorage.setItem('isForgotPassword', 'false');
    
  };
  const handleChangePassword = (value) => {
 
      setCaptchaValue(true);
      localStorage.setItem('isRegister', 'false');
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.setItem('isActivarCuenta', 'false');
      localStorage.setItem('isForgotPassword', 'true');
    
  };
  const handleCaptchaChange = (value) => {
    if (captcha.current.getValue()) {

      setCaptchaValue(true);
    }
  };
  const handleRegistrarme = () => {
    localStorage.setItem('isRegister', 'true');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('isActivarCuenta', 'false');
    localStorage.setItem('isForgotPassword', 'false');
  };

  const handleSubmit = async (data) => {
    setMensaje("");
    setGrabando(true);
    if (captcha.current.getValue()) {
      console.log('El usuario no es un robot');
      setCaptchaValue(true);

    } else {
      setGrabando(false);
      console.log('Por favor acepta el captcha');
      setCaptchaValue(false);
      setIsLoggedIn(false);
      setMensaje("Por favor acepta el captcha.");
      return;
    }

    //Primero voy a la base si el login es correcto vuelvo y ejecuto esa funcion que actualizara un estado en App.js

    try {
      const response = await fetch(API_URL + "/UsuarioLogin ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();
      if (res.rdoAccion) {

        localStorage.setItem('userlogueado', res.email);
        localStorage.setItem('nameuserlogueado', res.nombre);
        localStorage.setItem('iduserlogueado', res.idUsuario);
        localStorage.setItem('idPerfil', res.idPerfil);
        localStorage.setItem('nombrePerfil', res.perfilNombre);
        //Aca ANALIZAR SI LoginCambiarClave = true  DEBO IR A LA PAGINA DE CAMBIAR CONTRASEÑA
        if (res.loginCambiarClave) {
          navigate("/CambiarContrasenia");
        }
        // Manejar respuesta exitosa
        setMensaje("¡Usuario Logueado exitosamente!");

        handleLogin();
      } else {
        // Manejar errores si la respuesta no es exitosa
        setMensaje(res.rdoAccionDesc);
        setGrabando(false);
        setIsLoggedIn(false);
      }
    }
    catch (error) {
      setMensaje("Error en la solicitud: el usuario no pudo ser identificado");
      setGrabando(false);
      setIsLoggedIn(false);
    }

  };
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
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
            Bienvenido!!
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Inicie sesión con su usuario y contraseña
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="email"
                label="Usuario"
                variant="standard"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            
            <MDBox mb={2} style={styles.container}>
              <MDInput
                 type={showPassword ? 'text' : 'password'}
                name="pass"
                label="Contraseña"
                variant="standard"
                value={formData.pass}
                onChange={handleInputChange}
                fullWidth
                style={styles.passwordInput}
              />
               <IconButton  style={styles.passwordIcon} onClick={handleTogglePasswordVisibility}>
                {showPassword ? (
                  <Icon style={styles.passwordIcon}>
                    <Visibility />
                  </Icon>
                ) : (
                  <Icon style={styles.passwordIcon}>
                    <VisibilityOff />
                  </Icon>
                )}
              </IconButton>
            </MDBox>
            <MDBox mb={2}>
              <ReCAPTCHA
                ref={captcha}
                sitekey="6LeUHycpAAAAAD5Kga3vKoQEWnyHx0YWNsjDeb2E"
                onChange={handleCaptchaChange}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={() => {
                  handleSubmit();
                }}
                variant="gradient"
                color="info"
                endIcon={<People />}
                fullWidth
                disabled={grabando}
              >
                Iniciar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿No tienes una cuenta? Regístrate {" "}
                <MDTypography
                  component={Link}
                  to="/Registrarme"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                  onClick={() => {
                    handleRegistrarme();
                  }}
                >
                  aquí
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Ya te Registraste y Necesitas activar tu cuenta?  {" "}
                <MDTypography
                  component={Link}
                  to="/ConfirmarCuentaXToken"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                onClick={() => {
                  handleCuentaXToken();
                }}
                >
                  Activa tu cuenta
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">

                <MDTypography
                  component={Link}
                  to="/RecuperarPass"
                  variant="button"
                  color="secondary"
                  fontWeight="medium"
                  textGradient
                  onClick={() => {
                    handleChangePassword();
                  }}
                >
                  ¿Olvide mi contraseña? {" "}
                </MDTypography>
              </MDTypography>
            </MDBox>
            {/* <MDBox mt={4} mb={1}>
              <MDProgress color="success"
                loading="true"
                value={showprogrees === 0 ? progress : 0}
                display={'true'}
                variant="contained"></MDProgress>

            </MDBox> */}

            {mensaje !== '' && (
              <Alert severity={"error"}>
                <AlertTitle>{"Error"}</AlertTitle>
                {mensaje}
              </Alert>
            )}

          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>

  );
};

export default Login;
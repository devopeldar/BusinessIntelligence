import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'; // Importar el componente ReCAPTCHA
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import { Link, useNavigate } from 'react-router-dom';
import BasicLayout from '../layauots/BasicLayout';
import { Alert, AlertTitle, Card } from '@mui/material';
import MDBox from '../controls/MDBox';
import MDTypography from '../controls/MDTypography';
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from '../controls/MDInput';
import { People } from 'react-bootstrap-icons';
import MDButton from '../controls/MDButton';
import MDProgress from '../controls/MDProgress';
import API_URL from '../../config';

const Login = ({ handleLogin, handleRegister }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const captcha = useRef(null);
  const [mensaje, setMensaje] = useState("");
  const [showprogrees, setShowprogrees] = React.useState(0);
  const [exito, setExito] = useState(false);
  const [formData, setFormData] = useState({
    
    // Inicializa los campos del formulario
    email: "",
    pass: "",

  });

  const handleInputChange = (event) => {
    // Maneja los cambios en los campos del formulario
    setShowprogrees(1);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleCaptchaChange = (value) => {
    if (captcha.current.getValue()) {
      console.log('El usuario no es un robot');
      setCaptchaValue(true);
    }
  };

  const handleSubmit = async (data) => {
    //e.preventDefault();

    // Verificar si el captcha está completado
    //  if (!captchaValue) {
    //   alert('Por favor, complete el captcha');
    //   return;
    // }

    // Validamos los inputs del formulario
    // Si son correctos ya podemos enviar el fomulario, actualizar la Interfaz, etc.
    console.log("Datos " + JSON.stringify(formData));
    if (captcha.current.getValue()) {
      console.log('El usuario no es un robot');
      setCaptchaValue(true);
     
    } else {
      console.log('Por favor acepta el captcha');
      setCaptchaValue(false);
      setIsLoggedIn(false);
      setMensaje("Por favor acepta el captcha.");
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
        // Manejar respuesta exitosa
        setMensaje("¡Usuario Logueado exitosamente!");
        setIsLoggedIn(true);
      } else {
        // Manejar errores si la respuesta no es exitosa
        setMensaje(res.rdoAccionDesc);
        setExito(false);
        setIsLoggedIn(false);
      }
    }
    catch (error) {
      setMensaje("Error en la solicitud: el usuario no pudo ser identificado");
      setExito(false);
      setIsLoggedIn(false);
    }

    if (isLoggedIn) {

      // Llamar a la función de inicio de sesión. 
      handleLogin();
    }
  };

  const stylesDivButton = {
    divContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px', // Ajusta la altura según sea necesario
    },
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
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="pass"
                label="Contraseña"
                variant="standard"
                value={formData.pass}
                onChange={handleInputChange}
                fullWidth
              />
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
                >
                  aquí
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
    // <div className="container mt-5">
    //   <div className="row justify-content-center">
    //     <div className="col-md-6">
    //       <div className="card">
    //         <div className="card-body">
    //           <h2 className="card-title">Iniciar sesión</h2>
    //           <form onSubmit={handleSubmit}>
    //             <div className="mb-3">
    //               <label htmlFor="username" className="form-label">Usuario:</label>
    //               <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
    //             </div>
    //             <div className="mb-3">
    //               <label htmlFor="password" className="form-label">Contraseña:</label>
    //               <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
    //             </div>

    //             <ReCAPTCHA
    //               ref={captcha}
    //               sitekey="6LeUHycpAAAAAD5Kga3vKoQEWnyHx0YWNsjDeb2E"
    //               onChange={handleCaptchaChange}
    //             />
    //             <div style={stylesDivButton} className="mb-3">
    //               <LSButton type="submit" caption={"Iniciar Sesion"} onClick={handleSubmit} className="btn btn-primary mt-3" />
    //             </div>
    //             <div>
    //               {/* Tu formulario de inicio de sesión */}
    //               {/* ... */}

    //               {/* Enlace para redirigir a la página de registro */}
    //               <p>¿No tienes una cuenta? Regístrate <Link to="/Registrarme" onClick={handleRegister}>aquí</Link></p>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
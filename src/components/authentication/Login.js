import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'; // Importar el componente ReCAPTCHA
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap

import { Link } from 'react-router-dom';
import SoftBox from '../controls/SoftBox';
import SoftTypography from '../controls/SoftTypography';
import SoftButton from '../controls/SoftButton';
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [erroriniciosesion, setErrorInicioSesion] = useState('');
  const captcha = useRef(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCaptchaChange = (value) => {
    if (captcha.current.getValue()) {
      console.log('El usuario no es un robot');
      setCaptchaValue(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si el captcha está completado
    //  if (!captchaValue) {
    //   alert('Por favor, complete el captcha');
    //   return;
    // }

    // Validamos los inputs del formulario
    // Si son correctos ya podemos enviar el fomulario, actualizar la Interfaz, etc.

    if (captcha.current.getValue()) {
      console.log('El usuario no es un robot');
      setCaptchaValue(true);
      setIsLoggedIn(true);
      if (username === "123456") {
        setIsLoggedIn(false);
        setErrorInicioSesion('Inicio de sesión fallido. Verifica tus credenciales.');
      }
      else {
        setIsLoggedIn(true);

      }

    } else {
      console.log('Por favor acepta el captcha');
      setCaptchaValue(false);
      setIsLoggedIn(false);
      setErrorInicioSesion('Por favor acepta el captcha');
    }


    // Aquí puedes validar el usuario y la contraseña, por ejemplo, con una petición a tu backend
    // Reemplaza con tu lógica de autenticación




    if (!isLoggedIn) {
      alert(erroriniciosesion);
    }
    else {

      handleLogin(); // Llamar a la función de inicio de sesión
    }


  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Iniciar sesión</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Usuario:</label>
                  <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña:</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LeUHycpAAAAAD5Kga3vKoQEWnyHx0YWNsjDeb2E"
                  onChange={handleCaptchaChange}
                />
                <button type="submit" className="btn btn-primary mt-3">Iniciar sesión</button>
                {/* <Button >Registrarme</Button> */}
                <SoftBox mt={4} mb={1}>
                  {/* <SoftButton variant="gradient" color="info" fullWidth>
                    sign in
                  </SoftButton> */}
                </SoftBox>
                {/* <SoftBox mt={3} textAlign="center">
                  <SoftTypography variant="button" color="text" fontWeight="regular">
                    Don&apos;t have an account?{" "}
                    <SoftTypography
                      component={Link}
                      to="/authentication/sign-up"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign up
                    </SoftTypography>
                  </SoftTypography>
                </SoftBox> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
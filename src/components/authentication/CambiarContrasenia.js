// AcercaDe.js
import React, { useState } from "react";
import * as yup from "yup";
import BasicLayout from "../layauots/BasicLayout";
import { Alert, AlertTitle, Card, Icon, IconButton } from "@mui/material";
import MDBox from "../controls/MDBox";
import MDTypography from "../controls/MDTypography";
import MDInput from "../controls/MDInput";
import MDButton from "../controls/MDButton";
import { Key } from "react-bootstrap-icons";
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import MDProgress from "../controls/MDProgress";
import API_URL from "../../config";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const CambiarContrasenia = () => {

  const navigate = useNavigate();
  const [grabando, setGrabando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [showprogrees, setShowprogrees] = useState(0);
  const [progress, setProgress] = useState(0);

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
  const validationSchema = yup.object().shape({

    pass: yup
      .string()
      .required("la Contraseña actual es requerida"),
    passnueva: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número"
      )
      .required("La contraseña es requerida"),
    passreply: yup
      .string()
      .oneOf([yup.ref("passnueva")], "Las contraseñas deben coincidir")
      .required("La confirmación de contraseña es requerida"),
  });




  const [formData, setFormData] = useState({
    // Inicializa los campos del formulario
    pass: "",
    passnueva: "",
    passreply: "",
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

  const handleSubmit = (event) => {
    setGrabando(false); // Inicia la grabación
   
    procesarFormulario(formData);
  };
  const procesarFormulario = async (data) => {
    try {

      validationSchema.validate(data)
        .then(async (validatedData) => {

          setExito(true);
          setMensaje('');

          try {

            const userLogin = localStorage.getItem('userlogueado');


            validatedData.email = userLogin;


            const response = await fetch(API_URL + "/UsuarioCambioClave", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(validatedData),
            });

            const res = await response.json();

            if (res.rdoAccion) {
              // Manejar respuesta exitosa
              setMensaje("Contraseña cambiada exitosamente!");
              setGrabando(true);

              setTimeout(() => {
                navigate('/Login'); // Redirige a la ruta deseada
              }, 3000); // 3000 milisegundos = 3 segundos



            } else {
              // Manejar errores si la respuesta no es exitosa
              setMensaje(res.rdoAccionDesc);
              setExito(false);
              setGrabando(false);

            }
          } catch (error) {

            setMensaje("Error en la solicitud: la Contraseña no pudo ser cambiada");
            console.log("Error en la solicitud:", error);
            setShowprogrees(0);
            setExito(false);
            setGrabando(false);
          } finally {
            setShowprogrees(0);
          }
        })
        .catch((error) => {

          console.log("Errores de validación:", error.message);
          setExito(false);
          setMensaje(error.message);
          setShowprogrees(0);
          setGrabando(false);
        });
    } catch (error) {
      setMensaje("Error en la solicitud: el usuario no pudo ser registrado");
      console.log("Error en la solicitud:", error);
      setExito(false);
      setGrabando(false);
      setShowprogrees(0);
    } finally {
      setShowprogrees(0);
      setProgress(100);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordNew2, setShowPasswordNew2] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePasswordVisibilityNew = () => {
    setShowPasswordNew((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePasswordVisibilityNew2 = () => {
    setShowPasswordNew2((prevShowPassword) => !prevShowPassword);
  };


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Cambio de Contraseña
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Indique su contraseña actual, luego la nueva y la confirmacion de la
            misma
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2} style={styles.container}>
              <MDInput
                type={showPassword ? 'text' : 'password'}
                name="pass"
                label="Contraseña Actual"
                variant="standard"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                style={styles.passwordInput}
              />
              <IconButton  onClick={handleTogglePasswordVisibility}>
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
            <MDBox mb={2} style={styles.container}>
              <MDInput
                type={showPasswordNew ? 'text' : 'password'}
                name="passnueva"
                label="Nueva Contraseña"
                variant="standard"
                value={formData.passnueva}
                onChange={handleInputChange}
                fullWidth
              />
              <IconButton  onClick={handleTogglePasswordVisibilityNew}>
                {showPasswordNew ? (
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
            <MDBox mb={2} style={styles.container}>
              <MDInput
                type={showPasswordNew2 ? 'text' : 'password'}
                name="passreply"
                label="Repetir Contraseña"
                variant="standard"
                value={formData.passreply}
                onChange={handleInputChange}
                fullWidth
              />
              <IconButton  onClick={handleTogglePasswordVisibilityNew2}>
                {showPasswordNew2 ? (
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

            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={() => {
                  handleSubmit();
                }}
                variant="gradient"
                color="warning"
                endIcon={<Key />}
                fullWidth
                disabled={grabando}
              >
                Cambiar Clave
              </MDButton>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDProgress color="success"
                loading="true"
                value={showprogrees === 0 ? progress : 0}
                display={'true'}
                variant="contained"></MDProgress>

            </MDBox>

            {mensaje !== "" && (
              <Alert severity={exito ? "success" : "error"}>
                <AlertTitle>{exito ? "Felicitaciones" : "Error"}</AlertTitle>
                {mensaje}
              </Alert>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default CambiarContrasenia;

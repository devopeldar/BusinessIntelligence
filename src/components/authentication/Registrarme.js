import React, { useState } from "react";

import * as yup from "yup";
import API_URL from "../../config";

import "./../../index.css";
import { Alert, AlertTitle, Card, Icon, IconButton } from "@mui/material";
import MDTypography from "../controls/MDTypography";
import MDBox from "../controls/MDBox";
import BasicLayout from "../layauots/BasicLayout";

import Register from "@mui/icons-material/ListAlt";
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import { Link } from "react-router-dom";
import MDInput from "../controls/MDInput";
import MDButton from "../controls/MDButton";
import MDProgress from "../controls/MDProgress";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Registrarme = ({ handleLogin }) => {
  const validationSchema = yup.object().shape({
    nombre: yup.string().required("El campo Nombre es requerido"),
    telefono: yup.string().required("El campo Telefono es requerido"),
    email: yup
      .string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
    pass: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número"
      )
      .required("La contraseña es requerida"),
    passreply: yup
      .string()
      .oneOf([yup.ref("pass")], "Las contraseñas deben coincidir")
      .required("La confirmación de contraseña es requerida"),
  });

  const [grabando, setGrabando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);

  const [progress, setProgress] = useState(0);
  const [showprogrees, setShowprogrees] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const navigate = useNavigate();
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

  const [formData, setFormData] = useState({
    // Inicializa los campos del formulario
    nombre: "",
    email: "",
    telefono: "",
    pass: "",
    passreply: "",
    // ... otros campos
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
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePasswordVisibilityNew = () => {
    setShowPasswordNew((prevShowPassword) => !prevShowPassword);
  };
  const handleRegistrarme = () => {
    localStorage.setItem("isRegister", "false");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("isActivarCuenta", "false");
    localStorage.setItem("isForgotPassword", "false");
  };

  const handleSubmit = (event) => {
    setGrabando(true); // Inicia la grabación
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        if (showprogrees === 0) {
          clearInterval(timer);
          return 0;
        }

        const diff = Math.floor(Math.random() + 10);
        return Math.min(oldProgress + diff, oldProgress);
      });
    }, 5000);
    procesarFormulario(formData);
  };

  const procesarFormulario = async (data) => {
    try {
      setLoading(true);
      validationSchema
        .validate(data)
        .then(async (validatedData) => {
          setExito(true);
          setMensaje("Registrando.....");
          setExito(true);
          try {
            const response = await fetch(API_URL + "/UsuarioAlta", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(validatedData),
            });

            const res = await response.json();

            if (res.rdoAccion) {
              // Manejar respuesta exitosa
              setMensaje("¡Usuario Registrado exitosamente!");
              setGrabando(true);

              handleRegistrarme();

              setTimeout(() => {
                navigate("/Confirmacion"); // Redirige a la ruta deseada
              }, 3000); // 3000 milisegundos = 3 segundos
            } else {
              // Manejar errores si la respuesta no es exitosa
              setMensaje(res.rdoAccionDesc);
              setExito(false);
              setGrabando(false);
            }
          } catch (error) {
            setMensaje(
              "Error en la solicitud: el usuario no pudo ser registrado"
            );
            console.log("Error en la solicitud:", error);
            setShowprogrees(0);
            setExito(false);
            setGrabando(false);
          } finally {
            setLoading(false);
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
      setLoading(false);
      setShowprogrees(0);
      setProgress(100);
    }
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
            Complete los datos solicitados para dar de alta su cuenta
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="nombre"
                required
                label="Nombre"
                variant="standard"
                value={formData.nombre}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={1} style={{ display: "flex", gap: "16px" }}>
              <MDInput
                type="text"
                name="telefono"
                required
                label="Telefono"
                variant="standard"
                value={formData.telefono}
                onChange={handleInputChange}
                fullWidth
              />

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
            <MDBox mb={1} style={{ display: "flex", gap: "16px" }}>
            <MDBox mb={2} style={styles.container}>
              <MDInput
                type={showPassword ? 'text' : 'password'}
                name="pass"
                label="Contraseña"
                variant="standard"
                value={formData.pass}
                onChange={handleInputChange}
                fullWidth
              />
              <IconButton onClick={handleTogglePasswordVisibility}>
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
                name="passreply"
                label="Repetir Contraseña"
                variant="standard"
                value={formData.passreply}
                onChange={handleInputChange}
                fullWidth
              />
              <IconButton onClick={handleTogglePasswordVisibilityNew}>
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
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              onClick={() => {
                handleSubmit();
              }}
              variant="gradient"
              color="info"
              endIcon={<Register />}
              disabled={grabando}
              fullWidth
            >
              Registrarse
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Ya tienes una cuenta?{" "}
              <MDTypography
                component={Link}
                to="/Login"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
                onClick={() => {
                  handleRegistrarme();
                }}
              >
                Ir al Inicio
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDProgress
            color="success"
            loading="true"
            label={true}
            value={showprogrees === 0 ? progress : 0}
            display={loading && exito ? "true" : "false"}
            variant="contained"
          ></MDProgress>
        </MDBox>

        {mensaje !== "" && mensaje !== "Registrando....." ? (
          <Alert severity={exito ? "success" : "error"}>
            <AlertTitle>{exito ? "Felicitaciones" : "Error"}</AlertTitle>
            {mensaje}
          </Alert>
        ) : (
          mensaje !== "" && (
            <Alert severity="info">
              <AlertTitle>Procesando Registro</AlertTitle>
              {mensaje}
            </Alert>
          )
        )}
      </MDBox>
    </Card>
    </BasicLayout >
  );
};

export default Registrarme;

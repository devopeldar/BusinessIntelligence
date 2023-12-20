// AcercaDe.js
import React, { useState } from "react";
import * as yup from "yup";
import BasicLayout from "../layauots/BasicLayout";
import { Alert, AlertTitle, Card } from "@mui/material";
import MDBox from "../controls/MDBox";
import MDTypography from "../controls/MDTypography";
import MDInput from "../controls/MDInput";
import MDButton from "../controls/MDButton";
import { Key } from "react-bootstrap-icons";
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import MDProgress from "../controls/MDProgress";
import API_URL from "../../config";
import { useNavigate } from "react-router-dom";
const CambiarContrasenia = () => {
  const navigate = useNavigate();
  const [grabando, setGrabando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [showprogrees, setShowprogrees] = useState(0);
  const [progress, setProgress] = useState(0);
  

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
    setShowprogrees(1);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    setGrabando(false); // Inicia la grabación
    // const timer = setInterval(() => {
    
    //   setProgress((oldProgress) => {
    //     if (oldProgress === 100) {

    //       clearInterval(timer);
    //       return 0;
    //     }
    //     if (showprogrees === 0) {

    //       clearInterval(timer);
    //       return 0;
    //     }

    //     const diff = Math.floor(Math.random() * 10);
    //     return Math.min(oldProgress + diff, 100);
    //   });
    // }, 1000);
    procesarFormulario(formData);
  };
  const procesarFormulario = async (data) => {
    try {
      
      validationSchema.validate(data)
        .then(async (validatedData) => {

          setExito(true);
          setMensaje('');

          try {
            console.log("1111111");
            const userLogin = localStorage.getItem('userlogueado');
            console.log("userLogin", userLogin);

            validatedData.email = userLogin;
            console.log("validatedData", validatedData);

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
            Cambio de Contraseña
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Indique su contraseña actual, luego la nueva y la confirmacion de la
            misma
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="pass"
                label="Contraseña Actual"
                variant="standard"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="passnueva"
                label="Nueva Contraseña"
                variant="standard"
                value={formData.passnueva}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="passreply"
                label="Repetir Contraseña"
                variant="standard"
                value={formData.passreply}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={() => {
                  handleSubmit();
                }}
                variant="gradient"
                color="info"
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

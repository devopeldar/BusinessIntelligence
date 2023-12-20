// AcercaDe.js
import React, { useState } from "react";
import BasicLayout from "../layauots/BasicLayout";
import { Alert, AlertTitle, Card } from "@mui/material";
import MDBox from "../controls/MDBox";
import MDTypography from "../controls/MDTypography";
import MDButton from "../controls/MDButton";
import People from "@mui/icons-material/People";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import { KeyFill } from "react-bootstrap-icons";
import MDInput from "../controls/MDInput";
import API_URL from "../../config";
import * as yup from "yup";
const RecuperarPass = () => {
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState("");

  const [formData, setFormData] = useState({
    // Inicializa los campos del formulario
    email: "",
    // ... otros campos
  });

  const handleInputChange = (event) => {
    // Maneja los cambios en los campos del formulario
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validationSchema = yup.object().shape({
   
    email: yup
      .string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
  });

  const handleSubmit = async (data) => {
    // validationSchema
    //   .validate(data)
    //   .then(async (validatedData) => {
      console.log("formData ", formData);
        try {
          const response = await fetch(API_URL + "/UsuarioRecuperarClave", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const res = await response.json();

          if (res.rdoAccion) {
            console.log("res ", res);
            navigate("/ConfirmacionRecuperoPass");
           
          } else {
            // Manejar errores si la respuesta no es exitosa
            setMensaje(res.rdoAccionDesc);
          }
        } catch (error) {
          setMensaje(
            "Error en la solicitud: No se ha podido generar la recuperacion de la contraseña"
          );
          console.log("Error en la solicitud:", error);
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
            Recupero de Contraseña
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ingresa el correo electrónico con el que te registraste
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
          </MDBox>
        </MDBox>
        <MDBox height="150px" textAlign="center">
          <MDButton variant="gradient" color="success" onClick={() => {
                  handleSubmit();
                }} endIcon={<KeyFill />}>
            Recuperar Contraseña
          </MDButton>
        </MDBox>
        {mensaje !== '' && (
            <Alert severity={"error"}>
              <AlertTitle>{"Error"}</AlertTitle>
              {mensaje}
            </Alert>
          )}
      </Card>
    </BasicLayout>
  );
};

export default RecuperarPass;

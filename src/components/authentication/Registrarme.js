import React, { useState } from "react";

import * as yup from "yup";
import { useFormik } from "formik";
import { css } from "@emotion/react";
import LSButtonRegister from "../controls/Button/LSButtonRegister";
import { BarLoader } from "react-spinners";
import { Form } from "react-bootstrap";
import API_URL from "../../config";

import "./../../index.css";
import { Card } from "@mui/material";
import MDTypography from "../controls/MDTypography";
import MDBox from "../controls/MDBox";
import BasicLayout from "../layauots/BasicLayout";

import Register from "@mui/icons-material/ListAlt";
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import { Link } from "react-router-dom";
import MDInput from "../controls/MDInput";
//import MDButton from  "../controls/MDButton";
import { CheckBox } from "@mui/icons-material";
import MDButton from "../controls/MDButton";
import MDAlert from "../controls/MDAlert";

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

  const [grabando, setGrabando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);

  const [progress, setProgress] = useState(0);
  const [emailuser, setEmailuser] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  // const handleRedirectToLogin = () => {
  //   handleLogin();
  // };

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

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    //event.preventDefault();
    // Llama a un método o función y pasa formData para su procesamiento
    //validationSchema();
    procesarFormulario(formData);
  };

  const procesarFormulario = async (data) => {
    // Realiza acciones con los datos del formulario (por ejemplo, envío a un servidor, validaciones, etc.)
    console.log("Datos del formulario:", data);

    validationSchema
      .validate(data)
      .then((validatedData) => {
        console.log("validatedData:",validatedData);
        console.log(222222);
        console.log("Datos válidos:", validatedData);
        // Realiza acciones con los datos validados si la validación es exitosa
        setExito(true);
        setMensaje('');
        
      })
      .catch((error) => {
        console.log(33333333333);
        console.log("Errores de validación:", error);
        console.log(999999999);
        setExito(false);
        setMensaje(error.message);
        console.log(mensaje);
        if (error.inner) {
          error.inner.forEach(err => {
            console.error(err.message); // Muestra cada mensaje de error individual
          });
        
        }
        // Maneja los errores de validación aquí
      });
      console.log(4444444);
      if(exito)
      {
        console.log(54555555);
        try {
          setLoading(true);
          setGrabando(true); // Inicia la grabación
    
          const response = await fetch(API_URL + "/UsuarioAlta", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          const res = await response.json();
          setExito(res.rdoAccion);
          // Manejar la lógica después de actualizar el perfil
          if (res.rdoAccion) {
            // Manejar respuesta exitosa
    
            setMensaje("¡Usuario Registrado exitosamente!");
            // const newWindow = window.open(`/confirmacion/${values.Email}`);
            // if (newWindow) {
            //   history(`/confirmacion/${values.Email}`);
            // }
            setShowForm(false);
          } else {
            // Manejar errores si la respuesta no es exitosa
            setMensaje(res.rdoAccionDesc);
            setGrabando(true);
          }
        } catch (error) {
          setMensaje("Error en la solicitud el usuario no pudo ser registrado");
          setGrabando(true); // Inicia la grabación
          console.log("Error en la solicitud:" + error);
        } finally {
          setLoading(false);
        }
      }
    // try{

    //   await validationSchema.validate(adjustedData, { abortEarly: false });
    // }
    // catch (validationErrors) {
    //   // Si hay errores de validación, actualiza el estado de errores para mostrarlos en el formulario
    //   const errors = {};
    //   validationErrors.inner.forEach((error) => {
    //     errors[error.path] = error.message;
    //   });

    // }
    

    //};
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
                label="Nombre"
                variant="standard"
                value={formData.nombre}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="telefono"
                label="Telefono"
                variant="standard"
                value={formData.telefono}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                name="email"
                label="Email"
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
                endIcon={<Register />}
                disabled={!grabando}
                fullWidth
              >
                Registrarse
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Ya tienen una cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/Login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Ir al Inicio
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox pt={2} px={2}>
            {mensaje && exito ? (
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  {mensaje}
                </MDTypography>
              </MDAlert>
            ) : (
              mensaje && (
                <MDAlert color="primary" dismissible>
                  <MDTypography variant="body2" color="white">
                    {mensaje}
                  </MDTypography>
                </MDAlert>
              )
            )}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>

    //         {loading && <BarLoader color={'#36D7B7'} loading={loading} />}

    //         {mensaje && (
    //           <div className="alert alert-success mt-3" role="alert">
    //             {mensaje}
    //           </div>
    //         )}
    //       </div>
    //     )}

    //     {!showForm && (
    //       <div className="divconfregistro">
    //         <h2 className='titulomensajeregister'>¡Registro exitoso!</h2>
    //         <p className='mensajeregister'>Felicitaciones <b>{formik.values.Email}</b> por registrarte con éxito. En minutos mas recibiras un correo con instrucciones de como activar tu usuario</p>
    //         <p className='mensajeregister'>Recuerda revisar tu casilla de correo no deseado, si al pasar 10 minutos aun no has recibido</p>
    //         {/* Agrega más contenido según lo necesites */}

    //         <button className="buttonnodal btn btn-primary" onClick={handleLogin} >Comenzar</button>

    //       </div>

    //     )}

    //   </div>
  );
};

export default Registrarme;

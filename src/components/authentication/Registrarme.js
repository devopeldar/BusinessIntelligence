import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import LSButtonRegister from "../controls/Button/LSButtonRegister";
import API_URL from "../../config";
import { css } from '@emotion/react';
import { BarLoader } from 'react-spinners';
import './../../index.css';
import { Card } from "@mui/material";
import MDTypography from "../controls/MDTypography";
import MDBox from "../controls/MDBox";
import BasicLayout from "../layauots/BasicLayout";


import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import { Link } from "react-router-dom";
import MDInput from "../controls/MDInput";
//import MDButton from  "../controls/MDButton";
import { CheckBox } from "@mui/icons-material";

const Registrarme = ({ handleLogin }) => {
  const validationSchema = yup.object().shape({
    Nombre: yup.string().required("El campo Nombre es requerido"),
    Telefono: yup.string().required("El campo Telefono es requerido"),
    Email: yup
      .string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
    Pass: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número"
      )
      .required("La contraseña es requerida"),
    Passreply: yup
      .string()
      .oneOf([yup.ref("Pass")], "Las contraseñas deben coincidir")
      .required("La confirmación de contraseña es requerida"),
  });

  const [grabando, setGrabando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [progress, setProgress] = useState(0);
  const [emailuser, setEmailuser] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  // const handleRedirectToLogin = () => {
  //   handleLogin();
  // };

  const formik = useFormik({
    initialValues: {
      Nombre: "",
      Email: "",
      Telefono: "",
      Pass: "",
      Passreply: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        setLoading(true);
        setGrabando(true); // Inicia la grabación

        const response = await fetch(API_URL + "/UsuarioAlta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const res = await response.json();


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
          setGrabando(true); // Inicia la grabación

        }
      } catch (error) {
        setMensaje("Error en la solicitud el usuario no pudo ser registrado");
        setGrabando(true); // Inicia la grabación
        console.log("Error en la solicitud:" + error);
      }
      finally{
        setLoading(false);

      }
    },
  });
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
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <CheckBox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>W
            </MDBox>
            <MDBox mt={4} mb={1}>
              {/* <MDButton variant="gradient" color="info" fullWidth>
                sign in
              </MDButton> */}
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  // return (
  //   <div id="divRegistro" className="container registerpage">
  //     {showForm && (

  //       <div><h2>Registro de Usuario</h2>
  //         <Form autoComplete="off" onSubmit={formik.handleSubmit}>
  //           <Form.Group controlId="Nombre">
  //             <Form.Label>Nombre:</Form.Label>
  //             <Form.Control
  //               type="text"
  //               name="Nombre"
  //               autoComplete="off"
  //               value={formik.values.Nombre}
  //               onChange={formik.handleChange}
  //               onBlur={formik.handleBlur}
  //               isInvalid={formik.touched.Nombre && !!formik.errors.Nombre}
  //             />
  //             <Form.Control.Feedback type="invalid">
  //               {formik.errors.Nombre}
  //             </Form.Control.Feedback>
  //           </Form.Group>

  //           <Form.Group controlId="Email">
  //             <Form.Label>Email:</Form.Label>
  //             <Form.Control
  //               type="text"
  //               name="Email"
  //               autoComplete="off"
  //               value={formik.values.Email}
  //               onChange={formik.handleChange}
  //               onBlur={formik.handleBlur}
  //               isInvalid={formik.touched.Email && !!formik.errors.Email}
  //             />
  //             <Form.Control.Feedback type="invalid">
  //               {formik.errors.Email}
  //             </Form.Control.Feedback>
  //           </Form.Group>

  //           <Form.Group controlId="Telefono">
  //             <Form.Label>Teléfono:</Form.Label>
  //             <Form.Control
  //               type="text"
  //               name="Telefono"
  //               autoComplete="off"
  //               value={formik.values.Telefono}
  //               onChange={formik.handleChange}
  //               onBlur={formik.handleBlur}
  //               isInvalid={formik.touched.Telefono && !!formik.errors.Telefono}
  //             />
  //             <Form.Control.Feedback type="invalid">
  //               {formik.errors.Telefono}
  //             </Form.Control.Feedback>
  //           </Form.Group>

  //           <Form.Group controlId="Pass">
  //             <Form.Label>Contraseña:</Form.Label>
  //             <Form.Control
  //               type="password"
  //               name="Pass"
  //               autoComplete="off"
  //               value={formik.values.Pass}
  //               onChange={formik.handleChange}
  //               onBlur={formik.handleBlur}
  //               isInvalid={formik.touched.Pass && !!formik.errors.Pass}
  //             />
  //             <Form.Control.Feedback type="invalid">
  //               {formik.errors.Pass}
  //             </Form.Control.Feedback>
  //           </Form.Group>

  //           <Form.Group controlId="Passreply">
  //             <Form.Label>Repetir Contraseña:</Form.Label>
  //             <Form.Control
  //               type="password"
  //               name="Passreply"
  //               autoComplete="off"
  //               value={formik.values.Passreply}
  //               onChange={formik.handleChange}
  //               onBlur={formik.handleBlur}
  //               isInvalid={formik.touched.Passreply && !!formik.errors.Passreply}
  //             />
  //             <Form.Control.Feedback type="invalid">
  //               {formik.errors.Passreply}
  //             </Form.Control.Feedback>
  //           </Form.Group>

  //           <LSButtonRegister
  //             caption={"Registrarse"}
  //             disabled={grabando}
  //             className="buttonnodal btn btn-primary"

  //           />
  //         </Form>
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

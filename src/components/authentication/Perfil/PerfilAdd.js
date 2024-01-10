import React, { useState } from "react";
import API_URL from "../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import BasicLayout from "../../layauots/BasicLayout";
import { Alert, Card } from "react-bootstrap";
import MDBox from "../../controls/MDBox";
import MDTypography from "../../controls/MDTypography";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from "../../controls/MDInput";
//import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import MDProgress from "../../controls/MDProgress";
import { AlertTitle, Checkbox } from "@mui/material";
import MDButton from "../../controls/MDButton";
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";


const PerfilAdd = () => {
  const navigate = useNavigate();

  // const [nombre, setNombre] = useState('');
  // const [activo, setActivo] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    activo: true,
    rdoAccion: false,
    rdoAccionDesc: "",
    cantUsuarios: 0,
    idPerfil: 0,
  });
  // const validationSchema = yup.object().shape({
  //   nombre: yup.string().required("El campo Nombre es requerido"),
  // });

  const [grabando, setGrabando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);

  const [progress, setProgress] = useState(0);
  const [showprogrees, setShowprogrees] = React.useState(0);
  const [loading, setLoading] = useState(false);

  const [nombreboton, setnombreboton] = useState("Cancelar");


  // const handleInputChange = (event) => {
  //   // Maneja los cambios en los campos del formulario
  //   setShowprogrees(1);
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
  console.log("chk :" + event)
    // Verifica si el tipo de campo es un checkbox (para campos booleanos)
    const newValue = type === 'checkbox' ? checked : value;
  
    setShowprogrees(1);
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (event) => {
    setGrabando(false); // Inicia la grabación
    
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 0;
        }
        if (showprogrees === 0) {
          clearInterval(timer);
          return 0;
        }

        const diff = Math.floor(Math.random() * 10);
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);
    procesarFormulario(formData);
  };

  const handleVolver = () => {
    navigate("/Perfil/Perfiles"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  const procesarFormulario = async (data) => {
    try {
      setLoading(true);
      setGrabando(true); // Inicia la grabación
      setnombreboton("Volver");
      const response = await fetch(API_URL + "/PerfilAlta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));

      const res = await response.json();

      if (res.rdoAccion) {
        // Manejar respuesta exitosa
        setMensaje("Perfil Registrado exitosamente!");
        setGrabando(true);
        setLoading(false);
       
      } else {
        // Manejar errores si la respuesta no es exitosa
        setMensaje(res.rdoAccionDesc);
        setExito(false);
        setGrabando(false);
        setLoading(false);
      }
    } catch (error) {
      setMensaje("Error en la solicitud:", error);
      setGrabando(true); // Inicia la grabación
      setnombreboton("Cancelar");
      setLoading(false);
    }
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
            Agregar Perfil!!
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            un perfil permite asignarle permisos de visualizacion o acciones a un usuario
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
            <MDBox mb={2}>
            <MDTypography variant="h17" fontWeight="light" mt={1}>
              Activo
          
              <Checkbox name="activo"
              onChange={handleInputChange}
              checked={formData.activo || false}
           
              >

              </Checkbox> 
             
              {/* <MDInput
                type="checkbox"
                name="activo"
                label="Activo"
                variant="standard"
                value={formData.activo}
                onChange={handleInputChange}
                fullWidth
              /> */}
               </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={() => {
                  handleSubmit();
                }}
                variant="gradient"
                color="warning"
                endIcon={<Save />}
                disabled={grabando}
                fullWidth
              >
                Grabar
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={() => {
                  handleVolver();
                }}
                variant="gradient"
                color="warning"
                endIcon={<ExitToApp />}
                
                fullWidth
              >
                {nombreboton}
              </MDButton>
            </MDBox>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDProgress color="success"
              loading="true"
              label={true}
              value={showprogrees === 0 ? progress : 0}
              display={loading && exito ? 'true' : 'false'}
              variant="contained"></MDProgress>

          </MDBox>
          
          {mensaje !== '' && (
            <Alert severity={exito ? "success" : "error"}>
              <AlertTitle>{exito ? "Felicitaciones" : "Error"}</AlertTitle>
              {mensaje}
            </Alert>
          )}
        </MDBox>
      </Card>
    </BasicLayout>
    // <div className="container mt-4">
    //   <h2>Mantenimiento Perfiles</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label htmlFor="nombre" className="form-label">Nombre:</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="nombre"
    //         name="nombre"
    //         value={formData.nombre}
    //         onChange={handleChange}
    //       />
    //     </div>

    //     <div className="mb-3 form-check">
    //       <input
    //         type="checkbox"
    //         className="form-check-input"
    //         id="activo"
    //         name="activo"
    //         checked={formData.activo}
    //         onChange={handleChange}
    //       />
    //       <label htmlFor="activo" className="form-check-label">Activo</label>
    //     </div>
    //     <div>
    //     <LSButton type="submit" caption={'Guardar Perfil'} disabled={grabando} className="buttonnodal btn btn-primary"></LSButton>
    //     <LSButton type="button" caption={nombreboton} onClick={handleVolver} className="buttonnodal btn btn-danger"></LSButton>
    //     </div>
    //   </form>
    //    {/* Mensaje de grabación */}
    //    {mensaje && (
    //     <div className="alert alert-success mt-3" role="alert">
    //       {mensaje}
    //     </div>
    //   )}
    // </div>
  );
};

export default PerfilAdd;

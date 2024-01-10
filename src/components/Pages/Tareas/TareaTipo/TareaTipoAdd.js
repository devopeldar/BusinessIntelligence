import React, { useState } from "react";
import API_URL from "../../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los es../tilos de Bootstrap
import BasicLayout from "../../../layauots/BasicLayout";
import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import bgImage from "../../../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from "../../../controls/MDInput";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import MDProgress from "../../../controls/MDProgress";
import { Alert, Card, AlertTitle, Checkbox } from "@mui/material";
import MDButton from "../../../controls/MDButton";
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";


const TareaTipoAdd = () => {
  const navigate = useNavigate();

  // const [nombre, setNombre] = useState('');
  // const [activo, setActivo] = useState(false);
  const [formData, setFormData] = useState({
    idTareaTipo : 0,
    nombre: "",
    codigo: "",
    activo: true,
    rdoAccion: false,
    rdoAccionDesc: "",
    cantUsuarios: 0,
    vencimientoDias: 0,
    vencimientoLegal: 0,
    descripcion: ""
  });



  const validationSchema = yup.object().shape({
    nombre: yup.string().required("El campo Nombre es requerido"),
    codigo: yup.string().required("El campo codigo es requerido"),
    vencimientoDias: yup.string().required("El campo Vencimiento en Dias es requerido"),
    vencimientoLegal: yup.string().required("El campo Vencimiento legal es requerido"),
  });

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
    navigate("/TareaTipoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  const procesarFormulario = async (data) => {
    try {
      setLoading(true)
      setGrabando(true); // Inicia la grabación
      setnombreboton("Volver");
      const response = await fetch(API_URL + "/TareaTipoAlta", {
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
        setMensaje("Tipo de Tarea Registrado exitosamente!");
        setGrabando(true);
        setExito(true);
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
            Agregar Tipos de Tarea
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            un Tipo de Tarea permite asignarle un contexto a una tarea determinada
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
              <MDInput
                type="text"
                name="codigo"
                required
                label="Codigo"
                variant="standard"
                value={formData.codigo}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="descripcion"
                required
                label="Descripcion"
                variant="standard"
                value={formData.descripcion}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                name="vencimientodias"
                required
                label="Vencimiento en Dias"
                variant="standard"
                value={formData.vencimientodias}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                name="vencimientolegal"
                required
                label="Vencimiento Legal"
                variant="standard"
                value={formData.vencimientolegal}
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
                color="info"
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
                color="info"
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
   
  );
};

export default TareaTipoAdd;

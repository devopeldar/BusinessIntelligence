import React, { useState } from "react";
import API_URL from "../../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los es../tilos de Bootstrap
import BasicLayout from "../../../layauots/BasicLayout";
import { Alert, Card } from "@mui/material";
import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import bgImage from "../../../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from "../../../controls/MDInput";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import MDProgress from "../../../controls/MDProgress";
import { AlertTitle, Checkbox } from "@mui/material";
import MDButton from "../../../controls/MDButton";
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";


const TareaEstadoAdd = () => {
  const navigate = useNavigate();

  // const [nombre, setNombre] = useState('');
  // const [activo, setActivo] = useState(false);
  const [formData, setFormData] = useState({
    idTareaEstado: 0,
    descripcion: "",
    activo: true,
    esEstadoFinal: true
  });



  const validationSchema = yup.object().shape({
    descripcion: yup.string().required("El campo Descripcion es requerido")
  });

  const [grabando, setGrabando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);

  const [progress, setProgress] = useState(0);
  const [showprogrees, setShowprogrees] = React.useState(0);
  const [loading, setLoading] = useState(false);

  const [nombreboton, setnombreboton] = useState("Volver");

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
    navigate("/TareaEstadoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  const procesarFormulario = async (data) => {
    try {
      setLoading(true);
      validationSchema.validate(data)
        .then(async (validatedData) => {

          setGrabando(true); // Inicia la grabación
          setnombreboton("Volver");
          setExito(true);
          setMensaje('');

          const response = await fetch(API_URL + "/TareaEstadoAlta", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const res = await response.json();

          if (res.rdoAccion) {
            // Manejar respuesta exitosa
            setMensaje("Estado de Tarea Registrado exitosamente!");
            setGrabando(true);
            setExito(true);
          } else {
            // Manejar errores si la respuesta no es exitosa
            setMensaje(res.rdoAccionDesc);
            setExito(false);
            setGrabando(false);
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
      setMensaje("Error en la solicitud:", error);
      setGrabando(true); // Inicia la grabación
      setnombreboton("Cancelar");
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
            Agregar Estado de Tarea
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Un Estado de Tarea permite identificar en que momento del proceso se encuentra la Tarea
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
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

              <Checkbox name="esEstadoFinal"
                onChange={handleInputChange}
                checked={formData.esEstadoFinal || false}

              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                Es Estado Final
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>

              <Checkbox name="activo"
                onChange={handleInputChange}
                checked={formData.activo || false}

              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                Activo
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

export default TareaEstadoAdd;

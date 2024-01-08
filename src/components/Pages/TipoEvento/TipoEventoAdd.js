import React, { useEffect, useState } from "react";
import API_URL from "../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los es../tilos de Bootstrap
import BasicLayout from "../../layauots/BasicLayout";
import { Alert, Autocomplete, Card, TextField } from "@mui/material";
import MDBox from "../../controls/MDBox";
import MDTypography from "../../controls/MDTypography";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from "../../controls/MDInput";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import MDProgress from "../../controls/MDProgress";
import { AlertTitle, Checkbox } from "@mui/material";
import MDButton from "../../controls/MDButton";
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";
import axios from "axios";
import EstadosProgresoTarea from "../../Utils/estadosProgresoTarea";

const TipoEventoAdd = () => {
  const navigate = useNavigate();

  // const [nombre, setNombre] = useState('');
  // const [activo, setActivo] = useState(false);
  const [formData, setFormData] = useState({
    idEventoTipo: 0,
    descripcion: "",
    activo: true,
    idTareaEstado: 0,
    observaciones: "",
    estado:"",
    detiene:false,
    enviaMail:false
  });

  const validationSchema = yup.object().shape({
    descripcion: yup.string().required("El campo descripcion es requerido"),
    idTareaEstado: yup.string().required("El campo Estado es requerido"),
  });

  const estados = Object.values(EstadosProgresoTarea);
  const [grabando, setGrabando] = useState(false);
  
  const [elements, setElements] = useState([]);
  
  const [selectedValue, setSelectedValue] = useState(elements[0]);
  const [selectedValuEestado, setSelectedValueEstado] = useState(estados[0]);
  const [nombreboton, setnombreboton] = useState("Cancelar");
  const [progress, setProgress] = useState(0);
  const [showprogrees, setShowprogrees] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log("chk :" + event);
    // Verifica si el tipo de campo es un checkbox (para campos booleanos)
    const newValue = type === "checkbox" ? checked : value;

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

  useEffect(() => {
    const GetEstadosTareas = async () => {

      const response = await axios.post(API_URL + "/TareaEstadoListar", {
        headers: {
          accept: "application/json",
        },
      });
      console.log("response " + response.data);
      setElements(response.data);
    };
    GetEstadosTareas();
  }, []);

  const handleVolver = () => {
    navigate("/TipoEventoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  const handleAutocompleteChange = (event, value) => {
    setSelectedValue(value);
  };

  const handleAutocompleteEstadoChange = (event, value) => {
    setSelectedValueEstado(value);
  };

  const procesarFormulario = async (data) => {
    try {
      setLoading(true);

      data.idTareaEstado = selectedValue.idTareaEstado;
      data.estado = selectedValuEestado.valor;
      validationSchema
        .validate(data)
        .then(async (validatedData) => {
          setGrabando(true); // Inicia la grabación
          setnombreboton("Volver");
          setExito(true);
          setMensaje("");

          console.log("formData " + JSON.stringify(formData))

          const response = await fetch(API_URL + "/EventoTipoAlta", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),

          });

          const res = await response.json();

          if (res.rdoAccion) {
            // Manejar respuesta exitosa
            setMensaje("El Tipo de Evento ha sido Registrado exitosamente!");
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
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="primary"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Agregar Tipo de Evento
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Un Tipo de Evento especifica un estado que la tarea tendra.
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
              <Autocomplete
                onChange={handleAutocompleteChange}
                options={elements}

                getOptionLabel={(option) => option.descripcion}
                getOptionDisabled={(option) => option.activo === false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione Estado de Tarea"
                    variant="outlined"
                  />
                )}
              />
            </MDBox>
            <MDBox mb={2}>
              <Autocomplete
                options={estados}
                getOptionLabel={(option) => option.descripcion}
                value={selectedValuEestado}
                onChange={handleAutocompleteEstadoChange}
                renderInput={(params) => (
                  <TextField {...params} label="Selecciona Estado de Progreso" variant="outlined" />
                )}
              />

            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="text"
                name="observaciones"
                required
                label="Observaciones"
                variant="standard"
                value={formData.observaciones}
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <Checkbox
                name="enviaMail"
                onChange={handleInputChange}
                checked={formData.enviaMail || false}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Envia Mail
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <Checkbox
                name="detiene"
                onChange={handleInputChange}
                checked={formData.detiene || false}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Detiene Tarea
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <Checkbox
                name="activo"
                onChange={handleInputChange}
                checked={formData.activo || false}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Activo
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={() => {
                  handleSubmit();
                }}
                variant="gradient"
                color="primary"
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
                color="primary"
                endIcon={<ExitToApp />}
                fullWidth
              >
                {nombreboton}
              </MDButton>
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

          {mensaje !== "" && (
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

export default TipoEventoAdd;

// EditarTipoEvento.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasicLayout from "../../layauots/BasicLayout";
import { Card } from "react-bootstrap";
import MDBox from "../../controls/MDBox";
import MDTypography from "../../controls/MDTypography";
import MDInput from "../../controls/MDInput";
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";
import MDButton from "../../controls/MDButton";
import * as yup from "yup";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Checkbox,
  TextField,
} from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDProgress from "../../controls/MDProgress";

const EventoTareaAdd = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL (el ID del TipoEvento a editar)
  const [elements, setElements] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [nombreboton, setnombreboton] = useState("Volver");
  const [mensaje, setMensaje] = useState("");
  const history = useNavigate();
  const [grabando, setGrabando] = useState(false);
  const [exito, setExito] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [showprogrees, setShowprogrees] = React.useState(0);
  const [loading, setLoading] = useState(false);
  //const [idEventoTipo, setIdEventoTipo] = useState(0);
  const [idTarea, setIdTarea] = useState(0);
  const handleVolver = () => {
    history("/TareaListVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

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
  const [formData, setFormData] = useState({
    idEventoTipo: 0,
    observaciones: "",
    idUsuario: 0,
    idTarea: id,
    enviaMailCliente: false
  });

  const validationSchema = yup.object().shape({
    observaciones: yup
      .string()
      .required("Indique una descripcion indicando detalles del evento"),
    idEventoTipo: yup
      .string()
      .required("Indique el Tipo de Evento que esta intentando realizar"),
  });

  useEffect(() => {
    setIdTarea(id);
    // Aquí realizas la llamada a tu API para obtener el TipoEvento específico por su ID
    const GetEventoTipo = async () => {
      const response = await axios.post(API_URL + "/EventoTipoListar", {
        headers: {
          accept: "application/json",
        },
      });

      setElements(response.data);
      if (response.data && response.data.length > 0) {
        setSelectedValue(response.data[0]); // Establecer el primer elemento como valor seleccionado
      }
    };
    GetEventoTipo();
  }, [id]);

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

  const procesarFormulario = async (data) => {
    try {
      setLoading(true);

      data.idEventoTipo = selectedValue.idEventoTipo;
      data.idTarea = idTarea;
      data.idUsuario = localStorage.getItem('iduserlogueado');
      validationSchema
        .validate(data)
        .then(async (validatedData) => {
          setGrabando(true); // Inicia la grabación
          setnombreboton("Volver");
          setExito(true);
          setMensaje("");

          console.log("formData " + JSON.stringify(formData));

          const response = await fetch(API_URL + "/EventoAlta", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const res = await response.json();

          if (res.rdoAccion) {
            // Manejar respuesta exitosa
            setMensaje("El Evento ha sido Registrado exitosamente!");
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

  const handleAutocompleteChange = (event, value) => {
    setSelectedValue(value);
    //setIdEventoTipo(value.idEventoTipo);
    setDescripcion(value.observaciones);
    console.log("value ", value);
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Agregar Evento
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Esta accion influye sobre la tarea seleccionada
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Autocomplete
                options={elements}
                getOptionLabel={(option) => option.descripcion}
                value={selectedValue}
                disableClearable={true}
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona Tipo Evento"
                    variant="outlined"
                  />
                )}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                multiline
                type="text"
                name="detalleTipoEvento"
                label="Detalle Tipo Evento"
                variant="standard"
                value={descripcion}
                disabled
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                multiline
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
                name="enviaMailCliente"
                onChange={handleInputChange}
                checked={formData.enviaMailCliente || false}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Envia Mail Cliente
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

export default EventoTareaAdd;

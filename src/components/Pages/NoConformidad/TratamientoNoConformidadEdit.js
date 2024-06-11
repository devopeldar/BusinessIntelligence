// EditarCliente.js
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
import { Email, ExitToApp } from "@mui/icons-material";
import MDButton from "../../controls/MDButton";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Checkbox,
  TextField,
} from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import SituacionImpositiva from "../../Utils/SituacionImpositiva";

const TratamientoNoConformidadEdit = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL (el ID del Cliente a editar)
  const [NoConformidadDetalle, setNoConformidadDetalle] = useState(null);
  const [idNoConformidadDetalle, setidNoConformidadDetalle] = useState("");
  const [activo, setActivo] = useState(false);
  const [elementsCausa, setElementsCausa] = useState([]);
  const [elementsCorrectiva, setElementsCorrectiva] = useState([]);
  const [elementsInmediata, setElementsInmediata] = useState([]);
  const [observacionesCausa, setObservacionesCausa] = useState("");
  const [observacionesCorrectiva, setObservacionesCorrectiva] = useState("");
  const [observacionesInmediata, setObservacionesInmediata] = useState("");

  const [nombreboton, setnombreboton] = useState("Cancelar");
  const [mensaje, setMensaje] = useState("");
  const history = useNavigate();
  const [grabando, setGrabando] = useState(false);
  const [exito, setExito] = useState(false);
  const [selectedValueCausa, setSelectedValueCausa] = useState("");
  const [selectedValueInmediata, setSelectedValueInmediata] = useState("");
  const [selectedValueCorrectiva, setSelectedValueCorrectiva] = useState("");

  const handleVolver = () => {
    history("/ClienteVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  useEffect(() => {
    setidNoConformidadDetalle(id);
    // Aquí realizas la llamada a tu API para obtener el Cliente específico por su ID
    const GetNoConformidadDetalleAccion = async () => {
      try {
        const reqNoConformidadDetalleAcciones = {
          idNoConformidadDetalle: idNoConformidadDetalle,
        };

        const response = await axios.post(
          API_URL + `/NoConformidadDetalleAccionesListar`,
          reqNoConformidadDetalleAcciones,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        //[
        //   {
        //     "idNoConformidadDetalleAcciones": 13,
        //     "idNoConformidadDetalle": 8,
        //     "idNoConformidadAccionTipo": 1,
        //     "idNoConformidadAccion": 1,
        //     "observacion": "observaciones de CAUSA IDTarea 312",
        //     "rdoAccion": false,
        //     "rdoAccionDesc": "",
        //     "accionTipo": "Analisis Causa",
        //     "accion": "Causa: Cliente no entrega a tiempo documentacion"
        //   },
        //   {
        //     "idNoConformidadDetalleAcciones": 14,
        //     "idNoConformidadDetalle": 8,
        //     "idNoConformidadAccionTipo": 2,
        //     "idNoConformidadAccion": 2,
        //     "observacion": "observaciones de Accion Inmediata IDTarea 312",
        //     "rdoAccion": false,
        //     "rdoAccionDesc": "",
        //     "accionTipo": "Accion Inmediata",
        //     "accion": "Accion Inmediata: enviar whatapp o telef"
        //   },
        //   {
        //     "idNoConformidadDetalleAcciones": 15,
        //     "idNoConformidadDetalle": 8,
        //     "idNoConformidadAccionTipo": 3,
        //     "idNoConformidadAccion": 15,
        //     "observacion": "observaciones de Accion Correctiva IDTarea 312",
        //     "rdoAccion": false,
        //     "rdoAccionDesc": "",
        //     "accionTipo": "Accion Correctiva",
        //     "accion": "Prueba de Cargas"
        //   }
        // ]

       
          setNoConformidadDetalle(data);
          const data = response.data.map((item) => {
            if (item.idNoConformidadAccion === 1) {
              setObservacionesCausa(item.observacion);
            }
            if (item.idNoConformidadAccion === 2) {
              setObservacionesCorrectiva(item.observacion);
            }
            if (item.idNoConformidadAccion === 3) {
              setObservacionesInmediata(item.observacion);
            }
          });
         
      
        
      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetNoConformidadDetalleAccion();
  }, [id]);

  const handleSubmit = async (event) => {
    try {
      if (observacionesCausa === "") {
        setMensaje("El campo Observaciones Causa es obligatorio");
        setExito(false);
        return;
      }
      if (observacionesCorrectiva === "") {
        setMensaje("El campo Observaciones Correctiva es obligatorio");
        setExito(false);
        return;
      }
      if (observacionesInmediata === "") {
        setMensaje("El campo Observaciones Inmediata es obligatorio");
        setExito(false);
        return;
      }

      setGrabando(true); // Inicia la grabación
      setnombreboton("Volver");
      setExito(true);
      setMensaje("");
      // Aquí realizas la llamada a tu API para actualizar el Cliente con los nuevos datos

      const response = await fetch(API_URL + `/ClienteModificacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCliente,
          nombre,
          contacto,
          telefono,
          email,
          cuit,
          tipoIVA,
          observaciones,
          activo,
        }),
      });

      const res = await response.json();

      if (res.rdoAccion) {
        // Manejar respuesta exitosa
        setMensaje("¡Datos actualizados exitosamente!");
        setGrabando(true);
      } else {
        // Manejar errores si la respuesta no es exitosa
        setMensaje(res.rdoAccionDesc);
        setGrabando(false); // Inicia la grabación
        setnombreboton("Cancelar");
        setExito(false);
      }
    } catch (error) {
      setMensaje("Error en la solicitud:", error);
      setGrabando(true); // Inicia la grabación
      setExito(false);
      setnombreboton("Cancelar");
      console.log("Error en la solicitud:" + error);
    }
  };
  const handleAutocompleteChangeCausa = (event, value) => {
    setSelectedValueCausa(value);
  };
  const handleAutocompleteChangeCorrectiva = (event, value) => {
    setSelectedValueCorrectiva(value);
  };
  const handleAutocompleteChangeInmediata = (event, value) => {
    setSelectedValueInmediata(value);
  };

  if (!NoConformidadDetalle) {
    return (
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="secondary"
            borderRadius="lg"
            coloredShadow="secondary"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Cargando No conformidades...
            </MDTypography>
          </MDBox>
        </Card>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="secondary"
          borderRadius="lg"
          coloredShadow="secondary"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Editar No Conformidades
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Especificar carateristicas de las acciones a tomar para futuras
            tareas con el mismo formato
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Autocomplete
                onChange={handleAutocompleteChangeCausa}
                // onChange={(event, newValue) => {
                //     setSelectedValue(newValue);
                // }}
                options={elementsCausa}
                value={selectedValueCausa}
                getOptionLabel={(option) => option.descripcion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione Causa"
                    variant="outlined"
                  />
                )}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="observacionesCausa"
                required
                label="Observaciones: Causa"
                variant="standard"
                value={observacionesCausa}
                onChange={(e) => setObservacionesCausa(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <Autocomplete
                onChange={handleAutocompleteChangeCorrectiva}
                // onChange={(event, newValue) => {
                //     setSelectedValue(newValue);
                // }}
                options={elementsCorrectiva}
                value={selectedValueCorrectiva}
                getOptionLabel={(option) => option.descripcion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione Accion Correctiva"
                    variant="outlined"
                  />
                )}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="observacionesCorrectiva"
                required
                label="Observaciones: Accion Correctiva"
                variant="standard"
                value={observacionesCorrectiva}
                onChange={(e) => setObservacionesCorrectiva(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <Autocomplete
                onChange={handleAutocompleteChangeInmediata}
                // onChange={(event, newValue) => {
                //     setSelectedValue(newValue);
                // }}
                options={elementsInmediata}
                value={selectedValueInmediata}
                getOptionLabel={(option) => option.descripcion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione Accion Inmediata"
                    variant="outlined"
                  />
                )}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="observacionesInmediata"
                required
                label="Observaciones: Accion Inmediata"
                variant="standard"
                value={observacionesInmediata}
                onChange={(e) => setObservacionesInmediata(e.target.value)}
                fullWidth
              />
            </MDBox>

            <MDBox mb={1} style={{ display: "flex", gap: "16px" }}>
              <MDButton
                onClick={() => {
                  handleSubmit();
                }}
                variant="gradient"
                color="secondary"
                endIcon={<Save />}
                disabled={grabando}
                fullWidth
              >
                Grabar
              </MDButton>

              <MDButton
                onClick={() => {
                  handleVolver();
                }}
                variant="gradient"
                color="secondary"
                endIcon={<ExitToApp />}
                fullWidth
              >
                {nombreboton}
              </MDButton>
            </MDBox>
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

export default TratamientoNoConformidadEdit;

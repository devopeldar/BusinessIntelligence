// EditarNoConformidadAccion.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../../../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasicLayout from "../../../layauots/BasicLayout";
import { Card } from "react-bootstrap";
import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import MDInput from "../../../controls/MDInput";
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";
import MDButton from "../../../controls/MDButton";
import { Alert, AlertTitle, Autocomplete, TextField } from "@mui/material";
import bgImage from "../../../../assets/images/bg-sign-up-cover.jpeg";

const NoConformidadAccionEdit = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL (el ID del NoConformidadAccion a editar)
  const [NoConformidadAccion, setNoConformidadAccion] = useState(null);
  const [idNoConformidadAccion, setidNoConformidadAccion] = useState("");
  const [accion, setAccion] = useState("");
  const [idNoConformidadAccionTipo, setIdNoConformidadAccionTipo] = useState(0);

  const [nombreboton, setnombreboton] = useState("Cancelar");
  const [mensaje, setMensaje] = useState("");
  const history = useNavigate();
  const [grabando, setGrabando] = useState(false);
  const [exito, setExito] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [accionesTipo, setAccionesTipo] = useState(null);
  const handleVolver = () => {
    history("/NoConformidadAccionVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  useEffect(() => {
    const GetAccionesTipo = async () => {
      if (NoConformidadAccion) {
        const response = await axios.post(API_URL + "/NoConformidadAccionTipoListar", {
          headers: {
            accept: "application/json",
          },
        });

        setAccionesTipo(response.data);
        const defaultValueId = NoConformidadAccion.idNoConformidadAccionTipo; // ID del elemento que deseas seleccionar por defecto
        const defaultValue = response.data.find(item => item.idNoConformidadAccionTipo === defaultValueId);
        setSelectedValue(defaultValue);
      };
    }
    GetAccionesTipo();
  }, [NoConformidadAccion]);

  useEffect(() => {
    setidNoConformidadAccion(id);
    // Aquí realizas la llamada a tu API para obtener el NoConformidadAccion específico por su ID
    const GetNoConformidadAccion = async () => {
      try {

        const reqNoConformidadAccion = {
          idNoConformidadAccion: id
        };

        const response = await axios.post(API_URL + `/NoConformidadAccionGetByID`, reqNoConformidadAccion, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = response.data;
        setNoConformidadAccion(data);
        setAccion(data.accion);
        setIdNoConformidadAccionTipo(data.idNoConformidadAccionTipo);


      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetNoConformidadAccion();
  }, [id]);



  const handleSubmit = async (event) => {

    try {

      if (accion === '') {
        setMensaje("El campo accion es obligatorio");
        setExito(false);
        return;
      }

      if (accionesTipo === 0) {
        setMensaje("El campo Tipo de Accion es obligatorio");
        setExito(false);
        return;
      }
      setGrabando(true); // Inicia la grabación
      setnombreboton("Volver");
      setExito(true);
      setMensaje('');
      // Aquí realizas la llamada a tu API para actualizar el NoConformidadAccion con los nuevos datos

      const response = await fetch(API_URL + `/NoConformidadAccionModificacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idNoConformidadAccion, accion, idNoConformidadAccionTipo }),
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
  const handleAutocompleteChange = (event, value) => {
    setSelectedValue(value);
  };


  if (!NoConformidadAccion) {

    return <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="secondary"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Cargando Accion de Conformidad...
          </MDTypography>
        </MDBox>

      </Card>
    </BasicLayout>
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="secondary"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Editar Accion de Conformidad
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Las Acciones de no Conformidad sirven para calificar una Tarea que no termino en un estado optimo
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={3} px={3}>
          <MDBox component="form" role="form">

            <MDBox mb={2}>
              <MDInput
                type="text"
                name="accion"
                required
                label="Accion"
                variant="standard"
                value={accion}
                onChange={(e) => setAccion(e.target.value)}
                fullWidth
              />
            </MDBox>

            <MDBox mb={2}>
              <Autocomplete
                options={accionesTipo}
                getOptionLabel={(option) => option.accionTipo}
                value={selectedValue}
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione Tipo de Accion"
                    variant="outlined"
                  />
                )}
              />
            </MDBox>

            <MDBox mb={2} style={{ display: "flex", gap: "16px", marginTop: "15px" }}>
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
          {/* <MDBox mt={4} mb={1}>
            <MDProgress color="success"
              loading="true"
              label={true}
              value={showprogrees === 0 ? progress : 0}
              display={loading && exito ? 'true' : 'false'}
              variant="contained"></MDProgress>

          </MDBox> */}

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

export default NoConformidadAccionEdit;
// EditarTareaTipo.js
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
import { Alert, AlertTitle, Checkbox } from "@mui/material";
import bgImage from "../../../../assets/images/bg-sign-up-cover.jpeg";

const TareaTipoEdit = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL (el ID del TareaTipo a editar)
  const [TareaTipo, setTareaTipo] = useState(null);
  const [idTareaTipo, setidTareaTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [activo, setActivo] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [vencimientoDias, setVencimientoDias] = useState(0);
  const [vencimientoLegal, setVencimientoLegal] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [nombreboton, setnombreboton] = useState("Cancelar");
  const [mensaje, setMensaje] = useState("");
  const history = useNavigate();
  const [grabando, setGrabando] = useState(false);

  const handleVolver = () => {
    history("/TareaTipoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  useEffect(() => {
    setidTareaTipo(id);
    // Aquí realizas la llamada a tu API para obtener el TareaTipo específico por su ID
    const GetTareaTipo = async () => {
      try {
        const reqTareaTipo = {
          idTareaTipo: id
        };
    
        const response = await axios.post(API_URL + `/TareaTipoGetByID`, reqTareaTipo, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = response.data;
        setTareaTipo(data);
        setNombre(data.nombre);
        setCodigo(data.codigo);
        setVencimientoDias(data.vencimientoDias);
        setVencimientoLegal(data.vencimientoLegal);
        setDescripcion(data.descripcion);
        setActivo(data.activo);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetTareaTipo();
  }, [id]);

  const handleSubmit = async (event) => {
    
    try {
      setGrabando(true); // Inicia la grabación
      setnombreboton("Volver");

      // Aquí realizas la llamada a tu API para actualizar el TareaTipo con los nuevos datos
      const response = await fetch(API_URL + `/TareaTipoModificacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idTareaTipo, nombre, activo }),
      });
      const res = await response.json();

      console.log(res.rdoAccion);
      // Manejar la lógica después de actualizar el TareaTipo
      if (res.rdoAccion) {
        // Manejar respuesta exitosa
        setMensaje("¡Datos actualizados exitosamente!");
      } else {
        // Manejar errores si la respuesta no es exitosa
        setMensaje(res.rdoAccionDesc);
        setGrabando(true); // Inicia la grabación
        setnombreboton("Cancelar");
      }
    } catch (error) {
      setMensaje("Error en la solicitud:", error);
      setGrabando(true); // Inicia la grabación
      setnombreboton("Cancelar");
      console.log("Error en la solicitud:" + error);
    }
  };

  if (!TareaTipo) {
    return <div>Cargando Tipo de Tarea...</div>;
  }

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
            Editar Tipo Tarea
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            un Tipo de Tarea permite asignarle especificaciones a una tarea
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
                value={nombre}
             onChange={(e) => setNombre(e.target.value)}
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
                value={codigo}
             onChange={(e) => setCodigo(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="descripcion"
                required
                label="Observaciones"
                variant="standard"
                value={descripcion}
             onChange={(e) => setDescripcion(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="vencimientoDias"
                required
                label="Vencimiento en Dias"
                variant="standard"
                value={vencimientoDias}
             onChange={(e) => setVencimientoDias(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="vencimientoLegal"
                required
                label="Vencimiento Legal"
                variant="standard"
                value={vencimientoLegal}
             onChange={(e) => setVencimientoLegal(e.target.value)}
                fullWidth
              />
            </MDBox>
           
            <MDBox mb={2}>
            <MDTypography variant="h17" fontWeight="light" mt={1}>
              Activo
          
              <Checkbox name="activo"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
     
              >

              </Checkbox> 
     
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
          {/* <MDBox mt={4} mb={1}>
            <MDProgress color="success"
              loading="true"
              label={true}
              value={showprogrees === 0 ? progress : 0}
              display={loading && exito ? 'true' : 'false'}
              variant="contained"></MDProgress>

          </MDBox> */}
          
          {mensaje !== '' && (
            <Alert severity={"success"}>
              <AlertTitle>{"Aviso" }</AlertTitle>
              {mensaje}
            </Alert>
          )}
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default TareaTipoEdit;

// EditarPerfil.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../../../config";
import { useNavigate } from "react-router-dom";
import LSButton from "../../controls/Button/LSButton";
import axios from "axios";
import BasicLayout from "../../layauots/BasicLayout";
import { Card } from "react-bootstrap";
import MDBox from "../../controls/MDBox";
import MDTypography from "../../controls/MDTypography";
import MDInput from "../../controls/MDInput";
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";
import MDButton from "../../controls/MDButton";
import { Alert, AlertTitle, Checkbox } from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDProgress from "../../controls/MDProgress";

const PerfilEdit = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL (el ID del perfil a editar)
  const [perfil, setPerfil] = useState(null);
  const [idperfil, setidperfil] = useState("");
  const [nombre, setNombre] = useState("");
  const [activo, setActivo] = useState(false);
  const [nombreboton, setnombreboton] = useState("Cancelar");
  const [mensaje, setMensaje] = useState("");
  const history = useNavigate();
  const [grabando, setGrabando] = useState(false);

  const handleVolver = () => {
    history("/Perfil/Perfiles"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  useEffect(() => {
    setidperfil(id);
    // Aquí realizas la llamada a tu API para obtener el perfil específico por su ID
    const GetPerfil = async () => {
      try {
        const reqperfil = {
          idperfil: id
        };
    
        const response = await axios.post(API_URL + `/PerfilGetByID`, reqperfil, {
          headers: {
            "Content-Type": "application/json"
          }
        });
    
        console.log("response", response);
    
        const data = response.data;
        setPerfil(data);
        setNombre(data.nombre);
        setActivo(data.activo);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetPerfil();
  }, [id]);

  const handleSubmit = async (event) => {
    
    try {
      setGrabando(true); // Inicia la grabación
      setnombreboton("Volver");

      // Aquí realizas la llamada a tu API para actualizar el perfil con los nuevos datos
      const response = await fetch(API_URL + `/PerfilModificacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idperfil, nombre, activo }),
      });
      const res = await response.json();

      console.log(res.rdoAccion);
      // Manejar la lógica después de actualizar el perfil
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

  if (!perfil) {
    return <div>Cargando perfil...</div>;
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
            Editar Perfil
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
                value={nombre}
             onChange={(e) => setNombre(e.target.value)}
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
    // <div className="container mt-4">
    //   <h2>Editar Perfil</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label htmlFor="nombre" className="form-label">
    //         Nombre:
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="nombre"
    //         value={nombre}
    //         onChange={(e) => setNombre(e.target.value)}
    //       />
    //     </div>
    //     <div className="mb-3 form-check">
    //       <input
    //         type="checkbox"
    //         className="form-check-input"
    //         id="activo"
    //         checked={activo}
    //         onChange={(e) => setActivo(e.target.checked)}
    //       />
    //       <label htmlFor="activo" className="form-check-label">
    //         Activo
    //       </label>
    //     </div>
    //     <div>
    //       <LSButton
    //         caption="Guardar Cambios"
    //         type="submit"
    //         className="buttonnodal btn btn-primary"
    //       ></LSButton>
    //       <LSButton
    //         type="button"
    //         caption={nombreboton}
    //         onClick={handleVolver}
    //         className="buttonnodal btn btn-danger"
    //       ></LSButton>
    //     </div>
    //   </form>
    //   {/* Mensaje de grabación */}
    //   {mensaje && (
    //     <div className="alert alert-success mt-3" role="alert">
    //       {mensaje}
    //     </div>
    //   )}
    // </div>
  );
};

export default PerfilEdit;

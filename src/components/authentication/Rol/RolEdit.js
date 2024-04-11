// EditarRol.js
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
import { Alert, AlertTitle, Checkbox } from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";


const RolEdit = () => {
    const { id } = useParams(); // Obtener el parámetro de la URL (el ID del Rol a editar)
    const [Rol, setRol] = useState(null);
    const [idRol, setidRol] = useState("");
    const [activo, setActivo] = useState(false);
    const [requerido, setRequerido] = useState(false);
    const [descripcion, setNombre] = useState("");
    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [mensaje, setMensaje] = useState("");
    const history = useNavigate();
    const [grabando, setGrabando] = useState(false);
    const [exito, setExito] = useState(false);

    const [iniciar, setIniciar] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [modificar, setModificar] = useState(false);
    const [modificarrol, setModificarRol] = useState(false);
    const [vertraking, setVerTraking] = useState(false);
    const [subirarchivos, setSubirArchivo] = useState(false);
    const [cargaeventos, setCargaEventos] = useState(false);

    const handleVolver = () => {
        history("/RolVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    useEffect(() => {
        setidRol(id);
        // Aquí realizas la llamada a tu API para obtener el Rol específico por su ID
        const GetRol = async () => {
            try {
                const reqRol = {
                    idRol: id
                };

                const response = await axios.post(API_URL + `/RolGetByID`, reqRol, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = response.data;
               
                setRol(data);
                setNombre(data.descripcion);
                setActivo(data.activo);
                setRequerido(data.requerido);

                response.data.acciones.forEach((accion) => {
                    console.error("accion:", accion);
                    actualizarEstadoPorTareaAccion(accion.tareaAccion, accion.permitido);
                });

                

            } catch (error) {
                console.error("Error:", error);
            }
        };
        GetRol();
    }, [id]);


     const actualizarEstadoPorTareaAccion = (tareaAccion, permitido) => {
        switch (tareaAccion) {
            case 1:
                setIniciar(permitido);
                break;
            case 2:
                setEliminar(permitido);
                break;
            case 3:
                setModificar(permitido);
                break;
            case 7:
                setModificarRol(permitido);
            case 8:
                setVerTraking(permitido);
            case 6:
                setSubirArchivo(permitido);
                break;
            case 5:
                setCargaEventos(permitido);
                break;
            // Agregar más casos según sea necesario
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {

        try {

            if (descripcion === '') {
                setMensaje("El campo descripcion es obligatorio");
                setExito(false);
                return;
            }
            setGrabando(true); // Inicia la grabación
            setnombreboton("Volver");
            setExito(true);
            setMensaje('');
            // Aquí realizas la llamada a tu API para actualizar el Rol con los nuevos datos
            const response = await fetch(API_URL + `/RolModificacion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idRol, descripcion, activo, requerido, iniciar,eliminar,modificar,modificarrol,vertraking,subirarchivos,cargaeventos }),
            });
            const res = await response.json();

            if (res.rdoAccion) {
                // Manejar respuesta exitosa
                setMensaje("¡Datos actualizados exitosamente!");
            } else {
                // Manejar errores si la respuesta no es exitosa
                setMensaje(res.rdoAccionDesc);
                setGrabando(true); // Inicia la grabación
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

    if (!Rol) {
        return <BasicLayout image={bgImage}>
        <Card style={{    width: "157%" }}>
           <MDBox
               variant="gradient"
               bgColor="warning"
               borderRadius="lg"
               coloredShadow="primary"
               mx={2}
               mt={-3}
               p={3}
               mb={1}
               textAlign="center"
           >
               <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                   Cargando Roles...
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
                    bgColor="warning"
                    borderRadius="lg"
                    coloredShadow="warning"
                    mx={2}
                    mt={-3}
                    p={3}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Editar Rol
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                    Un Rol especifica el papel que tiene un usuario en la tarea que fue asignado
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
                                value={descripcion}
                                onChange={(e) => setNombre(e.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>

                            <Checkbox name="requerido"
                                onChange={(e) => setRequerido(e.target.checked)}
                                checked={requerido}

                            />
                            <MDTypography
                                variant="button"
                                fontWeight="regular"
                                color="text"
                                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                            >
                                &nbsp;&nbsp;Requerido
                            </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>

                            <Checkbox name="activo"
                                onChange={(e) => setActivo(e.target.checked)}
                                checked={activo}

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
                        <MDBox mb={2}>

                        <Checkbox name="iniciar"
                            onChange={(e) => setIniciar(e.target.checked)}
                            checked={iniciar}

                        />
                        
                            <MDTypography
                            variant="button"
                            fontWeight="regular"
                            color="text"
                            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                            >
                            &nbsp;&nbsp;Iniciar

                        </MDTypography>

                        <Checkbox name="eliminar"
                             onChange={(e) => setEliminar(e.target.checked)}
                            checked={eliminar}

                        />
                        <MDTypography
                            variant="button"
                            fontWeight="regular"
                            color="text"
                            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                        >
                            &nbsp;&nbsp;Eliminar
                        
                        </MDTypography>
                        <Checkbox name="modificar"
                             onChange={(e) => setModificar(e.target.checked)}
                            checked={modificar}
                            
                        />
                        <MDTypography
                            variant="button"
                            fontWeight="regular"
                            color="text"
                            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                        >
                            &nbsp;&nbsp;Modificar
                        
                        </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                        <Checkbox name="modificarrol"
                             onChange={(e) => setModificarRol(e.target.checked)}
                            checked={modificarrol}

                        />
                        <MDTypography
                            variant="button"
                            fontWeight="regular"
                            color="text"
                            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                        >
                            &nbsp;&nbsp;Mod. Roles
                        
                        </MDTypography>
                        <Checkbox name="cargaeventos"
                             onChange={(e) => setCargaEventos(e.target.checked)}
                            checked={cargaeventos}

                        />
                        <MDTypography
                            variant="button"
                            fontWeight="regular"
                            color="text"
                            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                        >
                            &nbsp;&nbsp;Cargar Eventos
                        
                        </MDTypography>
                        <Checkbox name="vertraking"
                             onChange={(e) => setVerTraking(e.target.checked)}
                            checked={vertraking}

                        />
                        <MDTypography
                            variant="button"
                            fontWeight="regular"
                            color="text"
                            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                        >
                            &nbsp;&nbsp;Ver Traking
                        
                        </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                        
                        <Checkbox name="subirarchivos"
                             onChange={(e) => setSubirArchivo(e.target.checked)}
                            checked={subirarchivos}

                        />
                        <MDTypography
                            variant="button"
                            fontWeight="regular"
                            color="text"
                            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                        >
                            &nbsp;&nbsp;Subir Archivos
                        
                        </MDTypography>
                        </MDBox>

                        <MDBox mb={1} style={{ display: "flex", gap: "16px" }}>
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

export default RolEdit;

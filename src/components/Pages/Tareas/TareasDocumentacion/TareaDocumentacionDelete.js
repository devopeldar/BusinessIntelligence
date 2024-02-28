// EditarTareaDocumentacion.js
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
//import * as yup from "yup";

const TareaDocumentacionDelete = () => {
    const { id } = useParams(); // Obtener el parámetro de la URL (el ID del TareaDocumentacion a editar)
    const [TareaDocumentacion, setTareaDocumentacion] = useState(null);
    const [IdDocumento, setIdDocumento] = useState("");
    const [nombreArchivo, setNombreArchivo] = useState("");
    
    const [activo, setActivo] = useState(false);
    const [esEstadoFinal, setEsEstadoFinal] = useState(false);
    const [descripcion, setDescripcion] = useState("");
    const [path, setPath] = useState("");
    const [tamano, setTamano] = useState("");
    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [mensaje, setMensaje] = useState("");
    const history = useNavigate();
    const [grabando, setGrabando] = useState(false);
    const [exito, setExito] = useState(false);
    const handleVolver = () => {
        history("/TareaVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    useEffect(() => {
        setIdDocumento(id);
        // Aquí realizas la llamada a tu API para obtener el TareaDocumentacion específico por su ID
        const GetTareaDocumentacion = async () => {
            try {
                const reqTareaDocumentacion = {
                    IdDocumento: id
                };

                const response = await axios.post(API_URL + `/DocumentoGetByID`, reqTareaDocumentacion, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = response.data;
                setTareaDocumentacion(data);
                setNombreArchivo(data.nombreArchivo);
                setDescripcion(data.descripcion);
                setPath(data.path);
                setTamano(data.tamano);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        GetTareaDocumentacion();
    }, [id]);


    const handleSubmit = async (event) => {

        try {

           
            setGrabando(true); // Inicia la grabación
            setnombreboton("Volver");
            setExito(true);
            setMensaje('');
            // Aquí realizas la llamada a tu API para actualizar el TareaDocumentacion con los nuevos datos
            const response = await fetch(API_URL + `/DocumentoEliminar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ IdDocumento }),
            });
            const res = await response.json();

            if (res.rdoAccion) {
                // Manejar respuesta exitosa
                setMensaje("¡Archivo eliminado exitosamente!");
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

    if (!TareaDocumentacion) {
        return <div>Cargando Documento...</div>;
    }

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
                        Eliminar Documento de Tarea
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        un Documento amplia la informacion acerca de una tarea. Esta accion tambien eliminara el archivo fisicamente del servidor
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">


                    <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="descripcion"
                                disabled
                                label="Descripcion"
                                variant="standard"
                                value={nombreArchivo}
                                
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="descripcion"
                                disabled
                                label="Descripcion"
                                variant="standard"
                                value={descripcion}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="descripcion"
                                disabled
                                label="Descripcion"
                                variant="standard"
                                value={path}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="tamano"
                                disabled
                                label="Tamaño"
                                variant="standard"
                                value={tamano + " KB"} 
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={1} style={{ display: "flex", gap: "16px" }}>
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
                                Eliminar
                            </MDButton>
                       
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

export default TareaDocumentacionDelete;

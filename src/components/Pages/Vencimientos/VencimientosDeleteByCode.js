import React, { useState } from "react";
import API_URL from "../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los es../tilos de Bootstrap
import BasicLayout from "../../layauots/BasicLayout";
import {
    Alert,
    Card,
} from "@mui/material";
import MDBox from "../../controls/MDBox";
import MDTypography from "../../controls/MDTypography";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from "../../controls/MDInput";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import MDProgress from "../../controls/MDProgress";
import { AlertTitle } from "@mui/material";
import MDButton from "../../controls/MDButton";
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";

const VencimientosDeleteByCode = () => {
    const navigate = useNavigate();

    // const [nombre, setNombre] = useState('');
    // const [activo, setActivo] = useState(false);
    const [formData, setFormData] = useState({
        codigoCarga: ""
    });

    const validationSchema = yup.object().shape({
        codigoCarga: yup.string().required("El campo codigo Carga es requerido"),
        
    });

    const [grabando, setGrabando] = useState(false);
    
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


    const handleVolver = () => {
        navigate("/VencimientosVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };


    const procesarFormulario = async (request) => {
        try {
            setLoading(true);

            validationSchema
                .validate(formData)
                .then(async (validatedData) => {
                    setGrabando(true); // Inicia la grabación
                    setnombreboton("Volver");
                    setExito(true);
                    setMensaje("");

                    const response = await fetch(API_URL + "/VencimientosLegalesEliminarXCodigo", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    });

                    const res = await response.json();

                    if (res.rdoAccion) {
                        // Manejar respuesta exitosa
                        setMensaje("Los Vencimientos han sido eliminados!");
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
            console.log("error:", error);
            setMensaje("Error en la solicitud:", error);
            setGrabando(false); // Inicia la grabación
            setnombreboton("Cancelar");
        } finally {
            setLoading(false);
            setShowprogrees(0);
            setProgress(100);
        }
    };

    return (
        <BasicLayout dire image={bgImage}>
            <Card style={{ width: "150%" }}>
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
                        Eliminar Vencimientos x Codigo
                    </MDTypography>

                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox
                            mb={2}
                            style={{
                                display: "flex",
                                gap: "16px",
                                flexDirection: "row",
                                height: "100%", // Asegura que el contenedor principal ocupe el alto completo
                            }}
                        >
                            <div style={{ flex: 1, marginT: "-35px" }}>
                                
                                <MDBox mb={2} style={{ display: "flex", gap: "16px" }}>
                                    <MDInput
                                        type="text"
                                        name="codigoCarga"
                                        required
                                        label="Codigo Carga"
                                        variant="standard"
                                        value={formData.codigoCarga}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                   
                                </MDBox>
                            </div>

                        </MDBox>
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
                            Grabar
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
                <MDBox mt={3} mb={1} ml={5} mr={5}>
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
            </Card>
        </BasicLayout>
    );
};

export default VencimientosDeleteByCode;

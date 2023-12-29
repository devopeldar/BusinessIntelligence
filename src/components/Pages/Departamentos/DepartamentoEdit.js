// EditarDepartamento.js
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


const DepartamentoEdit = () => {
    const { id } = useParams(); // Obtener el parámetro de la URL (el ID del Departamento a editar)
    const [Departamento, setDepartamento] = useState(null);
    const [idDepartamento, setidDepartamento] = useState("");
    const [activo, setActivo] = useState(false);
    const [nombre, setNombre] = useState("");
    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [mensaje, setMensaje] = useState("");
    const history = useNavigate();
    const [grabando, setGrabando] = useState(false);
    const [exito, setExito] = useState(false);
    const handleVolver = () => {
        history("/DepartamentoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    useEffect(() => {
        setidDepartamento(id);
        // Aquí realizas la llamada a tu API para obtener el Departamento específico por su ID
        const GetDepartamento = async () => {
            try {
                const reqDepartamento = {
                    idDepartamento: id
                };

                const response = await axios.post(API_URL + `/DepartamentoGetByID`, reqDepartamento, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = response.data;
                setDepartamento(data);
                setNombre(data.nombre);
                setActivo(data.activo);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        GetDepartamento();
    }, [id]);


    const handleSubmit = async (event) => {

        try {

            if (nombre === '') {
                setMensaje("El campo nombre es obligatorio");
                setExito(false);
                return;
            }
            setGrabando(true); // Inicia la grabación
            setnombreboton("Volver");
            setExito(true);
            setMensaje('');
            // Aquí realizas la llamada a tu API para actualizar el Departamento con los nuevos datos
            const response = await fetch(API_URL + `/DepartamentoModificacion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idDepartamento, nombre, activo }),
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

    if (!Departamento) {
        return <div>Cargando Estado de Tarea...</div>;
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
                        Editar Departamento
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                    Un Departamento especifica un area de la empresa que elabora una accion
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

export default DepartamentoEdit;

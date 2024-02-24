// EditarVencimientos.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasicLayout from "../../layauots/BasicLayout";
import { Card } from "react-bootstrap";

import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";

import {
    Alert,
    AlertTitle,
    Autocomplete,
    TextField
} from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDBox from "../../controls/MDBox";
import MDInput from "../../controls/MDInput";
import MDTypography from "../../controls/MDTypography";
import MDButton from "../../controls/MDButton";


const VencimientosEdit = () => {
    const { id } = useParams(); // Obtener el parámetro de la URL (el ID del Vencimientos a editar)
    const [Vencimientos, setVencimientos] = useState(null);
    const [idVencimiento, setidVencimiento] = useState("");
    const [idTareaTipo, setIdTareaTipo] = useState(0);
    const [idCliente, setIdCliente] = useState(0);
    const [mes, setMes] = useState(0);
    const [anio, setAnio] = useState(0);
    const [fechaVencimientoLegal, setFechaVencimientoLegal] = useState("");
    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [mensaje, setMensaje] = useState("");
    const history = useNavigate();
    const [grabando, setGrabando] = useState(false);
    const [exito, setExito] = useState(false);

    const [elementsclientes, setElementsCliente] = useState([]);

    const [elementsTipoTarea, setElementsTipoTarea] = useState([]);

    const [selectedValueCliente, setSelectedValueCliente] = useState([]);

    const [selectedValueTipoTarea, setSelectedValueTipoTarea] = useState([]);

    const handleVolver = () => {
        history("/VencimientosVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    useEffect(() => {
        setidVencimiento(id);
        // Aquí realizas la llamada a tu API para obtener el Vencimientos específico por su ID
        const GetVencimientos = async () => {
            try {
                const reqVencimientos = {
                    idVencimientosLegales: id,
                };

                const response = await axios.post(API_URL + `/VencimientosLegalesGetByID`, reqVencimientos, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = response.data;



                setIdCliente(data.idCliente);

                setIdTareaTipo(data.idTareaTipo);
                setMes(data.mes);
                setAnio(data.anio);

                const fechaOriginal = data.fechaVencimientoLegal;
                const fechaFormateada = new Date(fechaOriginal)
                    .toISOString()
                    .split("T")[0];

                setFechaVencimientoLegal(fechaFormateada);

                setVencimientos(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        GetVencimientos();
    }, [id]);



    useEffect(() => {
        const GetClientes = async () => {
            const response = await axios.post(API_URL + "/CLienteListar", {
                headers: {
                    accept: "application/json",
                },
            });

            setElementsCliente(response.data);

            const defaultValueId = idCliente; // ID del elemento que deseas seleccionar por defecto
            const defaultValue = response.data.find(
                (item) => item.idCliente === defaultValueId
            );

            setSelectedValueCliente(defaultValue);
        };
        GetClientes();
    }, [Vencimientos]);


    useEffect(() => {
        const GetTareaTipo = async () => {
            const response = await axios.post(API_URL + "/TareaTipoListar", {
                headers: {
                    accept: "application/json",
                },
            });
            setElementsTipoTarea(response.data);

            const defaultValueId = idTareaTipo; // ID del elemento que deseas seleccionar por defectoa asd asd asd asd a sdasd asd asd
            const defaultValue = response.data.find(
                (item) => item.idTareaTipo === defaultValueId
            );
            setSelectedValueTipoTarea(defaultValue);
        };
        GetTareaTipo();
    }, [Vencimientos]);


    const handleSubmit = async (event) => {
        try {
           
            const request = {
                idVencimientosLegales: id,
                idTareaTipo: selectedValueTipoTarea.idTareaTipo,
                idCliente: selectedValueCliente.idCliente,
                mes: mes,
                fechaVencimientoLegal: fechaVencimientoLegal,
                anio: anio,

            };
            console.log("formData Vencimientos" + JSON.stringify(request))


            setGrabando(true); // Inicia la grabación
            setnombreboton("Volver");
            setExito(true);
            setMensaje("");
            // Aquí realizas la llamada a tu API para actualizar el Vencimientos con los nuevos datos
            const response = await fetch(API_URL + `/VencimientosLegalesModificacion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });
            const res = await response.json();

            if (res.rdoAccion) {
                // Manejar respuesta exitosa
                setMensaje("¡Datos actualizados exitosamente!");
            } else {
                // Manejar errores si la respuesta no es exitosa
                setMensaje(res.rdoAccionDesc);
                setGrabando(false); // Inicia la grabación
                setnombreboton("Cancelar");
                setExito(false);
            }
        } catch (error) {
            setMensaje("Error en la solicitud:", error);
            setGrabando(false); // Inicia la grabación
            setExito(false);
            setnombreboton("Cancelar");
            console.log("Error en la solicitud:" + error);
        }
    };


    const handleAutocompleteIDClienteChange = (event, value) => {
        setSelectedValueCliente(value);
    };
    const handleAutocompleteTareaTipoChange = (event, value) => {
        setSelectedValueTipoTarea(value);
    };


    if (!Vencimientos) {
        return <div>Editando Vencimientos...</div>;
    }

    return (
        <BasicLayout image={bgImage}>
            <Card style={{ width: "158%" }}>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="warning"
                    mx={2}
                    mt={-3}
                    p={3}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Editar Vencimientos
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        La Configuracion de Vencimientos es muy importante ya que a futuro indicara el Vencimiento legal de una tarea
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" Vencimientos="form">
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
                                <MDBox mb={2}>
                                    <Autocomplete
                                        onChange={handleAutocompleteIDClienteChange}
                                        options={elementsclientes}
                                        value={selectedValueCliente || null}
                                        getOptionLabel={(option) =>
                                            option.nombre || "Seleccione Cliente"
                                        }

                                        getOptionDisabled={(option) => option.activo === false}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Seleccione Cliente"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </MDBox>
                                <MDBox mb={2} style={{ display: "flex", gap: "16px" }}>
                                    <Autocomplete
                                        onChange={handleAutocompleteTareaTipoChange}
                                        options={elementsTipoTarea}
                                        value={selectedValueTipoTarea || null}
                                        getOptionLabel={(option) => option.nombre || "Seleccione Tipo de Vencimientos"}
                                        getOptionDisabled={(option) => option.activo === false}

                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Seleccione Tipo de Vencimientos"
                                                variant="outlined"
                                            />
                                        )}
                                        style={{ flex: 1 }}  // Añade esta línea
                                    />

                                </MDBox>
                                <MDBox mb={2} style={{ display: "flex", gap: "16px" }}>
                                    <MDInput
                                        type="number"
                                        name="mes"
                                        required
                                        label="Mes"
                                        variant="standard"
                                        value={mes}
                           
                                        onChange={(e) => setMes(e.target.value)}
                                        fullWidth
                                    />
                                    <MDInput
                                        type="number"
                                        name="Anio"
                                        required
                                        label="Año"
                                        variant="standard"
                                        value={anio}
                           
                                        onChange={(e) => setAnio(e.target.value)}
                                        fullWidth
                                    />
                                </MDBox>
                                <MDBox mb={2} style={{ display: "flex", gap: "16px" }}>
                                    <MDInput
                                        type="date"
                                        name="fechaVencimientoLegal"
                                        required
                                        label="Vencimiento legal"
                                        variant="standard"
                                        value={fechaVencimientoLegal}
                      
                                        onChange={(e) => setFechaVencimientoLegal(e.target.value)}
                                        fullWidth
                                    />
                                </MDBox>
                                
                            </div>
                           
                        </MDBox>
                        <MDBox mt={1} mb={1}>
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
                        <MDBox mt={2} mb={1}>
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

export default VencimientosEdit;

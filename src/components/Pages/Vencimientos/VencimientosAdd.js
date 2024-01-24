import React, { useEffect, useState } from "react";
import API_URL from "../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los es../tilos de Bootstrap
import BasicLayout from "../../layauots/BasicLayout";
import {
    Alert,
    Autocomplete,
    Card,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
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
import { PersonFillAdd, Save } from "react-bootstrap-icons";
import { Delete, ExitToApp } from "@mui/icons-material";
import axios from "axios";

const VencimientosAdd = () => {
    const navigate = useNavigate();

    // const [nombre, setNombre] = useState('');
    // const [activo, setActivo] = useState(false);
    const [formData, setFormData] = useState({
        idTareaTipo: 0,
        idCliente: 0,
        mes: new Date().getMonth(),
        Anio: new Date().getFullYear(),
        fechaVencimientoLegal: new Date(),
    });

    const validationSchema = yup.object().shape({
        idTareaTipo: yup.string().required("El campo Tipo Tarea es requerido"),
        idCliente: yup.string().required("Debe Indicar el Cliente"),
        mes: yup.string().required("Debe Indicar el Mes"),
        Anio: yup.string().required("Debe Indicar el Año"),

    });

    const [grabando, setGrabando] = useState(false);
    const [elementsTareaTipo, setElementsTareaTipo] = useState([]);
    const [elementsCliente, setElementsCliente] = useState([]);

    const [selectedValueTareaTipo, setSelectedValueTareaTipo] = useState(
        elementsTareaTipo[0]
    );
    const [selectedValueCliente, setSelectedValueCliente] = useState(
        elementsCliente[0]
    );

    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [progress, setProgress] = useState(0);
    const [showprogrees, setShowprogrees] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [exito, setExito] = useState(false);
    const [data, setData] = useState([]);
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        console.log("chk :" + event);
        // Verifica si el tipo de campo es un checkbox (para campos booleanos)
        const newValue = type === "checkbox" ? checked : value;
        console.log("name ", name);

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

    // useEffect(() => {
    //     // Coloca aquí el código que deseas ejecutar al montar el componente
    //     console.log('El componente se ha montado');

    //     // Por ejemplo, llamar a una función
    //     handleLoad();
    // }, []); // El segundo argumento es un array de dependencias vacío

    useEffect(() => {
        const GetTareaTipo = async () => {
            const response = await axios.post(API_URL + "/TareaTipoListar", {
                headers: {
                    accept: "application/json",
                },
            });

            console.log("response " + response.data);
            setElementsTareaTipo(response.data);
        };
        GetTareaTipo();
    }, []);

    useEffect(() => {
        const GetCliente = async () => {
            const response = await axios.post(API_URL + "/ClienteListar", {
                headers: {
                    accept: "application/json",
                },
            });
            console.log("response " + response.data);
            setElementsCliente(response.data);
        };
        GetCliente();
    }, []);


    const handleVolver = () => {
        navigate("/VencimientosVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    const handleAutocompleteChangeTareaTipo = (event, value) => {
        setSelectedValueTareaTipo(value);
    };


    const handleAutocompleteClienteChange = (event, value) => {
        setSelectedValueCliente(value);
    };

    const procesarFormulario = async (request) => {
        try {
            setLoading(true);

            formData.idTareaTipo = selectedValueTareaTipo.idTareaTipo;
            formData.idCliente = selectedValueCliente.idCliente;
   
            console.log("formData Vencimiento" + JSON.stringify(formData));
            validationSchema
                .validate(formData)
                .then(async (validatedData) => {
                    setGrabando(true); // Inicia la grabación
                    setnombreboton("Volver");
                    setExito(true);
                    setMensaje("");

                    const response = await fetch(API_URL + "/VencimientosLegalesAlta", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    });

                    const res = await response.json();

                    if (res.rdoAccion) {
                        // Manejar respuesta exitosa
                        setMensaje("El Vencimiento ha sido creado exitosamente!");
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
                        Agregar Vencimiento
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
                                <MDBox mb={2}>
                                    <Autocomplete
                                        onChange={handleAutocompleteClienteChange}
                                        options={elementsCliente}
                                        getOptionLabel={(option) => option.nombre}
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
                                <MDBox mb={2}>
                                    <Autocomplete
                                        onChange={handleAutocompleteChangeTareaTipo}
                                        options={elementsTareaTipo}
                                        getOptionLabel={(option) => option.nombre}
                                        getOptionDisabled={(option) => option.activo === false}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Seleccione Tipo de Tarea"
                                                variant="outlined"
                                            />
                                        )}
                                        style={{ flex: 1 }}
                                    />
                                </MDBox>
                                <MDBox mb={2} style={{ display: "flex", gap: "16px" }}>
                                    <MDInput
                                        type="number"
                                        name="mes"
                                        required
                                        label="Mes"
                                        variant="standard"
                                        value={formData.mes}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <MDInput
                                        type="number"
                                        name="Anio"
                                        required
                                        label="Año"
                                        variant="standard"
                                        value={formData.Anio}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </MDBox>
                                <MDBox mb={1} style={{ display: "flex", gap: "16px" }}>

                                    <MDInput
                                        type="date"
                                        name="fechaVencimientoLegal"
                                        required
                                        label="Vencimiento legal"
                                        variant="standard"
                                        value={formData.fechaVencimientoLegal}
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
                {/* </MDBox> */}
            </Card>
        </BasicLayout>
    );
};

export default VencimientosAdd;

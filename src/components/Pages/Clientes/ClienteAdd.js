
import React, { useState } from "react";
import API_URL from "../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los es../tilos de Bootstrap
import BasicLayout from "../../layauots/BasicLayout";
import { Alert, Autocomplete, Card, TextField } from "@mui/material";
import MDBox from "../../controls/MDBox";
import MDTypography from "../../controls/MDTypography";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from "../../controls/MDInput";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import MDProgress from "../../controls/MDProgress";
import { AlertTitle, Checkbox } from "@mui/material";
import MDButton from "../../controls/MDButton";
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";
import SituacionImpositiva from "../../Utils/SituacionImpositiva";


const ClienteAdd = () => {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState(null);

    const situacionesImpositivas = Object.values(SituacionImpositiva);
  
    const [formData, setFormData] = useState({
        idCliente: 0,
        nombre: "",
        activo: true,
        telefono: "",
        cuit: "",
        contacto: "",
        observaciones: "",
        tipoIVA: 0
    });



    const validationSchema = yup.object().shape({
        nombre: yup.string().required("El campo Nombre es requerido"),
        telefono: yup.string().required("El campo Telefono es requerido"),
        cuit: yup.string().required("El campo Cuit es requerido"),
        contacto: yup.string().required("El campo Contacto es requerido"),

    });

    const [grabando, setGrabando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [exito, setExito] = useState(false);

    const [progress, setProgress] = useState(0);
    const [showprogrees, setShowprogrees] = React.useState(0);
    const [loading, setLoading] = useState(false);

    const [nombreboton, setnombreboton] = useState("Cancelar");

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        console.log("chk :" + event)
        // Verifica si el tipo de campo es un checkbox (para campos booleanos)
        const newValue = type === 'checkbox' ? checked : value;

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
        navigate("/ClienteVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    const procesarFormulario = async (data) => {
        try {
            setLoading(true);
            data.tipoIVA = selectedValue.valor
            validationSchema.validate(data)
                .then(async (validatedData) => {

                    setGrabando(true); // Inicia la grabación
                    setnombreboton("Volver");
                    setExito(true);
                    setMensaje('');

                    const response = await fetch(API_URL + "/ClienteAlta", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    });

                    const res = await response.json();

                    if (res.rdoAccion) {
                        // Manejar respuesta exitosa
                        setMensaje("Cliente Registrado exitosamente!");
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
            setMensaje("Error en la solicitud:", error);
            setGrabando(true); // Inicia la grabación
            setnombreboton("Cancelar");
        } finally {
            setLoading(false);
            setShowprogrees(0);
            setProgress(100);
        }
    };
    const handleAutocompleteChange = (event, newValue) => {
        console.log(newValue);
        setSelectedValue(newValue);
      };
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
                        Agregar Cliente
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Un Cliente es una entidad que origina el pedido de una tarea
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
                                value={formData.nombre}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </MDBox>

                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="contacto"
                                required
                                label="Contacto"
                                variant="standard"
                                value={formData.contacto}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="cuit"
                                required
                                label="Cuit"
                                variant="standard"
                                value={formData.cuit}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="telefono"
                                required
                                label="Telefono"
                                variant="standard"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="email"
                                required
                                label="Email"
                                variant="standard"
                                value={formData.email}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </MDBox>

                        <Autocomplete
                            options={situacionesImpositivas}
                            getOptionLabel={(option) => option.descripcion}
                            value={selectedValue}
                            onChange={handleAutocompleteChange}
                            renderInput={(params) => (
                                <TextField {...params} label="Selecciona una situación impositiva" variant="outlined" />
                            )}
                        />
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="observaciones"
                                required
                                label="Observaciones"
                                variant="standard"
                                value={formData.observaciones}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>

                            <Checkbox name="activo"
                                onChange={handleInputChange}
                                checked={formData.activo || false}

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
                                color="secondary"
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
                                color="secondary"
                                endIcon={<ExitToApp />}

                                fullWidth
                            >
                                {nombreboton}
                            </MDButton>
                        </MDBox>
                    </MDBox>
                    <MDBox mt={4} mb={1}>
                        <MDProgress color="success"
                            loading="true"
                            label={true}
                            value={showprogrees === 0 ? progress : 0}
                            display={loading && exito ? 'true' : 'false'}
                            variant="contained"></MDProgress>

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

export default ClienteAdd;


import React, { useEffect, useState } from "react";
import API_URL from "../../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los es../tilos de Bootstrap
import BasicLayout from "../../../layauots/BasicLayout";
import { Alert, Autocomplete, Card, TextField } from "@mui/material";
import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import bgImage from "../../../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from "../../../controls/MDInput";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import MDProgress from "../../../controls/MDProgress";
import { AlertTitle } from "@mui/material";
import MDButton from "../../../controls/MDButton";
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";
import axios from "axios";

const NoConformidadAccionAdd = () => {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState(null);
    const [accionesTipo, setAccionesTipo] = useState(null);
    const [formData, setFormData] = useState({
        idNoConformidadAccion: 0,
        accion: "",
       
    });


    useEffect(() => {
      const GetAccionesTipo = async () => {
              const response = await axios.post(API_URL + "/NoConformidadAccionTipoListar", {
                  headers: {
                      accept: "application/json",
                  },
              });
              setAccionesTipo(response.data);
      }; 
      GetAccionesTipo();
  }, []);

    const validationSchema = yup.object().shape({
      accion: yup.string().required("El campo accion es requerido"),
       
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
        navigate("/NoConformidadAccionVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    const procesarFormulario = async (data) => {
        try {
            setLoading(true);
            data.idNoConformidadAccionTipo = selectedValue.idNoConformidadAccionTipo
            validationSchema.validate(data)
                .then(async (validatedData) => {

                    setGrabando(true); // Inicia la grabación
                    setnombreboton("Volver");
                    setExito(true);
                    setMensaje('');

                    const response = await fetch(API_URL + "/NoConformidadAccionAlta", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    });

                    const res = await response.json();

                    if (res.rdoAccion) {
                        // Manejar respuesta exitosa
                        setMensaje("Accion Registrada exitosamente!");
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
        setSelectedValue(newValue);
    };
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
                        Agregar Accion de No Conformidad
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Agregue las acciones correspondientes para calificar una Tarea que no termino en un estado optimo
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
                                value={formData.accion}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </MDBox>

                       
                        <Autocomplete
                            options={accionesTipo}
                            getOptionLabel={(option) => option.accionTipo}
                            value={selectedValue}
                            onChange={handleAutocompleteChange}
                            renderInput={(params) => (
                                <TextField {...params} label="Selecciona un Tipo de Accion" variant="outlined" />
                            )}
                        />
                        
                        <MDBox mb={2} style={{ display: "flex", gap: "16px", marginTop:"15px" }}>
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
                    <MDBox mt={1} mb={1}>
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

export default NoConformidadAccionAdd;
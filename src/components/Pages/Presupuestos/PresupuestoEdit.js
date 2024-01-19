
// EditarCliente.js
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
import { Email, ExitToApp } from "@mui/icons-material";
import MDButton from "../../controls/MDButton";
import { Alert, AlertTitle, Autocomplete, Checkbox, TextField } from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import SituacionImpositiva from "../../Utils/SituacionImpositiva";

const PresupuestoEdit = () => {
    const { id } = useParams(); // Obtener el parámetro de la URL (el ID del Cliente a editar)
    const [Cliente, setCliente] = useState(null);
    const [idCliente, setidCliente] = useState("");
    const [activo, setActivo] = useState(false);
    const [elements, setElements] = useState(false);
    const [observaciones, setObservaciones] = useState("");
    const [tipoIVA, setTipoIva] = useState(0);
    const [telefono, setTelefono] = useState("");
    const [cuit, setCuit] = useState("");
    const [nombre, setNombre] = useState("");
    const [contacto, setContacto] = useState("");
    const [email, setEmail] = useState("");
    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [mensaje, setMensaje] = useState("");
    const history = useNavigate();
    const [grabando, setGrabando] = useState(false);
    const [exito, setExito] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const handleVolver = () => {
        history("/ClienteVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    useEffect(() => {
        setidCliente(id);
        // Aquí realizas la llamada a tu API para obtener el Cliente específico por su ID
        const GetCliente = async () => {
            try {
                console.log("GetCliente");
                const reqCliente = {
                    idCliente: id
                };

                const response = await axios.post(API_URL + `/ClienteGetByID`, reqCliente, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = response.data;
                setCliente(data);
                setCuit(data.cuit);
                setNombre(data.nombre);
                setTelefono(data.telefono);
                setEmail(data.email);
                setObservaciones(data.observaciones);
                setTipoIva(data.tipoIVA);
                setActivo(data.activo);
                setContacto(data.contacto);


            } catch (error) {
                console.error("Error:", error);
            }
        };
        GetCliente();
    }, [id]);

    useEffect(() => {

        const GetEstadosTareas = async () => {
            if (Cliente) {
                const situacionesImpositivas = Object.values(SituacionImpositiva);

                setElements(situacionesImpositivas);

                const defaultValueId = tipoIVA; // ID del elemento que deseas seleccionar por defecto
                const defaultValue = situacionesImpositivas.find(item => item.valor === defaultValueId);

                setSelectedValue(defaultValue);

            }
        }; GetEstadosTareas();
    }, [Cliente, tipoIVA]);
    const handleSubmit = async (event) => {

        try {

            if (nombre === '') {
                setMensaje("El campo Nombre es obligatorio");
                setExito(false);
                return;
            }
            if (cuit === '') {
                setMensaje("El campo Cuit es obligatorio");
                setExito(false);
                return;
            }
            if (telefono === '') {
                setMensaje("El campo Telefono es obligatorio");
                setExito(false);
                return;
            }
            if (contacto === '') {
                setMensaje("El campo Contacto es obligatorio");
                setExito(false);
                return;
            }
            if (tipoIVA === 0) {
                setMensaje("El campo Tipo de Iva es obligatorio");
                setExito(false);
                return;
            }
            setGrabando(true); // Inicia la grabación
            setnombreboton("Volver");
            setExito(true);
            setMensaje('');
            // Aquí realizas la llamada a tu API para actualizar el Cliente con los nuevos datos

            const response = await fetch(API_URL + `/ClienteModificacion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idCliente, nombre, contacto, telefono, email, cuit, tipoIVA, observaciones, activo }),
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
    const handleAutocompleteChange = (event, value) => {
        setSelectedValue(value);
        setTipoIva(value.valor);
    };

    
    if (!Cliente) {

        return <BasicLayout image={bgImage}>
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
                        Cargando Tipos de eventos...
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
                        Editar Cliente
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Un Cliente es una entidad que origina el pedido de una tarea
                    </MDTypography>
                </MDBox>
                <MDBox pt={1} pb={3} px={3}>
                    <MDBox component="form" role="form">

                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="nombre"
                                required
                                label="Razon Social"
                                variant="standard"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2} style={{ display: "flex", gap: "16px" }}>
                            <MDInput
                                type="text"
                                name="contacto"
                                required
                                label="Contacto"
                                variant="standard"
                                value={contacto}
                                onChange={(e) => setContacto(e.target.value)}
                                fullWidth
                            />
                        
                            <MDInput
                                type="text"
                                name="cuit"
                                required
                                label="Cuit"
                                variant="standard"
                                value={cuit}
                                onChange={(e) => setCuit(e.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2} style={{ display: "flex", gap: "16px" }}>
                            <MDInput
                                type="text"
                                name="telefono"
                                required
                                label="Telefono"
                                variant="standard"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                fullWidth
                            />
                        
                            <MDInput
                                type="text"
                                name="email"
                                required
                                label="Email"
                                variant="standard"
                                value={email}
                                endIcon={< Email />  }                             
                                 onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <Autocomplete
                                onChange={handleAutocompleteChange}
                                // onChange={(event, newValue) => {
                                //     setSelectedValue(newValue);
                                // }}
                                options={elements}
                                value={selectedValue}
                                getOptionLabel={(option) => option.descripcion}
                                getOptionDisabled={(option) => option.activo === false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Seleccione Tipo de Iva"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                name="observaciones"
                                required
                                label="Observaciones"
                                variant="standard"
                                value={observaciones}
                                endIcon={< Email />  }                             
                                 onChange={(e) => setObservaciones(e.target.value)}
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


                        <MDBox mb={1} style={{ display: "flex", gap: "16px" }}>
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

export default PresupuestoEdit;


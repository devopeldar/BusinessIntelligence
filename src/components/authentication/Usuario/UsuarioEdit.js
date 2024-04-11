// EditarUsuario.js
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
import { Alert, AlertTitle, Autocomplete, Checkbox, TextField } from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";


const UsuarioEdit = () => {
    const { id } = useParams(); // Obtener el parámetro de la URL (el ID del Usuario a editar)
    const [Usuario, setUsuario] = useState(null);
    const [idUsuario, setidUsuario] = useState("");
    const [activo, setActivo] = useState(false);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [idPerfil, setIdPerfil] = useState("");
    const [elementsPerfil, setElementsPerfil] = useState(false);
    const [selectedValuePerfil, setSelectedValuePerfil] = useState('');


    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [mensaje, setMensaje] = useState("");
    const history = useNavigate();
    const [grabando, setGrabando] = useState(false);
    const [exito, setExito] = useState(false);
    const handleVolver = () => {
        history("/UsuarioVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };


    useEffect(() => {
        setidUsuario(id);
        // Aquí realizas la llamada a tu API para obtener el Usuario específico por su ID
        const GetUsuario = async () => {
            try {
                const reqUsuario = {
                    idUsuario: id
                };

                const response = await axios.post(API_URL + `/UsuarioGetByID/`, reqUsuario, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = response.data;
                setUsuario(data);
                setIdPerfil(data.idPerfil);
                setNombre(data.nombre);
                setActivo(data.activo);
                setEmail(data.email);
                setTelefono(data.telefono);


            } catch (error) {
                console.error("Error:", error);
            }
        };
        GetUsuario();
    }, [id]);



    useEffect(() => {
        const GetPerfil = async () => {
            if (Usuario) {
                const response = await axios.post(API_URL + "/PerfilListar", {
                    headers: {
                        accept: "application/json",
                    },
                });


                setElementsPerfil(response.data);


                const defaultValueId = idPerfil;
                const defaultValue = response.data.find(item => item.idPerfil === defaultValueId);
                console.log("defaultValue", defaultValue)
                setSelectedValuePerfil(defaultValue);

            }
        }; GetPerfil();
    }, [Usuario]);



    const handleAutocompletePerfilChange = (event, value) => {
        setSelectedValuePerfil(value);
        setIdPerfil(value.idPerfil);
    };

    const handleSubmit = async (event) => {

        try {

            setMensaje("");
            if (nombre === '') {
                setMensaje("El campo nombre es obligatorio");
                setExito(false);
                return;
            }
   
            setGrabando(true); // Inicia la grabación
            setnombreboton("Volver");
            setExito(true);
            setMensaje('');
            // Aquí realizas la llamada a tu API para actualizar el Usuario con los nuevos datos
            const response = await fetch(API_URL + `/UsuarioModificacion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
   
                body: JSON.stringify({ idUsuario, nombre, telefono, idPerfil, activo }),
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

    if (!Usuario) {
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
                   Cargando Usuarios...
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
                    coloredShadow="success"
                    mx={2}
                    mt={-3}
                    p={3}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Editar Usuario
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Un Usuario es la entidad que interactua con el sistema, segun el perfil que tenga
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
                        <MDBox mb={1} style={{ display: "flex", gap: "16px" }}>
                            <MDInput
                                type="text"
                                name="email"
                                required
                                label="Email"
                                disabled={true}
                                variant="standard"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />
                        
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
                        </MDBox>
                        <MDBox mb={2} >
                            <Autocomplete
                                onChange={handleAutocompletePerfilChange}
                                options={elementsPerfil}
                                value={selectedValuePerfil}
                                getOptionLabel={(option) => option.nombre || ''}
                                getOptionDisabled={(option) => option.activo === false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Seleccione Perfil"
                                        variant="outlined"
                                    />
                                )}
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

export default UsuarioEdit;

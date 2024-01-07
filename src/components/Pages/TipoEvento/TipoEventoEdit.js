// EditarTipoEvento.js
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
import EstadosProgresoTarea from "../../Utils/estadosProgresoTarea";

const TipoEventoEdit = () => {
    const { id } = useParams(); // Obtener el parámetro de la URL (el ID del TipoEvento a editar)
    const estados = Object.values(EstadosProgresoTarea);
    const [TipoEvento, setTipoEvento] = useState(null);
    const [idEventoTipo, setidEventoTipo] = useState("");
    const [activo, setActivo] = useState(false);
    const [enviaMail, setEnviaMail] = useState(false);
    const [detiene, setDetiene] = useState(false);
    const [elements, setElements] = useState(false);
    const [observaciones, setObservaciones] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [mensaje, setMensaje] = useState("");
    const history = useNavigate();
    const [grabando, setGrabando] = useState(false);
    const [exito, setExito] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValuEestado, setSelectedValueEstado] = useState(estados[0]);
    const [idTareaEstado, setIdTareaEstado] = useState(0);
    const [estado, setEstado] = useState(0);
    const handleVolver = () => {
        history("/TipoEventoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    useEffect(() => {
        setidEventoTipo(id);
        // Aquí realizas la llamada a tu API para obtener el TipoEvento específico por su ID
        const GetTipoEvento = async () => {
            try {
                console.log("GetTipoEvento");
                const reqTipoEvento = {
                    idEventoTipo: id
                };

                const response = await axios.post(API_URL + `/EventoTipoGetByID`, reqTipoEvento, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = response.data;
                setTipoEvento(data);
                setDescripcion(data.descripcion);
                setActivo(data.activo);
                setIdTareaEstado(data.idTareaEstado);
                setActivo(data.activo);
                setEnviaMail(data.enviaMail);
                setDetiene(data.detiene);
                setObservaciones(data.observaciones);
                setEstado(data.estado);

                setSelectedValueEstado(obtenerEstadoPorValor(data.estado));


            } catch (error) {
                console.error("Error:", error);
            }
        };
        GetTipoEvento();
    }, [id]);

    function obtenerEstadoPorValor(valor) {
        for (let estado in EstadosProgresoTarea) {
          if (EstadosProgresoTarea[estado].valor === valor) {
            return EstadosProgresoTarea[estado];
          }
        }
        return null; // Retorna null si no se encuentra ningún estado con el valor proporcionado
      }

    useEffect(() => {

        const GetEstadosTareas = async () => {
            if (TipoEvento) {
                console.log("GetEstadosTareas");
                const response = await axios.post(API_URL + "/TareaEstadoListar", {
                    headers: {
                        accept: "application/json",
                    },
                });

                setElements(response.data);

                const defaultValueId = idTareaEstado; // ID del elemento que deseas seleccionar por defecto
                const defaultValue = response.data.find(item => item.idTareaEstado === defaultValueId);

                setSelectedValue(defaultValue);

                // const comboOptions = entityData.map(item => ({
                //     idTareaEstado: item.idTareaEstado,
                //     descripcion: item.descripcion,
                //   }));

                //   // Actualizar el estado del combo con los datos obtenidos
                //   setComboData(comboOptions);



            }
        }; GetEstadosTareas();
    }, [TipoEvento]);
    const handleSubmit = async (event) => {

        try {

            if (descripcion === '') {
                setMensaje("El campo Descripcion es obligatorio");
                setExito(false);
                return;
            }
            if (idTareaEstado === 0) {
                setMensaje("El campo Descripcion es obligatorio");
                setExito(false);
                return;
            }
            setGrabando(true); // Inicia la grabación
            setnombreboton("Volver");
            setExito(true);
            setMensaje('');
            // Aquí realizas la llamada a tu API para actualizar el TipoEvento con los nuevos datos

            const response = await fetch(API_URL + `/EventoTipoModificacion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idEventoTipo, descripcion, idTareaEstado, activo, enviaMail, detiene,estado,observaciones }),
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
        setIdTareaEstado(value.idTareaEstado);
    };

    const handleAutocompleteChangeEstados = (event, value) => {
        setSelectedValueEstado(value);
        setEstado(value.valor);
    };

    

    if (!TipoEvento) {

        return <BasicLayout image={bgImage}>
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
                    bgColor="primary"
                    borderRadius="lg"
                    coloredShadow="primary"
                    mx={2}
                    mt={-3}
                    p={3}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Editar Tipo de Evento
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Un Tipo de Evento especifica una accion o estado en que se encuentra la tarea
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
                                onChange={(e) => setDescripcion(e.target.value)}
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
                                        label="Seleccione Estado de Tarea"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <Autocomplete
                                onChange={handleAutocompleteChangeEstados}
                                // onChange={(event, newValue) => {
                                //     setSelectedValue(newValue);
                                // }}
                                options={estados}
                                value={selectedValuEestado}
                                getOptionLabel={(option) => option.descripcion}
                                getOptionDisabled={(option) => option.activo === false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Seleccione Estado de Progreso"
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
                                onChange={(e) => setObservaciones(e.target.value)}
                                fullWidth
                            />
                        </MDBox>

                        <MDBox mb={2}>

                            <Checkbox name="enviaMail"
                                onChange={(e) => setEnviaMail(e.target.checked)}
                                checked={enviaMail}

                            />
                            <MDTypography
                                variant="button"
                                fontWeight="regular"
                                color="text"
                                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                            >
                                &nbsp;&nbsp;Envia Mail
                            </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>

                            <Checkbox name="detiene"
                                onChange={(e) => setDetiene(e.target.checked)}
                                checked={detiene}

                            />
                            <MDTypography
                                variant="button"
                                fontWeight="regular"
                                color="text"
                                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                            >
                                &nbsp;&nbsp;Detiene Tarea
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


                        <MDBox mt={4} mb={1}>
                            <MDButton
                                onClick={() => {
                                    handleSubmit();
                                }}
                                variant="gradient"
                                color="primary"
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
                                color="primary"
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

export default TipoEventoEdit;

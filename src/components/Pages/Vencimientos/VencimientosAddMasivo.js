import React, { useEffect, useState } from "react";
import API_URL from "../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los es../tilos de Bootstrap
import BasicLayout from "../../layauots/BasicLayout";
import {
    Alert,
    Autocomplete,
    Card,
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
import { Save } from "react-bootstrap-icons";
import { ExitToApp } from "@mui/icons-material";
import axios from "axios";
import MDSnackbar from "../../controls/MDSnackbar";
import obtenerFechaFormateada from "../../Utils/fechas";

const VencimientosAddMasivo = () => {
    const navigate = useNavigate();

     const [terminacionCuit, setTerminacionCuit] = useState(0);
     const [mes, setMes] = useState(new Date().getMonth()+ 1);
     const [anio, setAnio] = useState(new Date().getFullYear());
     const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Agrega 1 para obtener el mes actual
    month = month < 10 ? '0' + month : month; // Agrega un cero delante si es necesario
    const day = getLastDayOfMonth(year, month);
    const formattedDate = `${year}-${month}-${day}`;
     const [fechaVencimientoLegal, setFechaVencimientoLegal] = useState(formattedDate);


    const [grabando, setGrabando] = useState(false);
    const [elementsTareaTipo, setElementsTareaTipo] = useState([]);
 
    const [selectedValueTareaTipo, setSelectedValueTareaTipo] = useState(
        elementsTareaTipo[0]
    );
 

    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [progress, setProgress] = useState(0);
    const [showprogrees, setShowprogrees] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [exito, setExito] = useState(false);
    const closeSuccessSB = () => setSuccessSB(false);
    const [successSB, setSuccessSB] = useState(false);
    const closeSuccessSBPrev = () => setSuccessSBPrev(false);
    const [successSBPrev, setSuccessSBPrev] = useState(false);

    const [dateTime, setDateTime] = useState("");

    const [errorSB, setErrorSB] = useState(false);
    // const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    function getLastDayOfMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    useEffect(() => {
        const obtenerFechaHoraActual = () => {
          const fechaHoraActual = new Date();
          const fechaFormateada = obtenerFechaFormateada(fechaHoraActual);
          setDateTime(fechaFormateada);
        };
      
        obtenerFechaHoraActual();
      }, []);

      
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
        procesarFormulario();
    };

  
    useEffect(() => {
        const GetTareaTipo = async () => {
            const response = await axios.post(API_URL + "/TareaTipoListar", {
                headers: {
                    accept: "application/json",
                },
            });

            setElementsTareaTipo(response.data);
        };
        GetTareaTipo();
    }, []);

   const handleVolver = () => {
        navigate("/VencimientosVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    const handleAutocompleteChangeTareaTipo = (event, value) => {
        setSelectedValueTareaTipo(value);
    };

    const procesarFormulario = async () => {
      
            setLoading(true);
            setSuccessSBPrev(true);
            const reqVencimiento = {
                TareaTipocol: selectedValueTareaTipo,
                terminacionCuit: terminacionCuit,
                fechaVencimientoLegal: fechaVencimientoLegal,
                mes: mes,
                anio: anio,
                origenAcceso: "web"
              };
           
      try{

        console.log("reqVencimiento:", reqVencimiento);

        const response = await axios.post(API_URL + "/VencimientosLegalesAltaMasivo",reqVencimiento, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const res = await response.data;

        if (res.rdoAccion) {
            // Manejar respuesta exitosa
            setMensaje("El Vencimiento ha sido creado exitosamente!");
            setGrabando(true);
            setExito(true);
            setSuccessSB(true);
            setSuccessSBPrev(false);
            setErrorSB(false);
        } else {
            // Manejar errores si la respuesta no es exitosa
            setMensaje(res.rdoAccionDesc);
            setExito(false);
            setGrabando(false);
            setSuccessSB(false);
            setErrorSB(true);
            setSuccessSBPrev(false);
        }
    }
    catch(error){
        console.log("Errores de validación:", error.message);
        setExito(false);
        setMensaje(error.message);
        setShowprogrees(0);
        setGrabando(false);
        setSuccessSB(false);
        setErrorSB(true);
        setSuccessSBPrev(false);
    };
       
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
                        Agregar Vencimiento x Terminacion de CUIT
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
                                <MDInput
                                    type="number"
                                    name="terminacionCuit"
                                    required
                                    label="Terminacion de CUIT"
                                    variant="standard"
                                    value={terminacionCuit}
                                    onChange={(e) => setTerminacionCuit(e.target.value)}
                                    fullWidth
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
                                    multiple  // Habilita la selección múltiple
                                    style={{ flex: 1 }}
                                    // Adicionalmente, puedes establecer otras propiedades para controlar el comportamiento de la selección múltiple
                                    // Por ejemplo:
                                    defaultValue={[]} // Si deseas iniciar con opciones seleccionadas
                                    //getOptionSelected={(option, value) => option.idTareaTipo === value.idTareaTipo} // Personaliza la comparación de igualdad
                                    isOptionEqualToValue={(option, value) =>
                                        option.nombre === value.nombre
                                      }
                                    //value={selectedValueTareaTipo} // Si estás controlando las opciones seleccionadas externamente
                                    // onChange={(event, newValue) => {
                                    //     setSelectedOptions(newValue);
                                    // }} // Si deseas controlar las opciones seleccionadas
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
                                <MDBox mb={1} style={{ display: "flex", gap: "16px" }}>

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
                    <MDSnackbar
                        color="info"
                        notify={true}
                        error={false}
                        icon="notifications"
                        title="Task Manager"
                        content="Generando Vencimientos....."
                        dateTime={dateTime}
                        open={successSBPrev}
                        onClose={closeSuccessSBPrev}
                        close={closeSuccessSBPrev}
                    />
                    {/* </MDButton> */}
                    <MDSnackbar
                        color="success"
                        icon="check"
                        notify={false}
                        error={false}
                        title="Task Manager"
                        content="Vencimientos Generados Correctamente"
                        dateTime={dateTime}
                        open={successSB}
                        onClose={closeSuccessSB}
                        close={closeSuccessSB}
                    />
                    <MDSnackbar
                        color="error"
                        icon="warning"
                        notify={false}
                        error={true}
                        title="Task Manager"
                        content={"Error al generar Vencimientos de Clientes"}
                        dateTime={dateTime}
                        open={errorSB}
                        onClose={closeErrorSB}
                        close={closeErrorSB}
                        autoHideDuration={null}
                    />
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

export default VencimientosAddMasivo;

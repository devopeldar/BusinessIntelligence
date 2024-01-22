// EditarPresupuesto.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasicLayout from "../../layauots/BasicLayout";
import { Card } from "react-bootstrap";

import { PersonFillAdd, Save } from "react-bootstrap-icons";
import { Delete, ExitToApp } from "@mui/icons-material";

import {
    Alert,
    AlertTitle,
    Autocomplete,
    IconButton,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField, Table
} from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDBox from "../../controls/MDBox";
import MDInput from "../../controls/MDInput";
import MDTypography from "../../controls/MDTypography";
import MDButton from "../../controls/MDButton";


const PresupuestoEdit = () => {
    const { id, habilitado } = useParams(); // Obtener el parámetro de la URL (el ID del Presupuesto a editar)
    const [Presupuesto, setPresupuesto] = useState(null);
    const [idPresupuesto, setidPresupuesto] = useState("");
    const [aceptado, setAceptado] = useState(false);
    const [idCliente, setIdCliente] = useState(0);
   
    const [observaciones, setObservaciones] = useState("");
    const [presupuestoxtareastipos, setPresupuestoxTareasTipos] = useState([]);
    const [presupuestoxtareastiposUpdate, setPresupuestoxtareastiposUpdate] = useState([]);
   
    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [mensaje, setMensaje] = useState("");
    const history = useNavigate();
    const [grabando, setGrabando] = useState(false);
    const [controlHabilitado, setControlHabilitado] = useState(false);
    const [exito, setExito] = useState(false);

    const [elementsclientes, setElementsCliente] = useState([]);
   

    const [selectedValueCliente, setSelectedValueCliente] = useState([]);
 
   
    const [elementsTareasTipos, setElementsTareasTipos] = useState([]);
   
    const [selectedValueTareasTipos, setSelectedValueTareasTipos] = useState(
        elementsTareasTipos[0]
    );
   
    const handleVolver = () => {
        history("/PresupuestoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    useEffect(() => {
        setidPresupuesto(id);
        // Aquí realizas la llamada a tu API para obtener el Presupuesto específico por su ID
        const GetPresupuesto = async () => {
            try {
                const reqPresupuesto = {
                    idPresupuesto: id,
                };

                const response = await axios.post(API_URL + `/PresupuestoGetByID`, reqPresupuesto, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = response.data;

                console.log("data Presupuesto" + JSON.stringify(data))

                setObservaciones(data.observaciones);
                //setRolesxPresupuesto(data.tareaxRolDTOs);
                setAceptado(data.aceptado);
                setIdCliente(data.idCliente);
                
                let newRows = [];
                let i = 0;
                if(presupuestoxtareastipos.length > 0){

                    data.presupuestoxtareastipos.forEach((item, index) => {
                        // Incremento index solo si es necesario según la lógica
                        i = i + 1;
                        newRows.push(CargarDatos(item, i));
                    });
    
                    setPresupuestoxtareastiposUpdate(newRows);
                }
               
                if (habilitado === "1") {
                    setControlHabilitado(true);
                } else {
                    setControlHabilitado(false);
                }

                setPresupuesto(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        GetPresupuesto();
    }, [id]);

    useEffect(() => {
        const GetTareaTipo = async () => {
          const response = await axios.post(API_URL + "/TareaTipoListar", {
            headers: {
              accept: "application/json",
            },
          });
    
          console.log("response " + response.data);
          setElementsTareasTipos(response.data);
        };
        GetTareaTipo();
      }, []);

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
    }, [Presupuesto]);

    const handleSubmit = async (event) => {
        try {
            if (observaciones === "") {
                setMensaje("El campo observaciones es obligatorio");
                setExito(false);
                return;
            }
            const request = {
                idPresupuesto: id,
               
                idCliente: selectedValueCliente.idCliente,
                observaciones: observaciones,
                presupuestoxtareastipos: presupuestoxtareastiposUpdate.map(item => ({
                    idTareaTipo: item.idTareaTipo
                })),
                idUsuario: localStorage.getItem('iduserlogueado')
            };
            console.log("formData Presupuesto" + JSON.stringify(request))


            setGrabando(true); // Inicia la grabación
            setnombreboton("Volver");
            setExito(true);
            setMensaje("");
            // Aquí realizas la llamada a tu API para actualizar el Presupuesto con los nuevos datos
            const response = await fetch(API_URL + `/PresupuestoModificacion`, {
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
    const CargarDatos = (item, index) => {
        const newRow = {
            id: index,
            idTareaTipo: item.idTareaTipo,
            nombreTareaTipo: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {item.nombre}
              </MDTypography>
            ),
        };

        return newRow;
    };

    const handleAddTareaTipo = () => {
        const newRow = {
            id: (presupuestoxtareastiposUpdate.length + 1),
            idTareaTipo: selectedValueTareasTipos.idTareaTipo,
            nombreTareaTipo: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {selectedValueTareasTipos.nombre}
                </MDTypography>
            )
        };
        const TareaTipoExistente = presupuestoxtareastiposUpdate.find(
            (item) =>
                item.idTareaTipo === selectedValueTareasTipos.idTareaTipo 
        );



        if (!TareaTipoExistente) {
            setPresupuestoxtareastiposUpdate((prevDatos) => [...prevDatos, newRow]);
        }

    };

    const handleAutocompleteIDClienteChange = (event, value) => {
        setSelectedValueCliente(value);
    };

   

    const eliminarItem = (id) => {
        const newData = presupuestoxtareastiposUpdate.filter((item) => item.id !== id);
        setPresupuestoxtareastiposUpdate(newData);
    };
    //   useEffect(() => {
    //     console.log(
    //       "presupuestoxtareastiposUpdate después de la actualizacióneeeeeeeeeee:",
    //       presupuestoxtareastiposUpdate
    //     );
    //   }, [presupuestoxtareastiposUpdate]);
    if (!Presupuesto) {
        return <BasicLayout image={bgImage}>
        <Card style={{    width: "157%" }}>
           <MDBox
               variant="gradient"
               bgColor="info"
               borderRadius="lg"
               coloredShadow="primary"
               mx={2}
               mt={-3}
               p={3}
               mb={1}
               textAlign="center"
           >
               <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                   Cargando Datos Presupeusto...
               </MDTypography>
           </MDBox>

       </Card>
   </BasicLayout>
    }

    const handleAutocompleteTareaTipoChange = (event, value) => {
        setSelectedValueTareasTipos(value);
    };

    return (
        <BasicLayout image={bgImage}>
            <Card style={{ width: "150%", marginT: "-35px" }}>
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
                    {/*  {!controlHabilitado ? "Cambio de Roles" : "Editar Presupuesto"} */}
                    Editar Presupuesto
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Puede Aceptar el Presupuesto o bien modificar el mismo ante un cambio que haya surgido
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" tarea="form">
                        <MDBox
                            mb={2}
                            style={{
                                display: "flex",
                                gap: "16px",
                                flexDirection: "row",
                                height: "100%", // Asegura que el contenedor principal ocupe el alto completo
                            }}
                        >
                            <div style={{ flex: 1, marginT: "-35px"  }}>
                                <MDBox mb={2}>
                                    <Autocomplete
                                        onChange={handleAutocompleteIDClienteChange}
                                        options={elementsclientes}
                                        value={selectedValueCliente || null}
                                        getOptionLabel={(option) =>
                                            option.nombre || "Seleccione Cliente"
                                        }
                                        disabled={!controlHabilitado}
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
                                    <MDInput
                                        type="text"
                                        name="observaciones"
                                        required
                                        label="Observaciones"
                                        variant="standard"
                                        value={observaciones}
                                        // disabled={!controlHabilitado}
                                        onChange={(e) => setObservaciones(e.target.value)}
                                        fullWidth
                                    />
                                </MDBox>
                            </div>
                            <div style={{ flex: 1 , marginT: "-35px" }}>

                                <MDBox mb={2}>
                                    <Card >
                                        <MDBox
                                            variant="gradient"
                                            bgColor="info"
                                            borderRadius="lg"
                                            coloredShadow="warning"
                                            mx={2}
                                            mt={0}
                                            p={1}
                                            mb={1}
                                            textAlign="center"
                                        >
                                            <MDTypography
                                                variant="h8"
                                                fontWeight="light"
                                                color="white"
                                                mt={1}
                                            >
                                                Administracion Roles
                                            </MDTypography>
                                        </MDBox>
                                        <MDBox mb={2}>
                                            <MDBox mb={2} mr={4} ml={4}>
                                                <Autocomplete
                                                    onChange={handleAutocompleteTareaTipoChange}
                                                    options={elementsTareasTipos}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionDisabled={(option) => option.activo === false}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Seleccione Tipo de Tarea"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                />
                                            </MDBox>
                                            
                                            <MDBox mb={2} mr={6} ml={6}>
                                                <MDButton
                                                    onClick={() => {
                                                        handleAddTareaTipo();
                                                    }}
                                                    variant="gradient"
                                                    color="info"
                                                    endIcon={<PersonFillAdd />}
                                                    fullWidth
                                                >
                                                    Agregar Tipo de Tarea
                                                </MDButton>
                                            </MDBox>

                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableBody>

                                                        {presupuestoxtareastiposUpdate.map((item) => (
                                                            <TableRow key={item.id}>
                                                                <TableCell style={{ display: "none" }}>
                                                                    {item.id}
                                                                </TableCell>
                                                                <TableCell style={{ display: "none" }}>
                                                                    {item.idTareaTipo}
                                                                </TableCell>
                                                                <TableCell>{item.nombreTareaTipo}</TableCell>
                                                                
                                                                <TableCell>
                                                                    <IconButton
                                                                        aria-label="Eliminar"
                                                                        onClick={() => eliminarItem(item.id)}
                                                                    >
                                                                        <Delete color="error" />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </MDBox>
                                    </Card>
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

export default PresupuestoEdit;

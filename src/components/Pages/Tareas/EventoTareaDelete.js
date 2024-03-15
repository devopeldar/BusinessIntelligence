// EditarTarea.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasicLayout from "../../layauots/BasicLayout";
import { Card } from "react-bootstrap";

import { PersonFillAdd, Save } from "react-bootstrap-icons";
import { Delete, DeleteForever, ExitToApp } from "@mui/icons-material";

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


const EventoTareaDelete = () => {
    const { id, habilitado } = useParams(); // Obtener el parámetro de la URL (el ID del Tarea a editar)
    const [Tarea, setTarea] = useState(null);
    const [idTarea, setidTarea] = useState("");
    const [activo, setActivo] = useState(false);
    const [idCliente, setIdCliente] = useState(0);
    const [idDepartamento, setIdDepartamento] = useState(0);
    const [idTareaTipo, setIdTareaTipo] = useState(0);
    const [vencimientoDias, setVencimientoDias] = useState(0);
    const [observaciones, setObservaciones] = useState("");
    const [rolesxTarea, setRolesxTarea] = useState([]);
    const [rolesxTareaUpdate, setRolesxTareaUpdate] = useState([]);
    const [fechaVencimientoLegal, setFechaVencimientoLegal] = useState("");
    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [mensaje, setMensaje] = useState("");
    const history = useNavigate();
    const [grabando, setGrabando] = useState(false);
    const [controlHabilitado, setControlHabilitado] = useState(true);
    const [exito, setExito] = useState(false);

    const [elementsclientes, setElementsCliente] = useState([]);
    const [elementsDepto, setElementsDepto] = useState([]);
    const [elementsTipoTarea, setElementsTipoTarea] = useState([]);

    const [selectedValueCliente, setSelectedValueCliente] = useState([]);
    const [selectedValueDepartamentos, setSelectedValueDepartamentos] = useState(
        []
    );
    const [selectedValueTipoTarea, setSelectedValueTipoTarea] = useState([]);

    const [elementsUsuario, setElementsUsuario] = useState([]);
    const [elementsRol, setElementsRol] = useState([]);
    const [selectedValueUsuario, setSelectedValueUsuario] = useState(
        elementsUsuario[0]
    );
    const [selectedValueRol, setSelectedValueRol] = useState(elementsRol[0]);
    const datosMapeados = null;
    const handleVolver = () => {
        history("/TareaVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    useEffect(() => {
        setidTarea(id);
        // Aquí realizas la llamada a tu API para obtener el Tarea específico por su ID
        const GetTarea = async () => {
            try {
                const reqTarea = {
                    idTarea: id,
                };

                const response = await axios.post(API_URL + `/TareaGetByID`, reqTarea, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = response.data;


                setObservaciones(data.observaciones);
                setRolesxTarea(data.tareaxRolDTOs);
                setActivo(data.activo);
                setIdCliente(data.idCliente);
                setIdDepartamento(data.idDepartamento);
                setIdTareaTipo(data.idTareaTipo);
                setVencimientoDias(data.vencimientoDias);

                const fechaOriginal = data.fechaVencimientoLegal;
                const fechaFormateada = new Date(fechaOriginal)
                    .toISOString()
                    .split("T")[0];

                setFechaVencimientoLegal(fechaFormateada);

                let newRows = [];
                let i = 0;
                data.tareaxRolDTOs.forEach((item, index) => {
                    // Incremento index solo si es necesario según la lógica
                    i = i + 1;
                    newRows.push(CargarDatos(item, i));
                });

                setRolesxTareaUpdate(newRows);
                
                setControlHabilitado(false);
                
                setTarea(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        GetTarea();
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
    }, [Tarea]);

    useEffect(() => {
        const GetDepartamento = async () => {
            const response = await axios.post(API_URL + "/DepartamentoListar", {
                headers: {
                    accept: "application/json",
                },
            });
            setElementsDepto(response.data);

            const defaultValueId = idDepartamento; // ID del elemento que deseas seleccionar por defectoa asd asd asd asd a sdasd asd asd
            const defaultValue = response.data.find(
                (item) => item.idDepartamento === defaultValueId
            );
            setSelectedValueDepartamentos(defaultValue);
        };
        GetDepartamento();
    }, [Tarea]);

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
    }, [Tarea]);

    useEffect(() => {
        const GetRol = async () => {

            const response = await axios.post(API_URL + "/RolListar", {
                headers: {
                    accept: "application/json",
                },
            });

            setElementsRol(response.data);
        };
        GetRol();
    }, []);

    useEffect(() => {
        const GetUsuario = async () => {

            const response = await axios.post(API_URL + "/UsuarioListar", {
                headers: {
                    accept: "application/json",
                },
            });

            setElementsUsuario(response.data);
        };
        GetUsuario();
    }, []);

    const handleSubmit = async (event) => {
        try {
            if (observaciones === "") {
                setMensaje("El campo observaciones es obligatorio");
                setExito(false);
                return;
            }
            const request = {
                idTarea: id,
                idUsuario: localStorage.getItem('iduserlogueado'),
                usuario: localStorage.getItem("userlogueado"),
                origenAcceso: "web"
            };
            console.log("formData Tarea" + JSON.stringify(request))


            setGrabando(true); // Inicia la grabación
            setnombreboton("Volver");
            setExito(true);
            setMensaje("");
            // Aquí realizas la llamada a tu API para actualizar el Tarea con los nuevos datos
            const response = await fetch(API_URL + `/TareaEliminar`, {
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
            id: index, // O ajusta este valor según la lógica que necesites
            idUsuario: item.idUsuario,
            nombreUsuario: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {item.nombreUsuario}
                </MDTypography>
            ),
            idRol: item.idRol,
            nombreRol: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {item.nombreRol}
                </MDTypography>
            ),
        };

        return newRow;
    };

    const handleAddRol = () => {
        const newRow = {
            id: (rolesxTareaUpdate.length + 1),
            idUsuario: selectedValueUsuario.idUsuario,
            nombreUsuario: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {selectedValueUsuario.nombre}
                </MDTypography>
            ),
            idRol: selectedValueRol.idRol,
            nombreRol: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {selectedValueRol.descripcion}
                </MDTypography>
            ),
        };
        const usuarioExistente = rolesxTareaUpdate.find(
            (item) =>
                item.idUsuario === selectedValueUsuario.idUsuario &&
                item.idRol === selectedValueRol.idRol
        );



        if (!usuarioExistente) {
            setRolesxTareaUpdate((prevDatos) => [...prevDatos, newRow]);
        }

    };

    const handleAutocompleteIDClienteChange = (event, value) => {
        setSelectedValueCliente(value);
    };

    const handleAutocompleteDeptoChange = (event, value) => {
        setSelectedValueDepartamentos(value);
    };

    const handleAutocompleteTareaTipoChange = (event, value) => {
        setSelectedValueTipoTarea(value);
    };
    const handleAutocompleteUserChange = (event, value) => {
        setSelectedValueUsuario(value);
    };

    const handleAutocompleteRolChange = (event, value) => {
        setSelectedValueRol(value);
    };

    const eliminarItem = (id) => {
        const newData = rolesxTareaUpdate.filter((item) => item.id !== id);
        setRolesxTareaUpdate(newData);
    };
    //   useEffect(() => {
    //     console.log(
    //       "rolesxTareaUpdate después de la actualizacióneeeeeeeeeee:",
    //       rolesxTareaUpdate
    //     );
    //   }, [rolesxTareaUpdate]);
    if (!Tarea) {
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
                   Cargando Datos de Tarea...
               </MDTypography>
           </MDBox>

       </Card>
   </BasicLayout>
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
                        Eliminar Tarea
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Al continuar el sistema eliminara la tarea.
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
                                <MDBox mb={2} style={{ display: "flex", gap: "16px" }}>
                                    <Autocomplete
                                        onChange={handleAutocompleteTareaTipoChange}
                                        options={elementsTipoTarea}
                                        value={selectedValueTipoTarea || null}
                                        getOptionLabel={(option) => option.nombre || "Seleccione Tipo de Tarea"}
                                        getOptionDisabled={(option) => option.activo === false}
                                        disabled={!controlHabilitado}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Seleccione Tipo de Tarea"
                                                variant="outlined"
                                            />
                                        )}
                                        style={{ flex: 1 }}  // Añade esta línea
                                    />

                                    <Autocomplete
                                        onChange={handleAutocompleteDeptoChange}
                                        options={elementsDepto}
                                        value={selectedValueDepartamentos || null}
                                        disabled={!controlHabilitado}
                                        getOptionLabel={(option) => option.nombre || "Seleccione Departamento"}
                                        getOptionDisabled={(option) => option.activo === false}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Seleccione Departamento"
                                                variant="outlined"
                                            />
                                        )}
                                        style={{ flex: 1 }}  // Añade esta línea
                                    />
                                </MDBox>
                                <MDBox mb={2} style={{ display: "flex", gap: "16px" }}>
                                    <MDInput
                                        type="number"
                                        name="vencimientodias"
                                        required
                                        label="Vencimiento en Dias"
                                        variant="standard"
                                        value={vencimientoDias}
                                        disabled={!controlHabilitado}
                                        onChange={(e) => setVencimientoDias(e.target.value)}
                                        fullWidth
                                    />

                                    <MDInput
                                        type="date"
                                        name="fechaVencimientoLegal"
                                        required
                                        label="Vencimiento legal"
                                        variant="standard"
                                        value={fechaVencimientoLegal}
                                        disabled={!controlHabilitado}
                                        onChange={(e) => setFechaVencimientoLegal(e.target.value)}
                                        fullWidth
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
                                        disabled={!controlHabilitado}
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
                                            

                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableBody>

                                                        {rolesxTareaUpdate.map((item) => (
                                                            <TableRow key={item.id}>
                                                                <TableCell style={{ display: "none" }}>
                                                                    {item.id}
                                                                </TableCell>
                                                                <TableCell style={{ display: "none" }}>
                                                                    {item.idUsuario}
                                                                </TableCell>
                                                                <TableCell>{item.nombreUsuario}</TableCell>
                                                                <TableCell style={{ display: "none" }}>
                                                                    {item.idRol}
                                                                </TableCell>
                                                                <TableCell>{item.nombreRol}</TableCell>
                                                               
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
                                    endIcon={<DeleteForever />}
                                    disabled={grabando}
                                    fullWidth
                                >
                                    Eliminar Tarea
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

export default EventoTareaDelete;

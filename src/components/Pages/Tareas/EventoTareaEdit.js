// EditarTarea.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasicLayout from "../../layauots/BasicLayout";
import { Card } from "react-bootstrap";

import { PersonFillAdd, Save, Table } from "react-bootstrap-icons";
import { Delete, ExitToApp } from "@mui/icons-material";

import { Alert, AlertTitle, Autocomplete,  IconButton, Paper, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import Cliente from "../../Utils/cliente";
import TipoTarea from "../../Utils/tipoTarea";
import Departamento from "../../Utils/departamento";
import Usuarios from "../../Utils/usuarios";
import MDBox from "../../controls/MDBox";
import MDInput from "../../controls/MDInput";
import MDTypography from "../../controls/MDTypography";
import MDButton from "../../controls/MDButton";
import Roles from "../../Utils/roles";


const EventoTareaEdit = () => {
    const { id, habilitado } = useParams(); // Obtener el parámetro de la URL (el ID del Tarea a editar)
    const [Tarea, setTarea] = useState(null);
    const [idTarea, setidTarea] = useState("");
    const [activo, setActivo] = useState(false);
    const [idCliente, setIdCliente] = useState(0);
    const [idDepartamento, setIdDepartamento] = useState(0);
    const [idTareaTipo, setIdTareaTipo] = useState(0);
    const [vencimientoDias, setVencimientoDias] = useState(0);
    const [observaciones, setObservaciones] = useState("");
    const [data, setData] = useState([]);
    const [fechaVencimientoLegal, setFechaVencimientoLegal] = useState("");
    const [tareaxRoles, setTareaxRoles] = useState("");
    const [nombreboton, setnombreboton] = useState("Cancelar");
    const [mensaje, setMensaje] = useState("");
    const history = useNavigate();
    const [grabando, setGrabando] = useState(false);
    const [exito, setExito] = useState(false);
    const clientes =null;
    //const clientes = Cliente();

    const tipoTarea = TipoTarea();
    const departamentos = Departamento();
    const roles = Roles();
    const usuarios = Usuarios();
    const [selectedValueCliente, setSelectedValueCliente] = useState([]);
    const [selectedValueDepartamentos, setSelectedValueDepartamentos] = useState(departamentos[0]);
    const [selectedValueTipoTarea, setSelectedValueTipoTarea] = useState(tipoTarea[0]);
    const [elementsUsuario, setElementsUsuario] = useState([]);
    const [elementsRol, setElementsRol] = useState([]);
    const [selectedValueUsuario, setSelectedValueUsuario] = useState(elementsUsuario[0]);
    const [selectedValueRol, setSelectedValueRol] = useState(elementsRol[0]);
    const handleVolver = () => {
        history("/TareaVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    
 
    useEffect(() => {
        setidTarea(id);
        // Aquí realizas la llamada a tu API para obtener el Tarea específico por su ID
        const GetTarea = async () => {

           

            try {
                const reqTarea = {
                    idTarea: id
                };

                const response = await axios.post(API_URL + `/TareaGetByID`, reqTarea, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = response.data;
                console.log("data", data);
                setTarea(data);
                setObservaciones(data.observaciones);
                setTareaxRoles(data.tareaxRolDTOs);
                setActivo(data.activo);
                setIdCliente(data.idCliente);
                setIdDepartamento(data.idDepartamento);
                setIdTareaTipo(data.idTareaTipo);
                setVencimientoDias(data.vencimientoDias);

                const fechaOriginal = data.fechaVencimientoLegal;
                const fechaFormateada = new Date(fechaOriginal).toISOString().split('T')[0];

                setFechaVencimientoLegal(fechaFormateada);
                // console.log("clientes", clientes);
                // const defaultValueCliente = clientes.find(item => item.idCliente === data.idCliente);
                // setSelectedValueCliente(defaultValueCliente)
                const defaultValueDepto = departamentos.find(item => item.idDepartamento === data.idDepartamento);
                setSelectedValueCliente(defaultValueDepto)
                const defaultValueTipoTarea = tipoTarea.find(item => item.idTareaTipo === data.idTareaTipo);
                setSelectedValueCliente(defaultValueTipoTarea)
                setData(data.tareaxRolDTOs);

                setElementsRol(roles)
                setElementsUsuario(usuarios)

            } catch (error) {
                console.error("Error:", error);
            }
        };
        GetTarea();
    }, [id]);


    useEffect(() => {
        const fetchClientes = async () => {
          try {
            const clientes = await Cliente();
            console.log("clientes", clientes);
    
            const defaultValueCliente = clientes.find(item => item.idCliente === idCliente);
            setSelectedValueCliente(defaultValueCliente);
          } catch (error) {
            console.error('Error fetching clientes:', error);
          }
        };
    
        fetchClientes();
    
      }, [idCliente]);
      
    const handleSubmit = async (event) => {

        try {

            if (observaciones === '') {
                setMensaje("El campo observaciones es obligatorio");
                setExito(false);
                return;
            }
            setGrabando(true); // Inicia la grabación
            setnombreboton("Volver");
            setExito(true);
            setMensaje('');
            // Aquí realizas la llamada a tu API para actualizar el Tarea con los nuevos datos
            const response = await fetch(API_URL + `/TareaModificacion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idTarea, observaciones, activo }),
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

    const handleAddRol = () => {
        const newRow = {
            id: (data.length + 1),
            idUsuario: (
                selectedValueUsuario.idUsuario
            ),
            usuario: (
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
            idRol: (
                selectedValueRol.idRol
            ),
            rol: (
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
        const usuarioExistente = data.find(item => item.idUsuario === selectedValueUsuario.idUsuario && item.idRol === selectedValueRol.idRol);


        if (!usuarioExistente) {
            setData(prevDatos => [...prevDatos, newRow]);
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

        const newData = data.filter(item => item.id !== id);
        setData(newData);
    };

    if (!Tarea) {
        return <div>Cargando Tareas...</div>;
    }

    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="warning"
                    borderRadius="lg"
                    coloredShadow="warning"
                    mx={2}
                    mt={-3}
                    p={3}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Editar Tarea
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Un Tarea especifica las tareas que tienen que cumplir los encargados de las mismas
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" tarea="form">

                        
                        <MDBox mb={2}>
                            <Autocomplete
                                onChange={handleAutocompleteIDClienteChange}
                                options={clientes}
                                value={selectedValueCliente}
                                getOptionLabel={(option) => option.nombre || "Seleccione Cliente"}
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
                                onChange={handleAutocompleteTareaTipoChange}
                                options={tipoTarea}
                                value={selectedValueTipoTarea}
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
                        <MDBox mb={2}>
                            <Autocomplete 
                                onChange={handleAutocompleteDeptoChange}
                                options={departamentos}
                                value={selectedValueDepartamentos}
                                getOptionLabel={(option) => option.nombre}
                                getOptionDisabled={(option) => option.activo === false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Seleccione Departamento"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="number"
                                name="vencimientodias"
                                required
                                label="Vencimiento en Dias"
                                variant="standard"
                                value={vencimientoDias}
                                onChange={(e) => setVencimientoDias(e.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
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
                            <Card>
                                <MDBox
                                    variant="gradient"
                                    bgColor="warning"
                                    borderRadius="lg"
                                    coloredShadow="warning"
                                    mx={2}
                                    mt={0}
                                    p={1}
                                    mb={1}
                                    textAlign="center"
                                >
                                    <MDTypography variant="h8" fontWeight="light" color="white" mt={1}>
                                        Administracion Roles
                                    </MDTypography>
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDBox mb={2} mr={4} ml={4}>
                                        <Autocomplete
                                            onChange={handleAutocompleteUserChange}
                                            options={elementsUsuario}

                                            getOptionLabel={(option) => option.nombre}
                                            getOptionDisabled={(option) => option.activo === false}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Seleccione Usuario"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </MDBox>
                                    <MDBox mb={2} mr={4} ml={4}>
                                        <Autocomplete
                                            onChange={handleAutocompleteRolChange}
                                            options={elementsRol}

                                            getOptionLabel={(option) => option.descripcion}
                                            getOptionDisabled={(option) => option.activo === false}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Seleccione Rol"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </MDBox>
                                    <MDBox mb={2} mr={6} ml={6}>
                                        <MDButton
                                            onClick={() => {
                                                handleAddRol();
                                            }}
                                            variant="gradient"
                                            color="warning"
                                            endIcon={<PersonFillAdd />}
                                            fullWidth
                                        >
                                            Agregar Rol
                                        </MDButton>
                                    </MDBox>
                                    <TableContainer component={Paper}>
                                        <Table>

                                            <TableBody>
                                                {data.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell style={{ display: 'none' }} >{item.idTareaxRol}</TableCell>
                                                        <TableCell style={{ display: 'none' }}>{item.idUsuario}</TableCell>
                                                        <TableCell>{item.nombreUsuario}</TableCell>
                                                        <TableCell style={{ display: 'none' }}>{item.idRol}</TableCell>
                                                        <TableCell>{item.nombreRol}</TableCell>
                                                        <TableCell>
                                                            <IconButton aria-label="Eliminar" onClick={() => eliminarItem(item.idTareaxRol)}>
                                                                <Delete color="error" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </MDBox>
                            </Card>
                        </MDBox>
                        <MDBox mt={4} mb={1}>
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
                        </MDBox>
                        <MDBox mt={4} mb={1}>
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

export default EventoTareaEdit;

import React, { useState } from "react";
import {
    Table,
    TableContainer,
    TableRow,
    TableBody,
    Autocomplete,
    Grid,
    TextField,
    IconButton,
    TableHead,
    TableCell,
    Collapse,
    CardActions,
    Tooltip,
    Fade
} from "@mui/material";
//import { MDBox, MDTypography, MDInput, MDPagination } from "your-md-components";

import DataTableHeadCell from "../../controls/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "../../controls/Tables/DataTable/DataTableBodyCell";
import MDBox from "../../controls/MDBox";
import DashboardLayout from "../../controls/DashboardLayout";
import DashboardNavbar from "../../controls/DashboardNavbar";
import { Card } from "react-bootstrap";
import MDTypography from "../../controls/MDTypography";
import { PencilSquare } from "react-bootstrap-icons";
import Cliente from "../../Utils/cliente";
import TipoTarea from "../../Utils/tipoTarea";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AdminPanelSettings, AppRegistration, AppsOutage, AssignmentTurnedInTwoTone, Filter, FilterAlt, Notes } from "@mui/icons-material";
import { startOfMonth } from "date-fns";
import { addMonths } from "date-fns";
import DatePicker from "react-datepicker";
import MDButton from "../../controls/MDButton";
import EstadoDetalle from "../../Utils/estadoDetalle";
import Usuarios from "../../Utils/usuarios";

function transformData(data) {
    const result = {};

    data.forEach(item => {
        const key = item.idNoConformidad;

        if (!result[key]) {
            result[key] = {
                cliente: item.cliente,
                tareatipo: item.tareaTipo,
                ejecutor: item.ejecutor,
                detalletarea: []
            };
        }

        item.noConformidadDetalleLista.forEach(detalle => {
            const detalleTarea = {
                idtarea: detalle.idTarea,
                tareaestado: detalle.tareaEstado,
                conformidadEstado: detalle.conformidadEstado,
                observaciones: detalle.observaciones,
                idNoConformidadDetalle: detalle.idNoConformidadDetalle,
                usuarioAdministrador: detalle.usuarioAdministrador,
                idNoConformidadEstado: detalle.idNoConformidadEstado
            };

            result[key].detalletarea.push(detalleTarea);
        });
    });

    return Object.values(result);
}

const mainRowStyle = {
    backgroundColor: "#f9f9f9", // Color tenue para la fila principal
    '&:hover': {
        backgroundColor: "#f1f1f1" // Color al pasar el ratón
    }
};

const subRowStyle = {
    backgroundColor: "#fafafa" // Color tenue para la subfila
};

function DataTable({ data }) {
    const Nombre = ({ descrip }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography
                display="block"
                variant="caption"
                color="dark"
                size="small"
            >
                {descrip}
            </MDTypography>


        </MDBox>
    );

    const Observaciones = ({ descrip }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography
                display="block"
                variant="caption"
                color="dark"
                size="small"
                width="500px"
            >
                {mostrarTexto(descrip)}
            </MDTypography>


        </MDBox>
    );


    const [expandedRows, setExpandedRows] = useState([]);

    const handleRowClick = (index) => {
        const currentExpandedRows = [...expandedRows];
        const isRowCurrentlyExpanded = currentExpandedRows.includes(index);

        if (isRowCurrentlyExpanded) {
            const rowIndex = currentExpandedRows.indexOf(index);
            currentExpandedRows.splice(rowIndex, 1);
        } else {
            currentExpandedRows.push(index);
        }

        setExpandedRows(currentExpandedRows);
    };


    function mostrarTexto(texto) {
        //const texto = "2024/06/04 16:48:16 Usuario Sistema: El usuario luisgauchat cambio el estado de -Pendiente Ejecutor- a -En Observacion-. \\n2024/06/04 16:48:40 Usuario Sistema: El usuario luisgauchat cambio el estado de -En Observacion- a -Solucionando-. \\n2024/06/04 16:48:40 Usuario luisgauchat: estoy probando. \\n2024/06/04 16:49:15 Usuario luisgauchat: estoy probando de nuevo. \\n2024/06/04 16:50:38 Usuario Sistema: El usuario luisgauchat cambio el estado de -Solucionando- a -Accion Correctiva No Funciono-. \\n2024/06/04 16:50:38 Usuario luisgauchat: estoy probando de nuevo, otra vez. \\n2024/06/04 16:51:22 Usuario luisgauchat: estoy probando de nuevo, otra vez, de nuevo.";

        const lineas = separarPorSaltosDeLinea(texto);
        const textoFormateado = lineas.join('\\\\n'); // Unimos las líneas con saltos de línea
        return textoFormateado;
    }

    function separarPorSaltosDeLinea(texto) {
        return texto.split('\\\\n');
    }

    const renderRow = (row, index) => {
        const isRowExpanded = expandedRows.includes(index);

        return (
            <React.Fragment key={index}>
                {/* <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}> */}
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <DataTableBodyCell >{row.cliente}</DataTableBodyCell>
                    <DataTableBodyCell>{row.tareatipo}</DataTableBodyCell>
                    <DataTableBodyCell>{row.ejecutor}</DataTableBodyCell>
                    <DataTableBodyCell style={{ width: '50px' }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleRowClick(index)}
                        >
                            {isRowExpanded ? <KeyboardArrowUpIcon color="warning" /> : <KeyboardArrowDownIcon color="info" />}
                        </IconButton>
                    </DataTableBodyCell>
                </TableRow>
                {isRowExpanded && (
                    <TableRow >
                        <DataTableBodyCell style={{ paddingLeft: 91, paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                            <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
                                <MDBox margin={1} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', padding: '16px', borderRadius: '8px' }}>
                                    <Table aria-label="detalle">
                                        <TableHead sx={{ display: 'contents' }}>
                                            <TableRow>
                                                <DataTableHeadCell sorted={false}>ID Tarea</DataTableHeadCell>
                                                <DataTableHeadCell sorted={false}>Estado Tarea</DataTableHeadCell>
                                                <DataTableHeadCell sorted={false}>Estado</DataTableHeadCell>
                                                <DataTableHeadCell sorted={false}>Observaciones</DataTableHeadCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody  >
                                            {row.detalletarea.map((detalle) => (
                                                <TableRow key={detalle.idtarea} sx={{ ...subRowStyle }}>
                                                    <DataTableBodyCell><Nombre descrip={detalle.idtarea} /></DataTableBodyCell>
                                                    <DataTableBodyCell><Nombre descrip={detalle.tareaestado} /></DataTableBodyCell>
                                                    <DataTableBodyCell><Nombre descrip={detalle.conformidadEstado} /></DataTableBodyCell>
                                                    <DataTableBodyCell sx={{ whiteSpace: 'pre-line' }}>
                                                        <Observaciones descrip={detalle.observaciones} />
                                                    </DataTableBodyCell>
                                                    <DataTableBodyCell><MDBox ml={2}>
                                                        <MDTypography
                                                            variant="caption"
                                                            color="text"
                                                            fontWeight="medium"
                                                        >

                                                            <Link
                                                                to={`../TratamientoNoConformidadView/${detalle.idNoConformidadDetalle}`}
                                                            >
                                                                <AppsOutage titleAccess="Ver detalles de la no conformidad" color="success" fontSize="large" />
                                                            </Link>

                                                        </MDTypography>

                                                    </MDBox></DataTableBodyCell>
                                                    {detalle.idNoConformidadEstado !== 3 && detalle.idNoConformidadEstado !== 4 && (
                                                        <>
                                                            <DataTableBodyCell>
                                                                <MDBox ml={2}>
                                                                    <MDTypography
                                                                        variant="caption"
                                                                        color="text"
                                                                        fontWeight="medium"
                                                                    >
                                                                        <Link to={`../TratamientoNoConformidadEdit/${detalle.idNoConformidadDetalle}`}>
                                                                            <AppRegistration titleAccess="Editar acciones de no conformidad" color="blue" fontSize="large" />
                                                                        </Link>
                                                                    </MDTypography>
                                                                </MDBox>
                                                            </DataTableBodyCell>

                                                            {detalle.usuarioAdministrador && (
                                                                <DataTableBodyCell>
                                                                    <MDBox ml={2}>
                                                                        <MDTypography
                                                                            variant="caption"
                                                                            color="text"
                                                                            fontWeight="medium"
                                                                        >
                                                                            <Link to={`../TratamientoNoConformidadAuditor/${detalle.idNoConformidadDetalle}`}>
                                                                                <AdminPanelSettings titleAccess="Modificar estado de la no conformidad" color="warning" fontSize="large" />
                                                                            </Link>
                                                                        </MDTypography>
                                                                    </MDBox>
                                                                </DataTableBodyCell>
                                                            )}
                                                        </>
                                                    )}

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </MDBox>
                            </Collapse>
                        </DataTableBodyCell>
                    </TableRow>
                )}
            </React.Fragment>
        );
    };
    return (
        <TableContainer sx={{ boxShadow: "none" }} >
            <Table aria-label="collapsible table" sx={{ tableLayout: 'fixed' }}>
                <MDBox component="thead">
                    <TableRow>

                        <DataTableHeadCell sorted={false}>Cliente</DataTableHeadCell>
                        <DataTableHeadCell sorted={false}>Tarea Tipo</DataTableHeadCell>
                        <DataTableHeadCell sorted={false}>Ejecutor</DataTableHeadCell>
                        <DataTableHeadCell sx={{ width: '10px' }} sorted={false}>*</DataTableHeadCell>
                    </TableRow>
                </MDBox>
                <TableBody>
                    {data.map((row, index) => renderRow(row, index))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Prueba() {
    const history = useNavigate();
    const [data, setData] = useState([]);

    const [error, setError] = useState([]);

    const clientes = Cliente();
    const tareastipos = TipoTarea();
    const estadodetalles = EstadoDetalle();
    //const usuarios = Usuarios();
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const firstDayOfMonth = startOfMonth(thirtyDaysAgo);
    const firstDayOfNextMonth = startOfMonth(addMonths(today, 1));

    // Inicializamos selectedDateFrom fuera del bloque if-else
    let selectedDateFromInitialValue = firstDayOfMonth;
    let selectedDateToInitialValue = firstDayOfNextMonth;

    // Verificamos si existe la cookie
    const filtroFechaDesdeCookie = getCookie("FILTROFECHADESDE");
    if (filtroFechaDesdeCookie !== null) { selectedDateFromInitialValue = new Date(filtroFechaDesdeCookie); }

    const [selectedDateFrom, setSelectedDateFrom] = React.useState(selectedDateFromInitialValue);


    const filtroFechaHastaCookie = getCookie("FILTROFECHAHASTA");
    if (filtroFechaHastaCookie !== null) {
        selectedDateToInitialValue = new Date(filtroFechaHastaCookie);
    }

    const [selectedDateTo, setSelectedDateTo] = React.useState(selectedDateToInitialValue);

    let selectedValueEstadoDetalleValue = estadodetalles[0];

    const filtroEstadoDetalleCookie = getCookie("FILTROTRATNOCONFORMIDADESTADODETALLE");
    if (filtroEstadoDetalleCookie !== null) { const filtroEstadoDetalleObjeto = JSON.parse(filtroEstadoDetalleCookie); selectedValueEstadoDetalleValue = filtroEstadoDetalleObjeto; }

    const [selectedValueEstadoDetalle, setSelectedValueEstadoDetalle] = useState(selectedValueEstadoDetalleValue);


    let selectedValueTareaTipoValue = tareastipos[0];
    const filtroTareaTipoCookie = getCookie("FILTROTRATNOCONFORMIDADTIPOTAREA");
    if (filtroTareaTipoCookie !== null) { const filtroTareaTipoObjeto = JSON.parse(filtroTareaTipoCookie); selectedValueTareaTipoValue = filtroTareaTipoObjeto; }

    const [selectedValueTareaTipo, setSelectedValueTareaTipo] = useState(selectedValueTareaTipoValue);

    let selectedValueClienteValue = clientes[0];

    const filtroClienteCookie = getCookie("FILTROTRATNOCONFORMIDADCLIENTE");
    if (filtroClienteCookie !== null) { const filtroClienteObjeto = JSON.parse(filtroClienteCookie); selectedValueClienteValue = filtroClienteObjeto; }

    const [selectedValueCliente, setSelectedValueCliente] = useState(selectedValueClienteValue);


    // let selectedValueUsuariosValue = usuarios[0];

    // const filtroUsuarioCookie = getCookie("FILTROTRATNOCONFORMIDADUSUARIO");
    // if (filtroUsuarioCookie !== null) { const filtroUsuarioObjeto = JSON.parse(filtroUsuarioCookie); selectedValueUsuariosValue = filtroUsuarioObjeto; }

    // const [selectedValueUsuarios, setSelectedValueUsuarios] = useState(selectedValueUsuariosValue);

    // const handleAutocompleteUsuarioChange = (event, value) => {
    //     setSelectedValueUsuarios(value);
    //     setCookie("FILTROTRATNOCONFORMIDADUSUARIO", JSON.stringify(value), 1400)
    // };

    const handleAutocompleteClienteChange = (event, value) => {
        setSelectedValueCliente(value);
        setCookie("FILTROTRATNOCONFORMIDADCLIENTE", JSON.stringify(value), 1400)
    };
    const handleAutocompleteTareaTipoChange = (event, value) => {
        setSelectedValueTareaTipo(value);
        setCookie("FILTROTRATNOCONFORMIDADTIPOTAREA", JSON.stringify(value), 1400)
    };
    const handleAutocompleteEstadoDetalleChange = (event, value) => {
        setSelectedValueEstadoDetalle(value);
        setCookie("FILTROTRATNOCONFORMIDADESTADODETALLE", JSON.stringify(value), 1400)
    };
    function setCookie(name, value, minutes) {
        const expires = new Date();
        expires.setTime(expires.getTime() + minutes * 60 * 1000);

        // Formatea la cookie con el nombre, el valor y la fecha de vencimiento
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }
    const handleFilter = () => {
        fetchData(); // Llamada desde el evento del botón
    };

    function getCookie(name) {
        const cookieName = `${name}=`;
        const cookies = document.cookie.split(';');

        // Busca la cookie por su nombre
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null; // Retorna null si no se encuentra la cookie
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const requsuario = {
                idUsuario: localStorage.getItem("iduserlogueado"),
                idCliente: selectedValueCliente?.idCliente || 0,
                idTareaTipo: selectedValueTareaTipo?.idTareaTipo || 0,
                idNoConformidadEstado: selectedValueEstadoDetalle?.idNoConformidadEstado || 0,
                fechaDesde: selectedDateFrom ? selectedDateFrom : firstDayOfMonth,
                fechaHasta: selectedDateTo ? selectedDateTo : firstDayOfNextMonth,
            };

            const response = await axios.post(
                API_URL + "/NoConformidadListarDTO",
                requsuario,
                {
                    headers: {
                        accept: "application/json",
                    },
                }
            );
            console.log("response", response.data)
            setData(response.data);

            return response.data;

        } catch (ex) {
            setError(ex);

            console.log(error);
            return false;
        }
    }

    const transformedData = transformData(data);
    //const [open2, setOpen] = React.useState(false);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Tratamiento No Conformidades
                                </MDTypography>
                            </MDBox>
                            <MDBox mb={2} mt={3} mr={1} ml={2} pr={10}>
                                <MDBox style={{ marginBotton: "17px" }} >
                                    <MDButton
                                        onClick={() => {
                                            handleFilter();
                                        }}
                                        variant="gradient"
                                        color="info"
                                        endIcon={<FilterAlt />}
                                        text="contained"
                                    >
                                        Filtrar
                                    </MDButton>
                                </MDBox>
                                <MDBox style={{ marginTop: "15px", display: "flex" }} >
                                    <MDBox >
                                        <DatePicker
                                            style={{ marginRight: "5px" }}
                                            selected={selectedDateFrom}
                                            onChange={(date) => {
                                                setSelectedDateFrom(date);
                                                setCookie("FILTROFECHADESDE", date, 1400)
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            customInput={
                                                <TextField variant="outlined" label="Fecha Desde" />
                                            }
                                            isClearable // Agrega un botón para borrar la fecha seleccionada
                                            showYearDropdown // Muestra un dropdown para seleccionar el año
                                            yearDropdownItemNumber={10} // Especifica cuántos años mostrar en el dropdown
                                            scrollableYearDropdown // Permite desplazarse por el dropdown de años
                                        />
                                    </MDBox>
                                    <MDBox ml={2} >
                                        <DatePicker
                                            style={{ marginLeft: "5px" }}
                                            selected={selectedDateTo}
                                            onChange={(date) => {
                                                setSelectedDateTo(date);
                                                setCookie("FILTROFECHAHASTA", date, 1400)
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            customInput={
                                                <TextField variant="outlined" label="Fecha Hasta" />
                                            }
                                            isClearable // Agrega un botón para borrar la fecha seleccionada
                                            showYearDropdown // Muestra un dropdown para seleccionar el año
                                            yearDropdownItemNumber={10} // Especifica cuántos años mostrar en el dropdown
                                            scrollableYearDropdown // Permite desplazarse por el dropdown de años
                                        />
                                    </MDBox>
                                </MDBox>
                                <MDBox style={{ marginTop: "5px", display: "flex" }} >
                                    <MDBox mb={2} mt={3} mr={2}>
                                        <Autocomplete
                                            options={clientes}
                                            getOptionLabel={(option) =>
                                                option.nombre || "Seleccione Cliente"
                                            }
                                            // getOptionSelected={(option, value) =>
                                            //     option.idCliente === value.idCliente
                                            // }
                                            isOptionEqualToValue={(option, value) => {
                                                // Aquí defines cómo comparar una opción con un valor
                                                return option.idCliente === value.idCliente && option.nombre === value.nombre;
                                            }}
                                            value={selectedValueCliente || null}
                                            onChange={handleAutocompleteClienteChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Seleccione Cliente"
                                                    variant="outlined"
                                                    style={{ width: `250px` }}
                                                />
                                            )}
                                        />
                                    </MDBox>
                                    <MDBox mb={2} mt={3} mr={2}>
                                        <Autocomplete
                                            options={tareastipos}
                                            getOptionLabel={(option) =>
                                                option.nombre || "Seleccione Tipo Tarea"
                                            }
                                            // getOptionSelected={(option, value) =>
                                            //     option.idTareaTipo === value.idTareaTipo
                                            // }
                                            isOptionEqualToValue={(option, value) => {
                                                // Aquí defines cómo comparar una opción con un valor
                                                return option.idTareaTipo === value.idTareaTipo && option.nombre === value.nombre;
                                            }}
                                            value={selectedValueTareaTipo || null}
                                            onChange={handleAutocompleteTareaTipoChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Seleccione  Tipo Tarea"
                                                    variant="outlined"
                                                    style={{ width: `250px` }}
                                                />
                                            )}
                                        />
                                    </MDBox>
                                </MDBox>
                                <MDBox style={{ marginTop: "2px", display: "flex" }} >
                                    <MDBox mb={2} mt={1} mr={2}>
                                        <Autocomplete
                                            options={estadodetalles}
                                            getOptionLabel={(option) =>
                                                option.conformidadEstado || "Seleccione Estado No Conformidad"
                                            }
                                            // getOptionSelected={(option, value) =>
                                            //     option.idTareaTipo === value.idTareaTipo
                                            // }
                                            isOptionEqualToValue={(option, value) => {
                                                // Aquí defines cómo comparar una opción con un valor
                                                return option.idNoConformidadEstado === value.idNoConformidadEstado && option.conformidadEstado === value.conformidadEstado;
                                            }}
                                            value={selectedValueEstadoDetalle || null}
                                            onChange={handleAutocompleteEstadoDetalleChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Seleccione  Estado No Conformidad"
                                                    variant="outlined"
                                                    style={{ width: `350px` }}
                                                />
                                            )}
                                        />
                                    </MDBox>
                                    {/* <MDBox mb={2} mt={1} mr={2}>
                                        <Autocomplete
                                            options={usuarios}
                                            getOptionLabel={(option) =>
                                                option.nombre || "Seleccione Usuario"
                                            }
                                            // getOptionSelected={(option, value) =>
                                            //     option.idTareaTipo === value.idTareaTipo
                                            // }
                                            isOptionEqualToValue={(option, value) => {
                                                // Aquí defines cómo comparar una opción con un valor
                                                return option.idUsuario === value.idUsuario && option.nombre === value.nombre;
                                            }}
                                            value={selectedValueUsuarios || null}
                                            onChange={handleAutocompleteUsuarioChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Seleccione  Ejecutor"
                                                    variant="outlined"
                                                    style={{ width: `250px` }}
                                                />
                                            )}
                                        />
                                    </MDBox> */}
                                </MDBox>
                                <DataTable isSorted={false}
                                    entriesPerPage={true}
                                    showTotalEntries={true}
                                    canSearch={false}
                                    noEndBorder data={transformedData} />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>

    );
}

export default Prueba;
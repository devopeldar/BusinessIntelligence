import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "../../controls/DashboardLayout";
import DashboardNavbar from "../../controls/DashboardNavbar";
import MDBox from "../../controls/MDBox";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { Card } from "react-bootstrap";
import MDTypography from "../../controls/MDTypography";
import MDButton from "../../controls/MDButton";
import DataTable from "../../controls/Tables/DataTable";
import { BuildingFillAdd } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import {
    Checklist,
    Filter,
    NoteAlt,
} from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cliente from "../../Utils/cliente";
import { addMonths, startOfMonth } from "date-fns";
import axios from "axios";
import API_URL from "../../../config";
import MDBadge from "../../controls/MDBadge";
import Departamento from "../../Utils/departamento";
import TipoTarea from "../../Utils/tipoTarea";
import Meses from "../../Utils/Meses";
import Anios from "../../Utils/Anios";

function VencimientosList() {
    const history = useNavigate();
    const handleAdd = () => {
        history("/VencimientosAdd"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState([]);

    const clientes = Cliente();
    const tareastipos = TipoTarea();
    const meses = Object.values(Meses);
    const anios = Object.values(Anios);
    const [selectedValueCliente, setSelectedValueCliente] = useState(clientes[0]);
    const [selectedValueTareaTipo, setSelectedValueTareaTipo] = useState(
        tareastipos[0]
    );
    const [selectedValueMes, setSelectedValueMes] = useState(
        meses[0]
    );
    const [selectedValueAnio, setSelectedValueAnio] = useState(
        anios[0]
    );
    
    const today = new Date();
    const firstDayOfMonth = startOfMonth(today);
    const firstDayOfNextMonth = startOfMonth(addMonths(today, 1));
    const [selectedDateFrom, setSelectedDateFrom] =
        React.useState(firstDayOfMonth);
    const [selectedDateTo, setSelectedDateTo] =
        React.useState(firstDayOfNextMonth);
    useEffect(() => {
        fetchDataTareas();
    }, []);

    const handleFilter = () => {
        fetchDataTareas(); // Llamada desde el evento del botón
    };

    const handleAutocompleteClienteChange = (event, value) => {
        setSelectedValueCliente(value);
    };
    const handleAutocompleteTareaTipoChange = (event, value) => {
        setSelectedValueTareaTipo(value);
    };
    const handleAutocompleteMesChange = (event, value) => {
        setSelectedValueMes(value);
    };
    const handleAutocompleteAnioChange = (event, value) => {
        setSelectedValueAnio(value);
    };
    
    const Nombre = ({ cliente, nombreTipoTarea }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography
                display="block"
                variant="caption"
                color="dark"
                fontWeight="bold"
            >
                {cliente}
            </MDTypography>

            <MDTypography
                display="block"
                variant="caption"
                color="primary"
                fontWeight="bold"
            >
                Tipo de Tarea : {nombreTipoTarea}
            </MDTypography>

        </MDBox>
    );

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const day = formattedDate.getDate().toString().padStart(2, "0");
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // El mes es devuelto de 0 a 11, por eso se le suma 1
        const year = formattedDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchDataTareas = async () => {
        try {
            const requsuario = {
                //idUsuario: localStorage.getItem("iduserlogueado"),
                idCliente: selectedValueCliente?.idCliente || 0,
                idTareaTipo: selectedValueTareaTipo?.idTareaTipo || 0,
                mes: selectedValueMes?.valor || 0,
                anio: selectedValueAnio?.valor || 2024,
            };
            console.log(requsuario);
            const response = await axios.post(
                API_URL + "/VencimientosLegalesListar",
                requsuario,
                {
                    headers: {
                        accept: "application/json",
                    },
                }
            );

            console.log("response.data", response.data)
            const data = response.data.map((Vencimiento) => {
                const clienteNombre = (
                    <Nombre
                        cliente={Vencimiento.nombreCliente}
                        nombreTipoTarea={Vencimiento.nombreTipoTarea}

                    />
                );


                const fecha = (
                    <>
                        <MDBox ml={2}>
                            <MDTypography
                                variant="caption"
                                color="info"
                                fontWeight="medium"
                            >
                                Mes :{Vencimiento.mes}{" "}
                            </MDTypography>
                            <MDTypography
                                variant="caption"
                                color="info"
                                fontWeight="medium"
                            >
                                Año :{Vencimiento.anio}
                            </MDTypography>
                        </MDBox>

                        <MDBox ml={2}>

                            <MDTypography
                                variant="caption"
                                color="warning"
                                fontWeight="medium"
                            >
                                Fecha Vencimiento Legal :{formatDate(Vencimiento.fechaVencimientoLegal)}
                            </MDTypography>

                        </MDBox>
                    </>
                );
                const action = (
                    <MDBox ml={2}>


                        <MDTypography
                            variant="caption"
                            color="text"
                            fontWeight="medium"
                        >
                            <Link
                                to={`../VencimientosEdit/${Vencimiento.idVencimientosLegales}`}
                            >
                                <Checklist
                                    fontSize="large"
                                    color="success"
                                    titleAccess="Editar Vencimiento"
                                />
                            </Link>
                        </MDTypography>

                    </MDBox>
                );

                return {
                    idVencimientosLegales: Vencimiento.idVencimientosLegales,
                    nombre: clienteNombre,
                    fecha: fecha,
                    action: action,
                };
            });
            setRows(data);

            setColumns([
                {
                    Header: "Cliente",
                    accessor: "nombre",
                    width: "30%",
                    align: "left",
                },
                { Header: "Fecha", accessor: "fecha", align: "left" },

                {
                    Header: "Acciones",
                    width: "15%",
                    accessor: "action",
                    align: "center",
                },
            ]);
        } catch (ex) {
            setError(ex);

            console.log(error);
        }
    };

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
                                    Vencimientos Legales
                                </MDTypography>
                            </MDBox>
                            <MDBox mb={2} mt={3} mr={1} ml={2} pr={10}>
                                <MDBox mb={2} mt={3} mr={1} style={{ display: "block" }}>
                                    <MDButton
                                        onClick={() => {
                                            handleAdd();
                                        }}
                                        variant="gradient"
                                        color="success"
                                        endIcon={<BuildingFillAdd />}
                                        text="contained"
                                    >
                                        Agregar
                                    </MDButton>
                                    <MDButton
                                        onClick={() => {
                                            handleFilter();
                                        }}
                                        variant="gradient"
                                        color="info"
                                        endIcon={<Filter />}
                                        text="contained"
                                    >
                                        Filtrar
                                    </MDButton>
                                </MDBox>
                                {/* <MDBox mb={2} mt={3} style={{ display: "block" }}>
                                    <DatePicker
                                        style={{ marginRight: "2px" }}
                                        selected={selectedDateFrom}
                                        onChange={(date) => setSelectedDateFrom(date)}
                                        dateFormat="dd/MM/yyyy"
                                        customInput={
                                            <TextField variant="outlined" label="Fecha Venc. Desde" />
                                        }
                                        isClearable // Agrega un botón para borrar la fecha seleccionada
                                        showYearDropdown // Muestra un dropdown para seleccionar el año
                                        yearDropdownItemNumber={10} // Especifica cuántos años mostrar en el dropdown
                                        scrollableYearDropdown // Permite desplazarse por el dropdown de años
                                    />
                                    <DatePicker
                                        style={{ marginRight: "2px" }}
                                        selected={selectedDateTo}
                                        onChange={(date) => setSelectedDateTo(date)}
                                        dateFormat="dd/MM/yyyy"
                                        customInput={
                                            <TextField variant="outlined" label="Fecha Venc. Hasta" />
                                        }
                                        isClearable // Agrega un botón para borrar la fecha seleccionada
                                        showYearDropdown // Muestra un dropdown para seleccionar el año
                                        yearDropdownItemNumber={10} // Especifica cuántos años mostrar en el dropdown
                                        scrollableYearDropdown // Permite desplazarse por el dropdown de años
                                    />
                                </MDBox> */}
                                <MDBox mb={2} mt={3} style={{ display: "flex" }}>
                                    <MDBox mb={2} mt={3} mr={2}>
                                        <Autocomplete
                                            options={clientes}
                                            getOptionLabel={(option) =>
                                                option.nombre || "Seleccione Cliente"
                                            }
                                            getOptionSelected={(option, value) =>
                                                option.idCliente === value.idCliente
                                            }
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
                                            getOptionSelected={(option, value) =>
                                                option.idTareaTipo === value.idTareaTipo
                                            }
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

                                    <MDBox mb={2} mt={3} mr={2}>
                                        <Autocomplete
                                            options={meses}
                                            getOptionLabel={(option) =>
                                                option.descripcion || "Seleccione Mes"
                                            }
                                            getOptionSelected={(option, value) =>
                                                option.mes === value
                                            }
                                            value={selectedValueMes || null}
                                            onChange={handleAutocompleteMesChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Seleccione Mes"
                                                    variant="outlined"
                                                    fontSize="small"
                                                    style={{ width: `200px` }}
                                                />
                                            )}
                                        />

                                    </MDBox>
                                    <MDBox mb={2} mt={3} mr={2}>
                                        <Autocomplete
                                            options={anios}
                                            getOptionLabel={(option) =>
                                                option.descripcion || "Seleccione Año"
                                            }
                                            getOptionSelected={(option, value) =>
                                                option.anio === value
                                            }
                                            value={selectedValueAnio || null}
                                            onChange={handleAutocompleteAnioChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Seleccione Año"
                                                    variant="outlined"
                                                    fontSize="small"
                                                    style={{ width: `150px` }}
                                                />
                                            )}
                                        />

                                    </MDBox>
                                </MDBox>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted={true}
                                    entriesPerPage={true}
                                    showTotalEntries={true}
                                    canSearch={false}
                                    noEndBorder
                                    pagination={{ color: "info", variant: "gradient" }}
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            {/* <Footer /> */}
        </DashboardLayout>
    );
}

export default VencimientosList;

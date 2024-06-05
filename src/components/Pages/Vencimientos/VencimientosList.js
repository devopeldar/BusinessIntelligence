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
import { BuildingFillAdd, PencilSquare } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import {
    Add,
    Delete,
    Filter,
} from "@mui/icons-material";
import "react-datepicker/dist/react-datepicker.css";
import Cliente from "../../Utils/cliente";
import axios from "axios";
import API_URL from "../../../config";
import TipoTarea from "../../Utils/tipoTarea";
import Meses from "../../Utils/Meses";
import Anios from "../../Utils/Anios";

function VencimientosList() {
    const history = useNavigate();
    const handleAdd = () => {
        history("/VencimientosAdd"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    const handleAddMasivo = () => {
        history("/VencimientosAddMasivo"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };
    const handleDeleteMasivo = () => {
        history("/VencimientosDeleteByCode"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };
    
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState([]);

    const clientes = Cliente();
    const tareastipos = TipoTarea();
    const meses = Object.values(Meses);
    const anios = Object.values(Anios);
 
    let selectedValueMesValue = new Date().getMonth()+ 1;
  const filtroMesCookie = getCookie("FILTROVTOMES");
    if (filtroMesCookie !== null) {const filtroMesObjeto = JSON.parse(filtroMesCookie);  selectedValueMesValue = filtroMesObjeto;}

  const [selectedValueMes, setSelectedValueMes] = useState(selectedValueMesValue);

  let selectedValueAnioValue = anios[0];

  const filtroAnioCookie = getCookie("FILTROVTOANIO");
    if (filtroAnioCookie !== null) {const filtroAnioObjeto = JSON.parse(filtroAnioCookie);  selectedValueAnioValue = filtroAnioObjeto;}

  const [selectedValueAnio, setSelectedValueAnio] = useState(selectedValueAnioValue);



  let selectedValueTareaTipoValue = tareastipos[0];

  const filtroTareaTipoCookie = getCookie("FILTROVTOTAREATIPO");
    if (filtroTareaTipoCookie !== null) {const filtroTareaTipoObjeto = JSON.parse(filtroTareaTipoCookie);  selectedValueTareaTipoValue = filtroTareaTipoObjeto;}

  const [selectedValueTareaTipo, setSelectedValueTareaTipo] = useState(selectedValueTareaTipoValue);

  let selectedValueClienteValue = clientes[0];

  const filtroClienteCookie = getCookie("FILTROVTOCLIENTE");
    if (filtroClienteCookie !== null) {const filtroClienteObjeto = JSON.parse(filtroClienteCookie);  selectedValueClienteValue = filtroClienteObjeto;}

  const [selectedValueCliente, setSelectedValueCliente] = useState(selectedValueClienteValue);



  function setCookie(name, value, minutes) {
    const expires = new Date();
    expires.setTime(expires.getTime() + minutes * 60 * 1000);
  
    // Formatea la cookie con el nombre, el valor y la fecha de vencimiento
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
  
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


    useEffect(() => {
        fetchDataTareas();
    });

    const handleFilter = () => {
        fetchDataTareas(); // Llamada desde el evento del botón
    };

    const handleAutocompleteClienteChange = (event, value) => {
        setSelectedValueCliente(value);
        setCookie("FILTROVTOCLIENTE", JSON.stringify(value), 1400) 
    };
    const handleAutocompleteTareaTipoChange = (event, value) => {
        setSelectedValueTareaTipo(value);
        setCookie("FILTROVTOTAREATIPO", JSON.stringify(value), 1400) 
    };
    const handleAutocompleteMesChange = (event, value) => {
        setSelectedValueMes(value);
        setCookie("FILTROVTOMES", JSON.stringify(value), 1400) 
    };
    const handleAutocompleteAnioChange = (event, value) => {
        setSelectedValueAnio(value);
        setCookie("FILTROVTOANIO", JSON.stringify(value), 1400) 
    };
    
    const Nombre = ({ cliente, nombreTipoTarea, codigoCarga }) => (
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
            <MDTypography
                display="block"
                variant="caption"
                color="success"
                fontWeight="bold"
            >
                Codigo de Carga : {codigoCarga}
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

            
            const data = response.data.map((Vencimiento) => {
                const clienteNombre = (
                    <Nombre
                        cliente={Vencimiento.nombreCliente}
                        nombreTipoTarea={Vencimiento.nombreTipoTarea}
                        codigoCarga = {Vencimiento.codigoCarga}
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
                                 <PencilSquare color="blue" fontSize="large" />
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
                                            handleAddMasivo();
                                        }}
                                        variant="gradient"
                                        color="primary"
                                        endIcon={<Add />}
                                        text="contained"
                                    >
                                        Agregar x Terminacion CUIT
                                    </MDButton>
                                    <MDButton
                                        onClick={() => {
                                            handleDeleteMasivo();
                                        }}
                                        variant="gradient"
                                        color="warning"
                                        endIcon={<Delete />}
                                        text="contained"
                                    >
                                        Eliminar Vencimientos x Cod. Carga
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
                               
                                <MDBox mb={2} mt={3} style={{ display: "flex" }}>
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

                                    <MDBox mb={2} mt={3} mr={2}>
                                        <Autocomplete
                                            options={meses}
                                            getOptionLabel={(option) =>
                                                option.descripcion || "Seleccione Mes"
                                            }
                                            // getOptionSelected={(option, value) =>
                                            //     option.mes === value
                                            // }
                                            //(getOptionSelected={(option, value) => option.valor === value.valor}
                                            isOptionEqualToValue={(option, value) => {
                                                // Aquí defines cómo comparar una opción con un valor
                                                return option.valor === value.valor && option.descripcion === value.descripcion;
                                              }}
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
                                    isSorted={false}
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

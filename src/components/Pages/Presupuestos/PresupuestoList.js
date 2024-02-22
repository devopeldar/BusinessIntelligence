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
  CopyAll,
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
import EstadosSiNo from "../../Utils/estadossino";

function PresupuestoList() {
  const history = useNavigate();
  const handleAdd = () => {
    history("/PresupuestoAdd"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);

  const clientes = Cliente();
  const departamentos = Departamento();
  const estadosino = Object.values(EstadosSiNo);

  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const firstDayOfMonth = startOfMonth(thirtyDaysAgo);
  const firstDayOfNextMonth = startOfMonth(addMonths(today, 1));



  let selectedEstadoInitialValue = estadosino[0];
  
  const filtroEstadoCookie = getCookie("FILTROPRESUPUESTOESTADO");
  if (filtroEstadoCookie !== null) {const filtroEstadoObjeto = JSON.parse(filtroEstadoCookie);  selectedEstadoInitialValue = filtroEstadoObjeto;}

  const [selectedValueAceptado, setSelectedValueAceptado] = useState(selectedEstadoInitialValue);
  
  
  let selectedClienteInitialValue = clientes[0];
  
  const filtroClienteCookie = getCookie("FILTROPRESUPUESTOCLIENTE");
  if (filtroClienteCookie !== null) {const filtroClienteObjeto = JSON.parse(filtroClienteCookie);  selectedClienteInitialValue = filtroClienteObjeto;}

  const [selectedValueCliente, setSelectedValueCliente] = useState(selectedClienteInitialValue);
  
  
  let selectedDeptoInitialValue = departamentos[0];

  const filtroDeptoCookie = getCookie("FILTROPRESUPUESTODEPTO");
  if (filtroDeptoCookie !== null) {const filtroDeptoObjeto = JSON.parse(filtroDeptoCookie);  selectedDeptoInitialValue = filtroDeptoObjeto;}

  const [selectedValueDepartamento, setSelectedValueDepartamento] = useState(selectedDeptoInitialValue);

    let selectedDateFromInitialValue = firstDayOfMonth;
    let selectedDateToInitialValue = firstDayOfNextMonth;
    
    // Verificamos si existe la cookie
    const filtroFechaDesdeCookie = getCookie("FILTROPRESUPUESTOFECHADESDE");
    if (filtroFechaDesdeCookie !== null) {
      selectedDateFromInitialValue = new Date(filtroFechaDesdeCookie);
    }
    
      const [selectedDateFrom, setSelectedDateFrom] = React.useState(selectedDateFromInitialValue);
    
      
      const filtroFechaHastaCookie = getCookie("FILTROPRESUPUESTOFECHAHASTA");
    if (filtroFechaDesdeCookie !== null) {
      selectedDateToInitialValue = new Date(filtroFechaHastaCookie);
    }
    
      const [selectedDateTo, setSelectedDateTo] = React.useState(selectedDateToInitialValue);
    
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
    
      function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    

  useEffect(() => {
    fetchDataTareas();
  }, []);

  const handleFilter = () => {
    fetchDataTareas(); // Llamada desde el evento del botón
  };

  const handleAutocompleteClienteChange = (event, value) => {
    setSelectedValueCliente(value);
    setCookie("FILTROPRESUPUESTOCLIENTE", JSON.stringify(value), 1400) 
  };
  const handleAutocompleteDeptoChange = (event, value) => {
    setSelectedValueDepartamento(value);
    setCookie("FILTROPRESUPUESTODEPTO", JSON.stringify(value), 1400) 
  };
  const handleAutocompleteAceptadoChange = (event, value) => {
    setSelectedValueAceptado(value);
    setCookie("FILTROPRESUPUESTOESTADO", JSON.stringify(value), 1400) 
  };           
  
  const handleDateFromChange = (date) => {
    setSelectedDateFrom(date);
  };
  const handleDateToChange = (date) => {
    setSelectedDateTo(date);
  };
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // El mes es devuelto de 0 a 11, por eso se le suma 1
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const Nombre = ({ cliente, fechaCreacion, fechaAceptacion, depto }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        {cliente}
      </MDTypography>

      {/* <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        Departamento: {depto}
      </MDTypography> */}

      <MDTypography
        variant="caption"
        display="block"
        color="success"
        fontWeight="light"
      >
        Fecha Creacion :{formatDate(fechaCreacion)}
      </MDTypography>
      <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="info"
        fontWeight="bold"
      >
        Aceptado :{fechaAceptacion ? formatDate(fechaAceptacion) : "--/--/--"}{" "}
      </MDTypography>
    </MDBox>
  );

  const fetchDataTareas = async () => {
    try {
      const requsuario = {
        //idUsuario: localStorage.getItem("iduserlogueado"),
        idCliente: selectedValueCliente?.idCliente || 0,
        idDepartamento: selectedValueDepartamento?.idDepartamento || 0,
        aceptado: selectedValueAceptado?.valor || false,
        fechaDesde: selectedDateFrom ? selectedDateFrom : firstDayOfMonth,
        fechaHasta: selectedDateTo ? selectedDateTo : firstDayOfNextMonth,
      };

      const response = await axios.post(
        API_URL + "/PresupuestoListar",
        requsuario,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      console.log("Presupuesto", response.data);
      const data = response.data.map((Presupuesto) => {
        const clienteNombre = (
          <Nombre
            cliente={Presupuesto.nombre}
            depto={Presupuesto.nombreDepartamento}
            fechaCreacion={Presupuesto.fechaCreacion}
            fechaAceptacion={Presupuesto.fechaAceptacion}
          />
        );

        const aceptado = (
          <MDBox ml={-1}>
            {Presupuesto.aceptado === true ? (
              <MDBadge
                badgeContent="Aceptado"
                color="success"
                variant="gradient"
                size="sm"
              />
            ) : (
              <MDBadge
                badgeContent="Pendiente x Cliente"
                color="warning"
                variant="gradient"
                size="sm"
              />
            )}
          </MDBox>
        );

        const action = (
          <MDBox ml={2}>
            <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  <Link
                    to={`../PresupuestoCopy/${Presupuesto.idPresupuesto}`}
                  >
                    <CopyAll
                      fontSize="large"
                      color="success"
                      titleAccess="Duplicar Presupuesto"
                    />
                  </Link>
                </MDTypography>
            {Presupuesto.aceptado === false && (
              <>
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  <Link
                    to={`../PresupuestoAceptar/${Presupuesto.idPresupuesto}/0`}
                  >
                    <Checklist
                      fontSize="large"
                      color="error"
                      titleAccess="Aceptar Presupuesto"
                    />
                  </Link>
                </MDTypography>
                <>
                  <MDTypography
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                  >
                    <Link
                      to={`../PresupuestoEdit/${Presupuesto.idPresupuesto}`}
                    >
                      <NoteAlt
                        fontSize="large"
                        color="info"
                        titleAccess="Editar Presupuesto"
                      />
                    </Link>
                  </MDTypography>
                </>
              </>
            )}
          </MDBox>
        );

        return {
          idPresupuesto: Presupuesto.idPresupuesto,
          nombre: clienteNombre,
          observaciones: Presupuesto.observaciones,
          estado: aceptado,
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
        { Header: "Observaciones", accessor: "observaciones", align: "left" },
        { Header: "Estado", width: "15%", accessor: "estado", align: "left" },

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
                  Presupuestos
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
                <MDBox mb={2} mt={3} style={{ display: "block" }}>
                  <DatePicker
                    style={{ marginRight: "2px" }}
                    selected={selectedDateFrom}
                    onChange={(date) => {setSelectedDateFrom(date);
                      setCookie("FILTROPRESUPUESTOFECHADESDE", date, 1400) }}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <TextField variant="outlined" label="Fecha Desde" />
                    }
                    isClearable // Agrega un botón para borrar la fecha seleccionada
                    showYearDropdown // Muestra un dropdown para seleccionar el año
                    yearDropdownItemNumber={10} // Especifica cuántos años mostrar en el dropdown
                    scrollableYearDropdown // Permite desplazarse por el dropdown de años
                  />
                  <DatePicker
                    style={{ marginRight: "2px" }}
                    selected={selectedDateTo}
                    onChange={(date) => {setSelectedDateTo(date);
                      setCookie("FILTROPRESUPUESTOFECHAHASTA", date, 1400) }}
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
                          style={{ width: `300px` }}
                        />
                      )}
                    />
                  </MDBox>
                  <MDBox mb={2} mt={3} mr={2}>
                    <Autocomplete
                      options={departamentos}
                      getOptionLabel={(option) =>
                        option.nombre || "Seleccione Departamento"
                      }
                      getOptionSelected={(option, value) =>
                        option.idDepartamento === value.idDepartamento
                      }
                      value={selectedValueDepartamento || null}
                      onChange={handleAutocompleteDeptoChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Seleccione Departamento"
                          variant="outlined"
                          style={{ width: `300px` }}
                        />
                      )}
                    />
                  </MDBox>
                  <MDBox mb={2} mt={3} mr={2}>
                    <Autocomplete
                      options={estadosino}
                      getOptionLabel={(option) =>
                        option.descripcion || "Aceptado?"
                      }
                      getOptionSelected={(option, value) =>
                        option.aceptado === value
                      }
                      value={selectedValueAceptado || null}
                      onChange={handleAutocompleteAceptadoChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Aceptado?"
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

export default PresupuestoList;

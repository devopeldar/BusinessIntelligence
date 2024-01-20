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
import { Filter, OneK } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cliente from "../../Utils/cliente";
import { addMonths, startOfMonth } from "date-fns";
import axios from "axios";
import API_URL from "../../../config";
import MDBadge from "../../controls/MDBadge";

function PresupuestoList() {
  const history = useNavigate();
  const handleAdd = () => {
    history("/PresupuestoAdd"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);

  const clientes = Cliente();
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  const firstDayOfNextMonth = startOfMonth(addMonths(today, 1));
  const [selectedDateFrom, setSelectedDateFrom] =
    React.useState(firstDayOfMonth);
  const [selectedDateTo, setSelectedDateTo] =
    React.useState(firstDayOfNextMonth);
  const [selectedValueCliente, setSelectedValueCliente] = useState(clientes[0]);
  useEffect(() => {
    fetchDataTareas();
  }, []);

  const handleFilter = () => {
    fetchDataTareas(); // Llamada desde el evento del botón
  };

  const handleAutocompleteClienteChange = (event, value) => {
    setSelectedValueCliente(value);
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
  const Nombre = ({ cliente, fechaCreacion, fechaAceptacion }) => (
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
        fechaDesde: selectedDateFrom ? selectedDateFrom : firstDayOfMonth,
        fechaHasta: selectedDateTo ? selectedDateTo : firstDayOfNextMonth,
      };
      console.log(requsuario);
      const response = await axios.post(
        API_URL + "/PresupuestoListar",
        requsuario,
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      const data = response.data.map((Presupuesto) => {
        const clienteNombre = (
          <Nombre
            cliente={Presupuesto.nombre}
            fechaCreacion={Presupuesto.fechaCreacion}
            fechaAceptacion={Presupuesto.fechaAceptacion}
          />
        );

        const aceptado = (
          <MDBox ml={-1}>
            {Presupuesto.Aceptado ? (
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
            {Presupuesto.aceptado === 0 && (
              <>
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  <Link to={`../AceptarPresupuesto/${Presupuesto.idTarea}`}>
                    <OneK
                      fontSize="large"
                      color="error"
                      titleAccess="Aceptar Presupuesto"
                    />
                  </Link>
                </MDTypography>
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
        <Grid container spacing={3}>
          <Grid item xs={6}>
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
                <MDBox mb={2} mt={3}  mr={1} style={{ display: "block" }}>
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
                    onChange={(date) => setSelectedDateFrom(date)}
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
                    onChange={(date) => setSelectedDateTo(date)}
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

export default PresupuestoList;

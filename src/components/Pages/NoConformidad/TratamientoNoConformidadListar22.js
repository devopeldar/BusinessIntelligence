import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DashboardLayout from '../../controls/DashboardLayout';
import DashboardNavbar from '../../controls/DashboardNavbar';
import DataTable from '../../controls/Tables/DataTable';
import axios from 'axios';
import API_URL from '../../../config';
import MDBox from '../../controls/MDBox';
import { Autocomplete, Grid, TextField } from '@mui/material';
import MDTypography from '../../controls/MDTypography';
import { PencilSquare } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import Cliente from "../../Utils/cliente";
import TipoTarea from "../../Utils/tipoTarea";


function TratamientoNoConformidadListar() {
  const history = useNavigate();

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);

  const clientes = Cliente();
  const tareastipos = TipoTarea();


  let selectedValueTareaTipoValue = tareastipos[0];

  const filtroTareaTipoCookie = getCookie("FILTROTRATNOCONFORMIDADTIPOTAREA");
    if (filtroTareaTipoCookie !== null) {const filtroTareaTipoObjeto = JSON.parse(filtroTareaTipoCookie);  selectedValueTareaTipoValue = filtroTareaTipoObjeto;}

  const [selectedValueTareaTipo, setSelectedValueTareaTipo] = useState(selectedValueTareaTipoValue);

  let selectedValueClienteValue = clientes[0];

  const filtroClienteCookie = getCookie("FILTROTRATNOCONFORMIDADCLIENTE");
    if (filtroClienteCookie !== null) {const filtroClienteObjeto = JSON.parse(filtroClienteCookie);  selectedValueClienteValue = filtroClienteObjeto;}

  const [selectedValueCliente, setSelectedValueCliente] = useState(selectedValueClienteValue);


  const handleAutocompleteClienteChange = (event, value) => {
    setSelectedValueCliente(value);
    setCookie("FILTROVTOCLIENTE", JSON.stringify(value), 1400) 
};
const handleAutocompleteTareaTipoChange = (event, value) => {
    setSelectedValueTareaTipo(value);
    setCookie("FILTROVTOTAREATIPO", JSON.stringify(value), 1400) 
};
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
  const Nombre = ({ descrip }) => (
    <MDBox lineHeight={1} textAlign="left">
        <MDTypography
            display="block"
            variant="caption"
            color="dark"
        >
            {descrip}
        </MDTypography>


    </MDBox>
);
  useEffect(async () => {
    try {
      const requsuario = {
        idUsuario: localStorage.getItem("iduserlogueado"),
        idCliente: selectedValueCliente?.idCliente || 0,
        idTareaTipo: selectedValueTareaTipo?.idTareaTipo || 0,
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

      const data = response.data.map((item) => {
        const clienteNombre = (
          <Nombre
            descrip={item.cliente}
          
          />
        );
        const tareaTipo = (
          <Nombre
           
          descrip={item.tareaTipo}
           
          />
        );
        const ejecutor = (
          <Nombre
    
          descrip={item.ejecutor}
          />
        );


        
        const action = (
          <MDBox ml={2}>


            <MDTypography
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              <Link
                to={`../TratamientoNoConformidadEdit/${item.idNoConformidadDetalle}`}
              >
                <PencilSquare color="blue" fontSize="large" />
              </Link>
            </MDTypography>

          </MDBox>
        );

        return {
          tareaTipo: tareaTipo,
          nombre: clienteNombre,
          ejecutor: ejecutor,
          action: action,
         
        };
      });
      console.log("assas", data);
      setRows(data);

      setColumns([
        {
          Header: "Cliente",
          accessor: "nombre",
          width: "30%",
          align: "left",
        },
        { Header: "Tipo de Tarea", accessor: "tareaTipo", align: "left" },

        { Header: "Ejecutor", accessor: "ejecutor", align: "left" },

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

  }, []);

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
};
export default TratamientoNoConformidadListar;
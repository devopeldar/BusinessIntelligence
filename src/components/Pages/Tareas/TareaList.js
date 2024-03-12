import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "../../controls/DashboardLayout";
import DashboardNavbar from "../../controls/DashboardNavbar";
import MDBox from "../../controls/MDBox";
import { Autocomplete, Grid, TextField, Tooltip } from "@mui/material";
import { Card } from "react-bootstrap";
import MDTypography from "../../controls/MDTypography";
import MDButton from "../../controls/MDButton";
import DataTable from "../../controls/Tables/DataTable";

import {
  BuildingFillAdd,
  FileExcel,
  FilePdf,
  FilePdfFill,
  Stop,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config";
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import MDSnackbar from "../../controls/MDSnackbar";

import {
  AccessAlarm,
  Delete,
  DoneAll,
  PlayArrow,
  SearchOutlined,
  Pause,
  Filter,
  PeopleAltTwoTone,
  NoteAlt,
  PictureAsPdf,
} from "@mui/icons-material";
import MDProgress from "../../controls/MDProgress";
import EstadoTarea from "../../Utils/estadoTarea";
import Cliente from "../../Utils/cliente";
import TipoTarea from "../../Utils/tipoTarea";
import Departamento from "../../Utils/departamento";
import FechasFiltro from "../../Utils/fechasFiltro";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfMonth, addMonths } from 'date-fns';
import MDInput from "../../controls/MDInput";
function TareaList() {
  //const { columns, rows } = TareaGet();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  const history = useNavigate();
  const [Tareas, setTareas] = useState([]);
  const [espdf, setEsPDF] = useState(false);
  const closeSuccessSB = () => setSuccessSB(false);
  const [successSB, setSuccessSB] = useState(false);
  const closeSuccessSBPrev = () => setSuccessSBPrev(false);
  const [successSBPrev, setSuccessSBPrev] = useState(false);

  const [dateTime, setDateTime] = useState("");

  const [errorSB, setErrorSB] = useState(false);
  // const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const estados = EstadoTarea();
  const clientes = Cliente();
  const tipoTarea = TipoTarea();
  const departamentos = Departamento();
  const fechasfiltro = Object.values(FechasFiltro);

  let nombreusuarioValue = "";
  
  const filtroNombreUsuarioCookie = getCookie("FILTRONOMBREUSUARIO");
if (filtroNombreUsuarioCookie !== null) {const filtroNombreUsuarioObjeto = filtroNombreUsuarioCookie;  nombreusuarioValue = filtroNombreUsuarioObjeto;}

  const [nombreusuario, setNombreUsuario] = useState(nombreusuarioValue);


  let idTareaValue = "0";
  const filtroIdTareaCookie = getCookie("FILTRONROTAREA");
if (filtroIdTareaCookie !== null) {const filtroidTarea = filtroIdTareaCookie;  idTareaValue = filtroidTarea;}

  const [idTarea, setIdTarea] = useState(idTareaValue);


  let selectedEstadoInitialValue = estados[0];
  
  const filtroEstadoCookie = getCookie("FILTROESTADO");
if (filtroEstadoCookie !== null) {const filtroEstadoObjeto = JSON.parse(filtroEstadoCookie);  selectedEstadoInitialValue = filtroEstadoObjeto;}

  const [selectedValuEestado, setSelectedValueEstado] = useState(selectedEstadoInitialValue);

  let selectedTipoFechaInitialValue = fechasfiltro[0];
  
  const filtroTipoFechaCookie = getCookie("FILTROTIPOFECHA");
if (filtroTipoFechaCookie !== null) {const filtroTipoFechaObjeto = JSON.parse(filtroTipoFechaCookie);  selectedTipoFechaInitialValue = filtroTipoFechaObjeto;}

  const [selectedValueFechaFiltro, setSelectedValueFechaFiltro] = useState(selectedTipoFechaInitialValue);

  let selectedClienteInitialValue = clientes[0];
  
  const filtroClienteCookie = getCookie("FILTROCLIENTE");
if (filtroClienteCookie !== null) {const filtroClienteObjeto = JSON.parse(filtroClienteCookie);  selectedClienteInitialValue = filtroClienteObjeto;}

  const [selectedValueCliente, setSelectedValueCliente] = useState(selectedClienteInitialValue);
  
  
  let selectedDeptoInitialValue = departamentos[0];

  const filtroDeptoCookie = getCookie("FILTRODEPTO");
if (filtroDeptoCookie !== null) {const filtroDeptoObjeto = JSON.parse(filtroDeptoCookie);  selectedDeptoInitialValue = filtroDeptoObjeto;}

  const [selectedValueDepartamentos, setSelectedValueDepartamentos] = useState(selectedDeptoInitialValue);

  let selectedTipoTareaInitialValue = tipoTarea[0];

  const filtroTipoTareaCookie = getCookie("FILTROTIPOTAREA");
if (filtroTipoTareaCookie !== null) {const filtroTipoTareaObjeto = JSON.parse(filtroTipoTareaCookie);  selectedTipoTareaInitialValue = filtroTipoTareaObjeto;}

  const [selectedValueTipoTarea, setSelectedValueTipoTarea] = useState(
    selectedTipoTareaInitialValue
  );
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
if (filtroFechaDesdeCookie !== null) {selectedDateFromInitialValue = new Date(filtroFechaDesdeCookie);}

  const [selectedDateFrom, setSelectedDateFrom] = React.useState(selectedDateFromInitialValue);

  
  const filtroFechaHastaCookie = getCookie("FILTROFECHAHASTA");
if (filtroFechaHastaCookie !== null) {
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


  const handleDateFromChange = (date) => {
    setSelectedDateFrom(date);
  };
  const handleDateToChange = (date) => {
    setSelectedDateTo(date);
  };
  useEffect(() => {
    const obtenerFechaHoraActual = () => {
      const fechaHoraActual = new Date();
      const fechaFormateada = obtenerFechaFormateada(fechaHoraActual);
      setDateTime(fechaFormateada);
    };

    obtenerFechaHoraActual();
  }, []);

  const handleAutocompleteEstadoChange = (event, value) => {
    setSelectedValueEstado(value);
    setCookie("FILTROESTADO", JSON.stringify(value), 1400) 
  };
  const handleAutocompleteClienteChange = (event, value) => {
    setSelectedValueCliente(value);
    setCookie("FILTROCLIENTE", JSON.stringify(value), 1400) 
  };
  const handleAutocompleteTipoTareaChange = (event, value) => {
    setSelectedValueTipoTarea(value);
   setCookie("FILTROTIPOTAREA", JSON.stringify(value), 1400) 
  };
  const handleAutocompleteFechaFiltroChange = (event, value) => {
    setSelectedValueFechaFiltro(value);
    setCookie("FILTROTIPOFECHA", JSON.stringify(value), 1400) 
  };

  const handleAutocompleteDeptoChange = (event, value) => {
    setSelectedValueDepartamentos(value);
    setCookie("FILTRODEPTO", JSON.stringify(value), 1400) 
  };
  const obtenerFechaFormateada = (fecha) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    return fecha.toLocaleString("es-ES", options);
  };

  const handleAdd = () => {
    history("/TareaAdd"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  const handleFilter = () => {
    fetchDataTareas(); // Llamada desde el evento del botón
  };

  const fetchDataTareas = async () => {
    try {
      deleteCookie("FILTRONOMBREUSUARIO");
      setCookie("FILTRONOMBREUSUARIO", nombreusuario, 1400) 
      const requsuario = {
        idUsuario: localStorage.getItem("iduserlogueado"),
        idTareaEstado: selectedValuEestado?.idTareaEstado || 0,
        idTarea: idTarea,
        idCliente: selectedValueCliente?.idCliente || 0,
        idDepartamento: selectedValueDepartamentos?.idDepartamento || 0,
        IDTareaTipo: selectedValueTipoTarea?.idTareaTipo || 0,
        CampoFiltroFecha: selectedValueFechaFiltro?.campo || "",
        fechaDesde: selectedDateFrom ? selectedDateFrom : firstDayOfMonth,
        fechaHasta: selectedDateTo ? selectedDateTo : firstDayOfNextMonth,
        roles:nombreusuario
      };

      const response = await axios.post(
        API_URL + "/TareaListarTodo",
        requsuario,
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      const data = response.data.map((Tarea) => {
        let color = "info"; // Valor por defecto

        if (Tarea.porcentajeTrascurrido < 20) {
          color = "error";
        } else if (Tarea.porcentajeTrascurrido > 60) {
          color = "success";
        }

        const estado = (
          <MDBox ml={-1}>
            {Tarea.estado === 1 || Tarea.estado === 2 ? (
              <PlayArrow color="success" fontSize="large" />
            ) : Tarea.estado === 3 ? (
              <Pause color="error" fontSize="large" />
            ) : Tarea.estado === 0 ? (
              <PlayArrow color="warning" fontSize="large" />
            ) : Tarea.estado === 4 ? (
              <DoneAll color="success" fontSize="large" />
            ) : (
              <Stop color="info" fontSize="large" />
            )}
          </MDBox>
        );

        const descripcion = (
          <Nombre
            cliente={Tarea.clienteNombre}
            depto={Tarea.departamentoNombre}
            tareaTipoCodigo={Tarea.tareaTipoCodigo}
            tareaTipoNombre={Tarea.tareaTipoNombre}
            estadoDescripcion={Tarea.estadoDescripcion}
            observaciones={Tarea.observaciones}
             estado = {Tarea.estado}
             IDTarea = {Tarea.idTarea}
            
          />
        );
        const roles = (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {renderRolesWithLineBreaks(Tarea.roles)}
          </MDTypography>
        );
        const fecha = (
          <Fechas
            fechaCreacion={Tarea.fechaCreacion}
            fechaInicio={Tarea.fechaInicio}
            fechaVencimiento={Tarea.fechaVencimiento}
            fechaVencimientoLegal={Tarea.fechaVencimientoLegal}
            fechaFinalizacion={Tarea.fechaFinalizacion}
            tiempoDetenido={Tarea.tiempoDetenido}
            tiempoTranscurrido={Tarea.tiempoTranscurrido}
            progres={Tarea.porcentajeTrascurrido}
            color={color}
          />
        );
        
        const porctranscurrido = (
          <PorcTranscurrido
            progres={Tarea.porcentajeTrascurrido}
            color={color}
          />
        );

        const action = (
          <MDBox ml={2}>
            {Tarea.estado === 0 && (
              <>
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  <Link onClick={() => HandleIniciar(Tarea.idTarea)}>
                    {/* <MDButton variant="text" color="dark" onClick={() => HandleIniciar(Tarea.idTarea)}> */}
                    <PlayArrow
                      fontSize="large"
                      color="success"
                      titleAccess="Iniciar Tarea"
                    />
                  </Link>
                  
                </MDTypography>

                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  <Link to={`../EventoTareaDelete/${Tarea.idTarea}/2`}>
                    <Delete
                      fontSize="large"
                      color="error"
                      titleAccess="Eliminar Tarea"
                    />
                  </Link>
                </MDTypography>

                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  <Link to={`../EventoTareaEdit/${Tarea.idTarea}/1`}>
                    <NoteAlt
                      fontSize="large"
                      color="info"
                      titleAccess="Editar Tarea"
                    />
                  </Link>
                </MDTypography>

              </>

            )}

            {Tarea.estado > 0 && Tarea.estado !== 4 && (
              <MDBox>
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                <Link to={`../EventoTareaAdd/${Tarea.idTarea}`}>
                  <AccessAlarm
                    fontSize="large"
                    color="warning"
                    titleAccess="Agregar Evento a Tarea"
                  />
                </Link>
              </MDTypography>

                <MDTypography
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                <Link to={`../EventoTareaEdit/${Tarea.idTarea}/0`}>
                  <PeopleAltTwoTone
                    fontSize="large"
                    color="success"
                    titleAccess="Cambiar Roles"
                  />
                </Link>
              </MDTypography>
              </MDBox>
            )}
            <MDTypography variant="caption" color="text" fontWeight="medium">
              <Link to={`../TareaTraking/${Tarea.idTarea}`}>
                <SearchOutlined
                  fontSize="large"
                  color="info"
                  titleAccess="Ver traking de Eventos de una Tarea"
                />
              </Link>
            </MDTypography>
            <MDTypography variant="caption" color="text" fontWeight="medium">
              <Link to={`../TareaDocumentacionList/${Tarea.idTarea}`}>
                <PictureAsPdf
                  fontSize="large"
                  color="primary"
                  titleAccess="Subir Archivos"
                />
              </Link>
            </MDTypography>
          </MDBox>
        );

        return {
          idTarea: Tarea.idTarea,
          fecha: fecha,
          roles: roles,
          descripcion: descripcion,
          porctranscurrido: porctranscurrido,
          estado: estado,
          action: action,
        };
      });
      setRows(data);

      setColumns([
        // { Header: "ID Tarea", accessor: "idTarea", align: "left" },
        // { Header: "", width: "10%", accessor: "estado", align: "left" },
        {
          Header: "Descripcion",
          accessor: "descripcion",
          width: "10%",
          align: "left",
        },
        { Header: "Roles", width: "15%", accessor: "roles", align: "left" },
        { Header: "Fechas", accessor: "fecha", align: "left" },
        // {
        //   Header: "Porc. Transcurrido",
        //   accessor: "porctranscurrido",
        //   align: "left",
        // },
        { Header: "Acciones", accessor: "action", align: "center" },
      ]);
    } catch (ex) {
      setError(ex);

      console.log(error);
    }
  };

  const HandleIniciar = async (idTarea) => {
    try {
      setSuccessSBPrev(true);
      const reqtarea = {
        idUsuario: localStorage.getItem("iduserlogueado"),
        idTarea: idTarea,
      };

      const response = await axios.post(API_URL + "/EventoIniciar", reqtarea, {
        headers: {
          accept: "application/json",
        },
      });

      const res = await response.data;

      if (res.rdoAccion) {
        setSuccessSB(true);
        setSuccessSBPrev(false);
        setErrorSB(false);
        fetchDataTareas();
      } else {
        setSuccessSB(false);
        setErrorSB(true);
        setSuccessSBPrev(false);
      }
    } catch (ex) {
      setError(ex);
      setErrorSB(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataTareas();
  }, []);

  const handlePDF = () => {
    setEsPDF(true);
    fetchData();
  };

  // Función para generar el PDF
  const generatePDF = (data) => {
    const doc = new jsPDF('l', 'mm', 'a4');
    console.log("Tareas " ,data);
    const columns = [ "Cliente", "Departamento", "Tarea", "Estado", "Fecha Creacion", "Venc. Legal", "Tiempo Detenido", "Tiempo Transcurrido", "Roles"]; // Ajusta las columnas según tus datos
    const rows = data.map((item) => [
    
      item.clienteNombre,
      item.departamentoNombre,
      item.tareaTipoNombre,
      item.estadoDescripcion,
      formatDate(item.fechaCreacion),
      formatDate(item.fechaVencimientoLegal) ,
      item.tiempoDetenido,
      item.tiempoTranscurrido ,
      item.roles 
      
      // Añade más datos según tu estructura JSON
    ]);

    const header = (cell, y) => {
      doc.setFillColor(51, 122, 183); // Color del encabezado
      doc.setTextColor(255);
      doc.setFontStyle("bold");
      doc.rect(cell.x, cell.y, cell.width, cell.height, "F");
      doc.text(cell.text, cell.x + cell.width / 2, cell.y + cell.height / 2, {
        align: "center",
        valign: "middle",
      });
    };

    const didParseCell = (data) => {
      if (data.section === 'body' && data.column.index === 3) { // Comprueba si es la columna "Estado"
          if (data.cell.raw === 'FINAL - Optimo') { // Si el valor es '1', establece el color de fondo verde
              data.cell.styles.fillColor = [0, 255, 0]; // Verde
          } else if (data.cell.raw === 'SIN INICIAR') { // Si el valor es '3', establece el color de fondo rojo
              data.cell.styles.fillColor = [192, 192, 192]; // gris
            } else if (data.cell.raw === 'Pendientes del Cliente' || data.cell.raw === 'Tarea en proceso normal') { // Si el valor es '3', establece el color de fondo rojo
              data.cell.styles.fillColor = [255, 255, 0]; // amarillo
            } else if (data.cell.raw === 'FINAL - Critico por el Estudio' || data.cell.raw === 'FINAL - Critico por Cliente y Estudio' || data.cell.raw === 'FINAL - Critico por el Cliente') { // Si el valor es '3', establece el color de fondo rojo
              data.cell.styles.fillColor = [255, 0, 0]; // rojo
            } else if (data.cell.raw === 'INICIADO') { // Si el valor es '3', establece el color de fondo rojo
              data.cell.styles.fillColor = [173, 216, 230]; // azul claro
          }
      }
  };

    const options = {
      startY: 10,
      margin: { horizontal: 10 },
      headStyles: { fillColor: [51, 122, 183], textColor: 255 },
      bodyStyles: { textColor: 0 },
      columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 35 }, 2: { cellWidth: 40 }, 3: { cellWidth: 20 }, 4: { cellWidth: 23 }, 5: { cellWidth: 23 }, 6: { cellWidth: 20 },  7: { cellWidth: 20 }, 8: { cellWidth: 60 } }, // Ajusta el ancho de las columnas según sea necesario
      theme: "grid",
      didParseCell : didParseCell,
  };

    // const options = {
    //   startY: 10,
    //   margin: { horizontal: 10 },
    //   headStyles: { fillColor: [51, 122, 183], textColor: 255 },
    //   bodyStyles: { textColor: 0 },
    //   columnStyles: { 0: { cellWidth: 30 } }, // Ajusta el ancho de la primera columna si es necesario
    //   theme: "grid",
    // };

    doc.autoTable(columns, rows, options, header);

    return doc;
  };

  const generateAndDownloadPDF = () => {
    const pdf = generatePDF(Tareas);
    pdf.save("ListadoTareas-PDF.pdf"); // Descarga el archivo PDF
  };

  const handleExcel = () => {
    setEsPDF(false);
    fetchDataExcel();
  };

  const fetchDataExcel = async () => {
    try {
      const requsuario = {
        idUsuario: localStorage.getItem("iduserlogueado"),
        idTareaEstado: selectedValuEestado?.idTareaEstado || 0,
        idCliente: selectedValueCliente?.idCliente || 0,
        idTarea: idTarea,
        idDepartamento: selectedValueDepartamentos?.idDepartamento || 0,
        IDTareaTipo: selectedValueTipoTarea?.idTareaTipo || 0,
        CampoFiltroFecha: selectedValueFechaFiltro?.campo || "",
        fechaDesde: selectedDateFrom ? selectedDateFrom : firstDayOfMonth,
        fechaHasta: selectedDateTo ? selectedDateTo : firstDayOfNextMonth,
        roles:nombreusuario
      };
      const response = await axios.post(API_URL + "/TareaListarTodo", requsuario,{
        headers: {
          accept: "application/json",
        },
      });

      setTareas(response.data);

 
      exportToExcel();
 
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchData = async () => {
    try {
      const requsuario = {
        idUsuario: localStorage.getItem("iduserlogueado"),
        idTareaEstado: selectedValuEestado?.idTareaEstado || 0,
        idCliente: selectedValueCliente?.idCliente || 0,
        idTarea: idTarea,
        idDepartamento: selectedValueDepartamentos?.idDepartamento || 0,
        IDTareaTipo: selectedValueTipoTarea?.idTareaTipo || 0,
        CampoFiltroFecha: selectedValueFechaFiltro?.campo || "",
        fechaDesde: selectedDateFrom ? selectedDateFrom : firstDayOfMonth,
        fechaHasta: selectedDateTo ? selectedDateTo : firstDayOfNextMonth,
        roles:nombreusuario
      };
      const response = await axios.post(API_URL + "/TareaListarTodo", requsuario,{
        headers: {
          accept: "application/json",
        },
      });

      setTareas(response.data);


      generateAndDownloadPDF();//  exportToExcel(); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
     
    } catch (ex) {
      console.log(ex);
    }
  };

  // Función para exportar datos a Excel
  const exportToExcel = () => {
    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Datos");

    // Definir el encabezado de las columnas
    const headers = [
      "Cliente", "Departamento", "Tarea", "Estado", "Fecha Creacion", "Venc. Legal", "Tiempo Detenido", "Tiempo Transcurrido", "Roles"
    ];

    // Agregar el encabezado a la hoja de cálculo
    const headerRow =worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" } // Gris claro
      };
    });
    console.log("Tareas " + Tareas);
    // Agregar los datos al archivo Excel
    Tareas.forEach((item) => {
      const rowData = [
        item.clienteNombre,
      item.departamentoNombre,
      item.tareaTipoNombre,
      item.estadoDescripcion,
      formatDate(item.fechaCreacion),
      formatDate(item.fechaVencimientoLegal) ,
      item.tiempoDetenido,
      item.tiempoTranscurrido ,
      item.roles 
      
      ];

     
      const row = worksheet.addRow(rowData);
      //worksheet.addRow(rowData);

    //   if (data.section === 'body' && data.column.index === 3) { // Comprueba si es la columna "Estado"
    //     if (data.cell.raw === 'FINAL - Optimo') { // Si el valor es '1', establece el color de fondo verde
    //         data.cell.styles.fillColor = [0, 255, 0]; // Verde
    //     } else if (data.cell.raw === 'SIN INICIAR') { // Si el valor es '3', establece el color de fondo rojo
    //         data.cell.styles.fillColor = [192, 192, 192]; // gris
    //       } else if (data.cell.raw === 'FINAL - Critico por el Cliente') { // Si el valor es '3', establece el color de fondo rojo
    //         data.cell.styles.fillColor = [255, 255, 0]; // amarillo
    //       } else if (data.cell.raw === 'FINAL - Critico por el Estudio' || data.cell.raw === 'FINAL - Critico por Cliente y Estudio') { // Si el valor es '3', establece el color de fondo rojo
    //         data.cell.styles.fillColor = [255, 0, 0]; // rojo
    //       } else if (data.cell.raw === 'INICIADO') { // Si el valor es '3', establece el color de fondo rojo
    //         data.cell.styles.fillColor = [173, 216, 230]; // rojo
    //     }
    // }

      // Cambiar el color de fondo de la celda según el valor de estadoDescripcion
      if ( item.estadoDescripcion === "Pendientes del Cliente" || item.estadoDescripcion === "Tarea en proceso normal") {
        row.getCell(4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFF00" } // Amarillo
        };
      } else if (item.estadoDescripcion === "FINAL - Optimo" || item.estadoDescripcion === "FINAL - Puede Mejorar") {
        row.getCell(4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "00FF00" } // Verde
        };
      } else if (item.estadoDescripcion === "FINAL - Critico por el Cliente" || item.estadoDescripcion === "FINAL - Critico por el Estudio" || item.estadoDescripcion==='FINAL - Critico por Cliente y Estudio') {
        row.getCell(4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF0000" } // Rojo
        };
      } else if (item.estadoDescripcion === "SIN INICIAR" ) {
        row.getCell(4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "CCCCCC" } // gris
        };
      } else if ( item.estadoDescripcion==='INICIADO') {
        row.getCell(4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ADD8E6" } // gris
        };
        
      }


    });

    // Ajustar el ancho de las columnas según el contenido
    worksheet.columns.forEach((column, index) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2; // Establecer el ancho mínimo de la columna
    });

    // Generar el archivo Excel y descargarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);

      // Crear un enlace de descarga para el archivo Excel y hacer clic automáticamente
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ListadoTareas.xlsx");
      document.body.appendChild(link);
      link.click();

      // Limpiar el enlace y la URL después de la descarga
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    });
  };

  const Nombre = ({
    cliente,
    depto,
    tareaTipoCodigo,
    tareaTipoNombre,
    estadoDescripcion,
    observaciones,estado, IDTarea
  }) => (
    
    <MDBox lineHeight={1} textAlign="left">
       <MDBox ml={-1}>
           
          </MDBox>
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
         {estado === 1 || estado === 2 ? (
              <PlayArrow color="success" fontSize="large" />
            ) : estado === 3 ? (
              <Pause color="error" fontSize="large" />
            ) : estado === 0 ? (
              <PlayArrow color="warning" fontSize="large" />
            ) : estado === 4 ? (
              <DoneAll color="success" fontSize="large" />
            ) : (
              <Stop color="info" fontSize="large" />
            )}
       {"["}{IDTarea}{"] - "} {cliente}
      </MDTypography>
      <MDTypography
        display="block"
        variant="caption"
        color="secondary"
        fontWeight="light"
      >
        Depto: {depto}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="info"
        fontWeight="light"
      >
        Tipo Tarea :{tareaTipoNombre} {tareaTipoCodigo}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="success"
        fontWeight="light"
      >
        Estado Tarea :{estadoDescripcion}{" "}
      </MDTypography>
      <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="bold"
      >
        Observaciones :{observaciones}
      </MDTypography>
    </MDBox>
  );

  const PorcTranscurrido = ({ progres, color }) => (
    <MDBox width="310%" ml="auto">
      <MDBox mt={2.85}>
        <MDProgress
          label={true}
          variant="gradient"
          color={color}
          value={progres}
        />
      </MDBox>
    </MDBox>
  );
  const Fechas = ({
    fechaCreacion,
    fechaInicio,
    fechaVencimiento,
    fechaVencimientoLegal,
    fechaFinalizacion,
    tiempoDetenido,
    tiempoTranscurrido,progres,color
  }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        Fecha Creacion: {formatDate(fechaCreacion)}
      </MDTypography>
      <MDTypography
        display="block"
        variant="caption"
        color="info"
        fontWeight="light"
      >
        Fecha Inicio: {fechaInicio ? formatDate(fechaInicio) : "--/--/--"}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="info"
        fontWeight="bold"
      >
        Fecha Finalizacion :
        {fechaFinalizacion ? formatDate(fechaFinalizacion) : "--/--/--"}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="info"
        fontWeight="bold"
      >
        Tiempo Transcurrido :{tiempoTranscurrido}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="error"
        fontWeight="light"
      >
        Fecha Venc. :
        {fechaVencimiento ? formatDate(fechaVencimiento) : "--/--/--"}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="warning"
        fontWeight="light"
      >
        Fecha Venc. Legal :
        {fechaVencimientoLegal ? formatDate(fechaVencimientoLegal) : "--/--/--"}{" "}
      </MDTypography>

      <MDTypography
        variant="caption"
        display="block"
        color="error"
        fontWeight="bold"
      >
        Tiempo Detenido :{tiempoDetenido}{" "}
      </MDTypography>
      <MDBox width="100%" ml="auto">
      <MDBox >
        <MDProgress
          label={true}
          variant="gradient"
          color={color}
          value={progres}
        />
      </MDBox>
    </MDBox>
    </MDBox>
  );

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // El mes es devuelto de 0 a 11, por eso se le suma 1
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderRolesWithLineBreaks = (roles) => {

    if (roles.includes("|")) {
      return roles.split("|").map((role, index) => (
        <React.Fragment key={index}>
          {role}
          {index !== roles.split("|").length - 1 && <br />}{" "}
          {/* Añade <br /> excepto en la última línea */}
        </React.Fragment>
      ));
    }
    return roles;
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
                  Tareas
                </MDTypography>
              </MDBox>
              <MDBox mb={2} mt={3} mr={1} ml={1} style={{ display: "flex" }}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                >
                  <Grid item>
                  <Tooltip title="Agregar Tarea">
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
                    </Tooltip>
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
                    <MDButton
                      onClick={() => {
                        handleExcel();
                      }}
                      variant="gradient"
                      color="warning"
                      endIcon={<FileExcel />}
                      text="contained"
                    >
                      Excel
                    </MDButton>

                    <MDButton
                      onClick={() => {
                        handlePDF();
                      }}
                      variant="gradient"
                      color="error"
                      endIcon={<FilePdf />}
                      text="contained"
                    >
                      PDF
                    </MDButton>
                    <MDBox mb={2} mt={3} >
                    <MDBox>
                      <MDInput
                        type="text"
                        name="idTarea"
                        label="Nro Tarea"
                        variant="standard"
                        value={idTarea}
                        onChange={(e) => setIdTarea(e.target.value)}
                      />
                  </MDBox>
                  <MDBox mb={2}>
                      <MDInput
                        type="text"
                        name="usuario"
                        label="Roles"
                        variant="standard"
                        value={nombreusuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                      />
                  </MDBox>
                  <MDBox mb={2} mt={3} style={{ display: "flex" }}>
                      <MDBox mb={2} mt={3} mr={2}>
                        <Autocomplete
                          options={estados}
                          getOptionLabel={(option) =>
                            option.descripcion ||
                            "Selecciona Estado de Progreso"
                          }
                          getOptionSelected={(option, value) =>
                            option.idTareaEstado === value.idTareaEstado
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.descripcion === value.descripcion
                          }
                          value={selectedValuEestado || null}
                          onChange={handleAutocompleteEstadoChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Selecciona Estado de Progreso"
                              variant="outlined"
                              style={{ width: `300px` }}
                            />
                          )}
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
                          isOptionEqualToValue={(option, value) =>
                            option.nombre === value.nombre
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
                          isOptionEqualToValue={(option, value) =>
                            option.nombre === value.nombre
                          }
                          value={selectedValueDepartamentos || null}
                          onChange={handleAutocompleteDeptoChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Seleccione Departamento"
                              variant="outlined"
                              style={{ width: `200px` }}
                            />
                          )}
                        />
                      </MDBox>
                      <MDBox mb={2} mt={3} mr={2}>
                        <Autocomplete
                          options={tipoTarea}
                          getOptionLabel={(option) =>
                            option.nombre || "Seleccione Tipo de Tarea"
                          }
                          getOptionSelected={(option, value) =>
                            option.idTareaTipo === value.idTareaTipo
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.nombre === value.nombre
                          }
                          value={selectedValueTipoTarea || null}
                          onChange={handleAutocompleteTipoTareaChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Seleccione Tipo de Tarea"
                              variant="outlined"
                              style={{ width: `300px` }}
                            />
                          )}
                        />
                      </MDBox>
                      </MDBox>
                    </MDBox>
                    
                    <MDBox mb={2} mt={3} style={{ display: "block" }}>
                      <MDBox mb={2} mt={3} style={{ display: "block" }}>
                        <Autocomplete
                          options={fechasfiltro}
                          getOptionLabel={(option) =>
                            option.descripcion || "Seleccione Tipo de Fecha"
                          }
                          getOptionSelected={(option, value) =>
                            option.valor === value.valor
                          }
                          value={selectedValueFechaFiltro || null}
                          onChange={handleAutocompleteFechaFiltroChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Seleccione Tipo de Fecha"
                              variant="outlined"
                              style={{ width: `300px` }}
                            />
                          )}
                        />
                      </MDBox>
                      <DatePicker
                        style={{ marginRight: "2px" }}
                        selected={selectedDateFrom}
                        onChange={(date) => {setSelectedDateFrom(date);
                          setCookie("FILTROFECHADESDE", date, 1400) }}
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
                          setCookie("FILTROFECHAHASTA", date, 1400) }}
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
                  </Grid>
                  <Grid>

                  </Grid>
                  {/* <Grid item>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      direction="row"
                    >
                      <Grid item>
                        
                      </Grid>
                    </Grid>
                  </Grid> */}
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={true}
                    showTotalEntries={true}
                    canSearch={false}
                    noEndBorder
                    pagination={{ color: "secondary", variant: "gradient" }}
                  />
                  <MDSnackbar
                    color="info"
                    icon="notifications"
                    title="Task Manager"
                    content="Iniciando Tarea....."
                    dateTime={dateTime}
                    open={successSBPrev}
                    onClose={closeSuccessSBPrev}
                    close={closeSuccessSBPrev}
                  />
                  {/* </MDButton> */}
                  <MDSnackbar
                    color="success"
                    icon="notifications"
                    title="Task Manager"
                    content="Tarea iniciada exitosamente"
                    dateTime={dateTime}
                    open={successSB}
                    onClose={closeSuccessSB}
                    close={closeSuccessSB}
                  />
                  <MDSnackbar
                      color="error"
                      icon="warning"
                      title="Aviso"
                      content="Error al iniciar tarea"
                      dateTime={dateTime}
                      open={errorSB}
                      onClose={closeErrorSB}
                      close={closeErrorSB}

                  />
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout >
  );
}

export default TareaList;

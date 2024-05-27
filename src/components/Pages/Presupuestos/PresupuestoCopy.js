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
import { Cancel, CheckCircle, Delete, Edit, ExitToApp, Warning } from "@mui/icons-material";

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
  TextField,
  Table,
  InputAdornment,
} from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDBox from "../../controls/MDBox";
import MDInput from "../../controls/MDInput";
import MDTypography from "../../controls/MDTypography";
import MDButton from "../../controls/MDButton";
import getLastDayOfMonth from "../../Utils/ultimodiames";
import Meses from "../../Utils/Meses";
import Anios from "../../Utils/Anios";

const PresupuestoEdit = () => {
  const { id, habilitado } = useParams(); // Obtener el parámetro de la URL (el ID del Presupuesto a editar)
  const [Presupuesto, setPresupuesto] = useState(null);
  const [idPresupuesto, setidPresupuesto] = useState("");
  const [idCliente, setIdCliente] = useState(0);

  const [observaciones, setObservaciones] = useState("");
  const [presupuestoxtareastipos, setPresupuestoxTareasTipos] = useState([]);
  const [presupuestoxtareastiposUpdate, setPresupuestoxtareastiposUpdate] =
    useState([]);

  const [nombreboton, setnombreboton] = useState("Cancelar");
  const [mensaje, setMensaje] = useState("");
  const history = useNavigate();
  const [grabando, setGrabando] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idItem, setIDItem] = useState(0);
  const [IDItemModificado, setIDItemModificado] = useState(0);
  const [exito, setExito] = useState(false);
  const [mostraradvertencia, setMostrarAdvertencia] = useState();
  const [elementsclientes, setElementsCliente] = useState([]);
  const [elementsDepto, setElementsDepto] = useState([]);
  const [selectedValueDepartamentos, setSelectedValueDepartamentos] = useState([]);
  const [selectedValueCliente, setSelectedValueCliente] = useState([]);
  const [mostrarMensajeroles, setMostrarMensajeroles] = useState(true);
  const [elementsTareasTipos, setElementsTareasTipos] = useState([]);
  const [vencimientoDias, setVencimientoDias] = useState(0);
  const [selectedValueTareasTipos, setSelectedValueTareasTipos] = useState([]);
  const [vencimientolegal, setVencimientolegal] = useState(new Date());
  const [elementsUsuario, setElementsUsuario] = useState([]);
  const [elementsRol, setElementsRol] = useState([]);
  const [selectedValueUsuario, setSelectedValueUsuario] = useState(
    elementsUsuario[0]
  );
  const [rolesxTipoTarea, setRolesxTareaUpdate] = useState([]);
  const [selectedValueRol, setSelectedValueRol] = useState(elementsRol[0]);
  const [data, setData] = useState([]);
  const [dataToSend, setDataToSend] = useState([]);
  const handleVolver = () => {
    history("/PresupuestoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  const [selectedValueMes, setSelectedValueMes] = useState();
  const [selectedValueAnio, setSelectedValueAnio] = useState();

  const meses = Object.values(Meses);
  const anios = Object.values(Anios);

  const convertirFormatoFecha = (fecha) => {
    if (!fecha) {
      return ''; // Devuelve una cadena vacía o cualquier otro valor predeterminado
    }
    const fechaObj = new Date(fecha);
    const año = fechaObj.getUTCFullYear();
    const mes = String(fechaObj.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(fechaObj.getUTCDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  };

  const [formData, setFormData] = useState({

    fechaVencimientoLegal: "",
  });

  const eliminarItemRol = (id) => {
    const newData = rolesxTipoTarea.filter((item) => item.id !== id);
    setRolesxTareaUpdate(newData);
  };

  useEffect(() => {
    const SetMesyAnio = async () => {

      const defaultValueMesID = new Date().getMonth() + 1; // ID del elemento que deseas seleccionar por defecto
      const defaultValueMes = meses.find(
        (item) => item.valor === defaultValueMesID
      );
      console.log("defaultValueMes :", defaultValueMes);
      setSelectedValueMes(defaultValueMes);

      const defaultValueId = new Date().getFullYear(); // ID del elemento que deseas seleccionar por defecto
      const defaultValueAnio = anios.find(
        (item) => item.valor === defaultValueId
      );
      console.log("defaultValueAnio :", defaultValueAnio);
      setSelectedValueAnio(defaultValueAnio);


    };
    SetMesyAnio();
  }, []);

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

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Verifica si el tipo de campo es un checkbox (para campos booleanos)
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  useEffect(() => {

    setFormData({
      ...formData,
      fechaVencimientoLegal: convertirFormatoFecha(vencimientolegal)
    });
  }, [vencimientolegal]); // Ejecuta solo una vez al cargar el componente


  useEffect(() => {

    if (selectedValueDepartamentos?.idDepartamento === 1) {
      const fechaObj = new Date();
      const año = fechaObj.getFullYear();
      const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
      const dia = getLastDayOfMonth(año, mes);
      const nuevaFecha = `${año}-${mes}-${dia}`
      setVencimientolegal(nuevaFecha);

      // Actualiza formData cuando vencimientolegal cambia
      setFormData(prevFormData => ({
        ...prevFormData,
        fechaVencimientoLegal: nuevaFecha
      }));

    }
  }, [selectedValueDepartamentos]);

  useEffect(() => {
    setidPresupuesto(id);
    // Aquí realizas la llamada a tu API para obtener el Presupuesto específico por su ID
    const GetVencimientoLegalTipoTarea = async () => {
      try {

        if (!('idCliente' in selectedValueCliente)) {

          return;
        }
        if (!('idTareaTipo' in selectedValueTareasTipos)) {

          return;
        }

        const reqPresupuesto = {
          mes: selectedValueMes.valor,
          anio: selectedValueAnio.valor,
          idCliente: selectedValueCliente.idCliente,
          idTareaTipo: selectedValueTareasTipos.idTareaTipo
        };

        const response = await axios.post(
          API_URL + `/VencimientosLegalesListar`,
          reqPresupuesto,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        console.log("data:", data);
        // Verifica si `data` tiene datos cargados
        if (data.length > 0) {

          var fecha = convertirFormatoFecha(data[0].fechaVencimientoLegal);

          setVencimientolegal(fecha);
          setMostrarAdvertencia(false);
        } else {
          // Maneja el caso en que `data` no tiene datos cargados

          setVencimientolegal("");
          setMostrarAdvertencia(true);
        }
      } catch (error) {
        setMostrarAdvertencia(true);
        console.error("Error:", error);
      }
    };
    GetVencimientoLegalTipoTarea();
  }, [selectedValueCliente, selectedValueMes, selectedValueAnio, selectedValueTareasTipos]);



  useEffect(() => {
    setidPresupuesto(id);
    // Aquí realizas la llamada a tu API para obtener el Presupuesto específico por su ID
    const GetPresupuesto = async () => {
      try {
        if (cargado === true) {
           return;
        }
        else{
          const reqPresupuesto = {
            idPresupuesto: id,
            mesVenc: selectedValueMes.valor,
            anioVenc: selectedValueAnio.valor
          };
  
          const response = await axios.post(
            API_URL + `/PresupuestoGetByIDForCopy`,
            reqPresupuesto,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = response.data;
  
          setObservaciones(data.observaciones);
          setPresupuestoxTareasTipos(data.presupuestoxTareasTipos);
  
          setIdCliente(data.idCliente);
  
          let newRows = [];
          let i = 0;
  
  
          data.presupuestoxTareasTipos.forEach((item, index) => {
            i = i + 1;
            newRows.push(CargarDatos(item, i));
          });
  
          console.log("newRows:", newRows);
          setPresupuestoxtareastiposUpdate(newRows);
  
  
          setPresupuesto(data);
          setCargado(true);
        }
        

      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetPresupuesto();
  }, [id, selectedValueMes, selectedValueAnio]);

  const handleAutocompleteMesChange = (event, value) => {
    setSelectedValueMes(value);
  };
  const handleAutocompleteAnioChange = (event, value) => {
    setSelectedValueAnio(value);
  };

  useEffect(() => {
    const GetTareaTipo = async () => {
      const response = await axios.post(API_URL + "/TareaTipoListar", {
        headers: {
          accept: "application/json",
        },
      });
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

  useEffect(() => {
    const GetDepartamento = async () => {
      const response = await axios.post(API_URL + "/DepartamentoListar", {
        headers: {
          accept: "application/json",
        },
      });
      setElementsDepto(response.data);

    };
    GetDepartamento();
  }, [Presupuesto]);

  const handleSubmit = async (event) => {
    try {
      if (observaciones === "") {
        setMensaje("El campo observaciones es obligatorio");
        setExito(false);
        return;
      }

      const request = {
        idCliente: selectedValueCliente.idCliente,
        observaciones: observaciones,
        idUsuario: localStorage.getItem("iduserlogueado"),
        presupuestoxtareastipos: presupuestoxtareastiposUpdate.map((item) => ({
          idTareaTipo: item.idTareaTipo,
          vencimientoDias: item.vencimientoDiasValor,
          fechaVencimientoLegal: item.fechaVencimientoLegalvalor,
          idDepartamento: item.idDepartamento,
          rolesxTipoTarea: item.rolesAsignados.map((item, i) => ({
            id: i,
            idUsuario: item.idUsuario,
            idRol: item.idRol,
          }))

        })),

      };

      setGrabando(true); // Inicia la grabación
      setnombreboton("Volver");
      setExito(true);
      setMensaje("");
      // Aquí realizas la llamada a tu API para actualizar el Presupuesto con los nuevos datos
      const response = await fetch(API_URL + `/PresupuestoAlta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const res = await response.json();
      console.log("res copy", res);
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

  const EditarDatos = (item) => {
    console.log("item", item);
    setIDItemModificado(item.id);
    setIDItem(item.id);


    setEditando(true);

    setVencimientoDias(item.vencimientoDiasValor);
    setVencimientolegal(item.fechaVencimientoLegalvalor);

    const defaultValueId = item.idDepartamento; // ID del elemento que deseas seleccionar por defectoa asd asd asd asd a sdasd asd asd
    const defaultValue = elementsDepto.find(
      (item) => item.idDepartamento === defaultValueId
    );
    setSelectedValueDepartamentos(defaultValue);

    const defaultValueIdTT = item.idTareaTipo; // ID del elemento que deseas seleccionar por defectoa asd asd asd asd a sdasd asd asd
    const defaultValueTT = elementsTareasTipos.find(
      (item) => item.idTareaTipo === defaultValueIdTT
    );

    setSelectedValueTareasTipos(defaultValueTT);
    const rolesAsignados = item.rolesAsignados.map((rol, i) => ({
      id: i,
      idUsuario: rol.idUsuario,
      nombreUsuario: rol.nombreUsuario,
      idRol: rol.idRol,
      nombreRol: rol.nombreRol
    }))
    setRolesxTareaUpdate(rolesAsignados);


  };
  const CargarDatos = (item, index) => {
    //setRolesxTareaUpdate(item.rolesxTipoTarea);
    const newRow = {
      id: index,
      idPresupuesto: id,
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
      vencimientoDias: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {item.vencimientoDias}
        </MDTypography>
      ),
      vencimientoDiasValor: item.vencimientoDias,
      fechavencimientoLegal: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {item.fechavencimientoLegalFormateada}
        </MDTypography>
      ),
      nombredepartamento: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {item.nombreDepartamento}
        </MDTypography>
      ),
      rolescargados: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {item.rolesxTipoTarea.map((rol) => (
            <span key={data.length + 1}>
              {rol.nombreRol}: {rol.nombreUsuario}
              <br />
            </span>
          ))}
        </MDTypography>
      ),
      fechaVencimientoLegalvalor: item.fechavencimientoLegal,
      fechavencimientoLegalFormateada: item.fechavencimientoLegalFormateada,
      idDepartamento: item.idDepartamento,
      //rolesasignados: item.rolesxTipoTarea,
      rolesAsignados: item.rolesxTipoTarea.map((rol, i) => ({
        id: i,
        idUsuario: rol.idUsuario,
        nombreUsuario: rol.nombreUsuario,
        idRol: rol.idRol,
        nombreRol: rol.nombreRol
      }))
    };

    return newRow;
  };

  function formatearFecha(fecha) {
    // Dividir la fecha en año, mes y día
    const partesFecha = fecha.split('-');
    const [anio, mes, dia] = partesFecha;

    // Crear una nueva fecha en el formato DD-MM-YYYY
    const fechaFormateada = `${dia}-${mes}-${anio}`;

    return fechaFormateada;
  }
  const handleCancelTareaTipo = () => {

    setEditando(false);
    setIDItemModificado(0);
    setSelectedValueTareasTipos(null);
    setSelectedValueDepartamentos(null);
    setRolesxTareaUpdate([]);
    setVencimientoDias(0);
  };

  const handleAddTareaTipo = () => {
    if (selectedValueTareasTipos == null) {
      return;
    }
    if (selectedValueDepartamentos == null) {
      return;
    }

    if (selectedValueTareasTipos.idTareaTipo !== "") {
      let idTemp = 0;

      if (editando === true) {

        const newData = presupuestoxtareastiposUpdate.filter(item => item.id !== idItem);
        setPresupuestoxtareastiposUpdate([]);

        idTemp = IDItemModificado * -1;

        setPresupuestoxtareastiposUpdate(newData);

      } else {
        idTemp = presupuestoxtareastiposUpdate.length + 1;
      }
      const newRow = {
        id: idTemp,
        idPresupuesto: id,
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
        ),
        vencimientoDias: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {vencimientoDias}
          </MDTypography>
        ),
        vencimientoDiasValor: vencimientoDias,
        fechavencimientoLegal: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {formatearFecha(formData.fechaVencimientoLegal)}
          </MDTypography>
        ),
        nombredepartamento: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {selectedValueDepartamentos.nombre}
          </MDTypography>
        ),
        rolescargados: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {rolesxTipoTarea.map((rol) => (
              <span key={data.length + 1}>
                {rol.nombreRol}: {rol.nombreUsuario}
                <br />
              </span>
            ))}
          </MDTypography>
        ),
        idDepartamento: selectedValueDepartamentos.idDepartamento,
        fechaVencimientoLegalvalor: formData.fechaVencimientoLegal,
        rolesAsignados: rolesxTipoTarea.map((rol, i) => ({
          id: i,
          idUsuario: rol.idUsuario,
          nombreUsuario: rol.nombreUsuario,
          idRol: rol.idRol,
          nombreRol: rol.nombreRol
        }))
      };

      // const primitivo = {
      //   id: newRow.id,
      //   idTareaTipo: newRow.idTareaTipo,
      //   nombreTareaTipo: newRow.nombreTareaTipo.props.children,
      //   idDepartamento: newRow.idDepartamento,
      //   vencimientoDias: newRow.vencimientoDiasValor,
      //   fechaVencimientoLegal: newRow.fechaVencimientoLegalvalor,

      // };

      if (editando === false) {
        const TareaTipoExistente = presupuestoxtareastiposUpdate.find(
          (item) => item.idTareaTipo === selectedValueTareasTipos.idTareaTipo
        );

        if (!TareaTipoExistente) {
          setPresupuestoxtareastiposUpdate((prevDatos) => [...prevDatos, newRow]);
        }
      } else {
        setPresupuestoxtareastiposUpdate((prevDatos) => [...prevDatos, newRow]);
      }
      if (editando === true) {

        setEditando(false);
      }
      setIDItemModificado(0);
      setSelectedValueTareasTipos(null);
      setSelectedValueDepartamentos(null);
      setVencimientoDias(0);

    }
  };

  const handleAddRol = () => {
    const newRow = {
      id: rolesxTipoTarea.length + 1,
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
    const usuarioExistente = rolesxTipoTarea.find(
      (item) =>
        item.idUsuario === selectedValueUsuario.idUsuario &&
        item.idRol === selectedValueRol.idRol
    );

    if (!usuarioExistente) {
      setRolesxTareaUpdate((prevDatos) => [...prevDatos, newRow]);
    }

  };

  //Hook para validar roles ingresados y dejar continuar la carga
  useEffect(() => {
    const GetValidarRoles = async () => {
      const request = {
        idRol: 1,
        acciones: rolesxTipoTarea
      };

      const response = await axios.post(API_URL + "/ValidarRoles", request, {
        headers: {
          accept: "application/json",
        },

      });

      //const res = await response.json();
      if (response.data.rdoAccion) {
        setMostrarMensajeroles(false);

      } else {
        // Manejar errores si la respuesta no es exitosa
        setMostrarMensajeroles(true);
      }

    };
    GetValidarRoles();
  }, [rolesxTipoTarea]);

  const handleAutocompleteUserChange = (event, value) => {
    setSelectedValueUsuario(value);
  };

  const handleAutocompleteRolChange = (event, value) => {
    setSelectedValueRol(value);
  };
  const handleAutocompleteIDClienteChange = (event, value) => {
    setSelectedValueCliente(value);
  };
  const handleAutocompleteDeptoChange = (event, value) => {
    setSelectedValueDepartamentos(value);
  };

  const eliminarItem = (id) => {
    const newData = presupuestoxtareastiposUpdate.filter(
      (item) => item.id !== id
    );
    setPresupuestoxtareastiposUpdate(newData);
  };

  if (!Presupuesto) {
    return (
      <BasicLayout image={bgImage}>
        <Card style={{ width: "157%" }}>
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
              Cargando Datos Presupuesto...
            </MDTypography>
          </MDBox>
        </Card>
      </BasicLayout>
    );
  }

  const handleAutocompleteTareaTipoChange = (event, value) => {
    setSelectedValueTareasTipos(value);
    try {
      setVencimientoDias(value.vencimientoDias);
    } catch (error) { }
  };
  const getIcon = () => {
    if (mostraradvertencia === true) {
      return <Warning color="warning" />;
    } else {
      return <CheckCircle color="success" />;
    }
    return null;
  };

  return (
    <BasicLayout image={bgImage}>
      <Card style={{ width: "190%", marginT: "-35px" }}>
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
            Duplicando Presupuesto
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Puede utilizar el siguiente presupuesto como modelo de uno nuevo
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" tarea="form">
            <MDBox
              mb={2}
              style={{
                width: "100%",
                gap: "16px",
                height: "100%", // Asegura que el contenedor principal ocupe el alto completo
              }}
            >

              <MDBox mb={2}>
                <MDBox mb={2} mt={3} mr={2} display="flex" alignItems="center" spacing={4}>
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
                    disabled
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


                  <Autocomplete
                    options={anios}
                    getOptionLabel={(option) =>
                      option.descripcion || "Seleccione Año"
                    }
                    // getOptionSelected={(option, value) =>
                    //   option.anio === value
                    // }
                    isOptionEqualToValue={(option, value) => {
                      // Aquí defines cómo comparar una opción con un valor
                      return option.valor === value.valor && option.descripcion === value.descripcion;
                    }}
                    value={selectedValueAnio || null}
                    onChange={handleAutocompleteAnioChange}
                    disabled
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

                <Autocomplete
                  onChange={handleAutocompleteIDClienteChange}
                  options={elementsclientes}
                  value={selectedValueCliente || null}
                  getOptionLabel={(option) =>
                    option.nombre || "Seleccione Cliente"
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.nombre === value.nombre
                  }
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

              <MDBox mb={2}>
                <Card>
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
                      Tipos de Tarea del Presupuesto
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDBox mb={2} mr={4} ml={4}>
                      <Autocomplete
                        onChange={handleAutocompleteTareaTipoChange}
                        options={elementsTareasTipos}
                        value={selectedValueTareasTipos || null}
                        getOptionLabel={(option) => option.nombre || "Seleccione Tipo de Tarea"}
                        getOptionDisabled={(option) =>
                          option.activo === false
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.nombre === value.nombre
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Seleccione Tipo de Tarea"
                            variant="outlined"
                          />
                        )}
                      />
                    </MDBox>
                    <MDBox mb={2} mr={4} ml={4}>
                      <Autocomplete
                        onChange={handleAutocompleteDeptoChange}
                        options={elementsDepto}
                        value={selectedValueDepartamentos || null}
                        getOptionLabel={(option) =>
                          option.nombre || "Seleccione Departamento"
                        }
                        getOptionDisabled={(option) => option.activo === false}
                        isOptionEqualToValue={(option, value) =>
                          option.nombre === value.nombre
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Seleccione Departamento"
                            variant="outlined"
                          />
                        )}
                        style={{ flex: 1 }} // Añade esta línea
                      />
                    </MDBox>

                    <MDBox mb={2} mr={4} ml={4}>
                      <MDInput
                        type="text"
                        name="vencimientoDias"
                        required
                        label="Vencimiento en Dias"
                        variant="standard"
                        value={vencimientoDias}
                        onChange={(e) => setVencimientoDias(e.target.value)}
                        fullWidth
                      />
                      <MDInput
                        type="date"
                        name="fechaVencimientoLegal"
                        required
                        label="Vencimiento legal"
                        variant="standard"
                        value={formData.fechaVencimientoLegal || vencimientolegal}
                        onChange={handleInputChange}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              {getIcon()}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MDBox>
                    <div style={{ flex: 1, marginT: "-35px" }}>
                      <MDBox mb={2}>
                        <Card>
                          <MDBox
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
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
                                onChange={handleAutocompleteUserChange}
                                options={elementsUsuario}
                                getOptionLabel={(option) => option.nombre}
                                getOptionDisabled={(option) =>
                                  option.activo === false
                                }
                                isOptionEqualToValue={(option, value) =>
                                  option.nombre === value.nombre
                                }
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
                                getOptionDisabled={(option) =>
                                  option.activo === false
                                }
                                isOptionEqualToValue={(option, value) =>
                                  option.descripcion === value.descripcion
                                }
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
                                color="info"
                                endIcon={<PersonFillAdd />}
                                fullWidth
                              >
                                Agregar Rol
                              </MDButton>
                              <MDTypography
                                variant="caption"
                                fontWeight="bold"
                                color="error"
                                id="lblmsnroles"
                                style={{ display: mostrarMensajeroles ? 'block' : 'none' }}
                              >
                                *Especifique un encargado para cada rol obligatorio
                              </MDTypography>
                            </MDBox>
                            <TableContainer component={Paper}>
                              <Table>
                                <TableBody>
                                  {rolesxTipoTarea.map((item, index) => (
                                    <TableRow key={index}>
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
                                      <TableCell>
                                        <IconButton
                                          aria-label="Eliminar"
                                          onClick={() => eliminarItemRol(item.id)}
                                        >
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
                    </div>
                    <MDBox mb={2} mr={6} ml={6} display="flex" justifyContent="space-between">
                      <MDButton
                        onClick={() => {
                          handleAddTareaTipo();
                        }}
                        variant="gradient"
                        color="success"
                        endIcon={<PersonFillAdd />}
                        fullWidth
                        disabled={mostrarMensajeroles}
                      >
                        Agregar Tipo de Tarea
                      </MDButton>
                      <MDButton
                        onClick={() => {
                          handleCancelTareaTipo();
                        }}
                        style={{ display: editando ? 'block' : 'none' }}
                        variant="gradient"
                        color="warning"
                        endIcon={<Cancel />}
                        fullWidth
                      >
                        Cancelar Edicion
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
                              <TableCell>
                                {
                                  // console.log("item", item)
                                  item.fechavencimientoLegal.props.children === 'Fecha no disponible' && (
                                    <Warning color="warning" />
                                  )
                                }
                              </TableCell>

                              <TableCell>{item.nombreTareaTipo}</TableCell>
                              <TableCell>{item.nombredepartamento}</TableCell>
                              <TableCell>{item.vencimientoDias}</TableCell>
                              <TableCell style={{ display: "none" }}>{item.vencimientoDiasValor}</TableCell>
                              <TableCell>{item.fechavencimientoLegal}</TableCell>
                              <TableCell >{item.rolescargados}</TableCell>
                              <TableCell style={{ display: "none" }}>{item.rolesasignados}</TableCell>
                              <TableCell>
                                <IconButton
                                  aria-label="Eliminar"
                                  onClick={() => eliminarItem(item.id)}
                                >
                                  <Delete color="error" />
                                </IconButton>
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  aria-label="Editar"
                                  onClick={() => EditarDatos(item)}
                                >
                                  <Edit color="info" />
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

            </MDBox>

            <MDBox mr={2} style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <MDButton
                onClick={() => {
                  handleSubmit();
                }}
                variant="gradient"
                color="success"
                endIcon={<Save />}
                disabled={grabando}
                style={{ width: '200px', marginRight: '10px' }}
              >
                Grabar
              </MDButton>

              <MDButton
                onClick={() => {
                  handleVolver();
                }}
                variant="gradient"
                color="error"
                endIcon={<ExitToApp />}
                style={{ width: '200px' }}
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
    </BasicLayout >
  );
};

export default PresupuestoEdit;

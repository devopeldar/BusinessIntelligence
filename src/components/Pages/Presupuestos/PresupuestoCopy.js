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
import { Delete, ExitToApp } from "@mui/icons-material";

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
} from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDBox from "../../controls/MDBox";
import MDInput from "../../controls/MDInput";
import MDTypography from "../../controls/MDTypography";
import MDButton from "../../controls/MDButton";

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
  const [exito, setExito] = useState(false);

  const [elementsclientes, setElementsCliente] = useState([]);
  const [elementsDepto, setElementsDepto] = useState([]);
  const [selectedValueDepartamentos, setSelectedValueDepartamentos] = useState(
    []
  );
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [selectedValueCliente, setSelectedValueCliente] = useState([]);

  const [elementsTareasTipos, setElementsTareasTipos] = useState([]);
  const [vencimientoDias, setVencimientoDias] = useState(0);
  const [selectedValueTareasTipos, setSelectedValueTareasTipos] = useState({
    idTareaTipo: "",
  });

  const handleVolver = () => {
    history("/PresupuestoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  const [formData, setFormData] = useState({

    fechaVencimientoLegal: new Date(),
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log("chk :" + event);
    // Verifica si el tipo de campo es un checkbox (para campos booleanos)
    const newValue = type === "checkbox" ? checked : value;
    console.log("name ", name);

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  useEffect(() => {
    setidPresupuesto(id);
    // Aquí realizas la llamada a tu API para obtener el Presupuesto específico por su ID
    const GetPresupuesto = async () => {
      try {
        const reqPresupuesto = {
          idPresupuesto: id,
        };

        const response = await axios.post(
          API_URL + `/PresupuestoGetByID`,
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
        setIdDepartamento(data.idDepartamento);
        let newRows = [];
        let i = 0;
        console.log("presupuestoxtareastipos", presupuestoxtareastipos.length);

        data.presupuestoxTareasTipos.forEach((item, index) => {
          i = i + 1;
          newRows.push(CargarDatos(item, i));
        });

        setPresupuestoxtareastiposUpdate(newRows);

       
        setPresupuesto(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetPresupuesto();
  }, [id]);

  useEffect(() => {
    const GetTareaTipo = async () => {
      const response = await axios.post(API_URL + "/TareaTipoListar", {
        headers: {
          accept: "application/json",
        },
      });

      console.log("response " + response.data);
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

      const defaultValueId = idDepartamento; // ID del elemento que deseas seleccionar por defectoa asd asd asd asd a sdasd asd asd
      const defaultValue = response.data.find(
        (item) => item.idDepartamento === defaultValueId
      );
      setSelectedValueDepartamentos(defaultValue);
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
        idPresupuesto: id,
        idCliente: selectedValueCliente.idCliente,
        observaciones: observaciones,
        presupuestoxtareastipos: presupuestoxtareastiposUpdate.map((item) => ({
          idTareaTipo: item.idTareaTipo,
          vencimientoDias: item.vencimientoDiasValor,
          fechaVencimientoLegal : item.fechaVencimientoLegalvalor,
          idDepartamento : item.idDepartamento
        })),
        idUsuario: localStorage.getItem("iduserlogueado"),
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
      fechaVencimientoLegalvalor : item.fechavencimientoLegal,
      idDepartamento: item.idDepartamento
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

  const handleAddTareaTipo = () => {
    if (selectedValueTareasTipos.idTareaTipo !== "") {
      const newRow = {
        id: presupuestoxtareastiposUpdate.length + 1,
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
          vencimientoDiasValor:vencimientoDias,
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
          idDepartamento: selectedValueDepartamentos.idDepartamento,
          fechaVencimientoLegalvalor:formData.fechaVencimientoLegal
      };
      const TareaTipoExistente = presupuestoxtareastiposUpdate.find(
        (item) => item.idTareaTipo === selectedValueTareasTipos.idTareaTipo
      );
console.log("newRow",newRow)
      if (!TareaTipoExistente) {
        setPresupuestoxtareastiposUpdate((prevDatos) => [...prevDatos, newRow]);
      }
    }
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
              Cargando Datos Presupeusto...
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
    } catch (error) {}
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
                width: "75%",
                gap: "16px",
                height: "100%", // Asegura que el contenedor principal ocupe el alto completo
              }}
            >
              
                <MDBox mb={2}>
                  <Autocomplete
                    onChange={handleAutocompleteIDClienteChange}
                    options={elementsclientes}
                    value={selectedValueCliente || null}
                    getOptionLabel={(option) =>
                      option.nombre || "Seleccione Cliente"
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
                          getOptionLabel={(option) => option.nombre}
                          getOptionDisabled={(option) =>
                            option.activo === false
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
                            value={formData.fechaVencimientoLegal}
                            onChange={handleInputChange}
                            fullWidth
                          />
                      </MDBox>
                      <MDBox mb={2} mr={6} ml={6}>
                        <MDButton
                          onClick={() => {
                            handleAddTareaTipo();
                          }}
                          variant="gradient"
                          color="info"
                          endIcon={<PersonFillAdd />}
                          fullWidth
                        >
                          Agregar Tipo de Tarea
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
                                <TableCell>{item.nombreTareaTipo}</TableCell>
                                <TableCell>{item.nombredepartamento}</TableCell>
                                <TableCell>{item.vencimientoDias}</TableCell>
                                <TableCell style={{ display: "none" }}>{item.vencimientoDiasValor}</TableCell>
                                <TableCell>{item.fechavencimientoLegal}</TableCell>
                                
                                <TableCell>
                                  <IconButton
                                    aria-label="Eliminar"
                                    onClick={() => eliminarItem(item.id)}
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
           
            </MDBox>
            <MDBox mt={1} mb={1}>
              <MDButton
                onClick={() => {
                  handleSubmit();
                }}
                variant="gradient"
                color="info"
                endIcon={<Save />}
                disabled={grabando}
                fullWidth
              >
                Grabar
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

export default PresupuestoEdit;

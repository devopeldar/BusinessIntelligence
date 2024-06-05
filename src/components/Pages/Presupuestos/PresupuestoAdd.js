import React, { useEffect, useState } from "react";
import API_URL from "../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los es../tilos de Bootstrap
import BasicLayout from "../../layauots/BasicLayout";
import {
  Alert,
  Autocomplete,
  Card,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import MDBox from "../../controls/MDBox";
import MDTypography from "../../controls/MDTypography";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from "../../controls/MDInput";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import MDProgress from "../../controls/MDProgress";
import { AlertTitle } from "@mui/material";
import MDButton from "../../controls/MDButton";
import { PersonFillAdd, Save } from "react-bootstrap-icons";
import { CheckCircle, Delete, ExitToApp, Warning } from "@mui/icons-material";
import axios from "axios";
import getLastDayOfMonth from "../../Utils/ultimodiames";
import Meses from "../../Utils/Meses";
import Anios from "../../Utils/Anios";

const PresupuestoAdd = () => {
  const navigate = useNavigate();

  // const [nombre, setNombre] = useState('');
  // const [activo, setActivo] = useState(false);
  const [formData, setFormData] = useState({
    observaciones: "",
    idCliente: 0,
    idUsuario: 0,
    presupuestoxtareastipos: [],
    fechaVencimientoLegal: new Date(),
    rolesasignados: [],
  });

  const validationSchema = yup.object().shape({
    observaciones: yup.string().required("El campo Observaciones es requerido"),
    idCliente: yup.string().required("Debe Indicar el Cliente"),
  });

  const [grabando, setGrabando] = useState(false);

  const [elementsUsuario, setElementsUsuario] = useState([]);
  const [elementsRol, setElementsRol] = useState([]);
  const [selectedValueUsuario, setSelectedValueUsuario] = useState(
    elementsUsuario[0]
  );
  const [rolesxTareaUpdate, setRolesxTareaUpdate] = useState([]);
  const [selectedValueRol, setSelectedValueRol] = useState(elementsRol[0]);
  const [elementsCliente, setElementsCliente] = useState([]);
  const [elementsTareaTipo, setElementsTareaTipo] = useState([]);
  const [selectedValueTareaTipo, setSelectedValueTareaTipo] = useState([]);
  
  const [selectedValueCliente, setSelectedValueCliente] = useState([]);
  const [elementsDepto, setElementsDepto] = useState([]);
  const [selectedValueDepartamentos, setSelectedValueDepartamentos] = useState(
    []
  );

  const [mostrarMensajeroles, setMostrarMensajeroles] = useState(true);
  const [vencimientoDias, setVencimientoDias] = useState(0);
  //const [idDepartamento, setIdDepartamento] = useState(0);
  const [nombreboton, setnombreboton] = useState("Cancelar");
  const [progress, setProgress] = useState(0);
  const [showprogrees, setShowprogrees] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [data, setData] = useState([]);
  const [dataToSend, setDataToSend] = useState([]);
  //const [dataRol, setDataRol] = useState([]);
  const [vencimientolegal, setVencimientolegal] = useState(new Date());

  const [selectedValueMes, setSelectedValueMes] = useState();
  const [selectedValueAnio, setSelectedValueAnio] = useState();
  const [mostraradvertencia, setMostrarAdvertencia] = useState();
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

    setFormData({
      ...formData,
      fechaVencimientoLegal: convertirFormatoFecha(vencimientolegal)
    });
  }, [vencimientolegal]); // Ejecuta solo una vez al cargar el componente

  
  const getIcon = () => {
    if (mostraradvertencia === true) {
      return <Warning color="warning" />;
    } else {
      return <CheckCircle color="success" />;
    }
    return null;
  };


  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
   
    // Verifica si el tipo de campo es un checkbox (para campos booleanos)
    const newValue = type === "checkbox" ? checked : value;
  
    setShowprogrees(1);
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

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

  const eliminarItemRol = (id) => {
    const newData = rolesxTareaUpdate.filter((item) => item.id !== id);
    setRolesxTareaUpdate(newData);
  };

  const handleSubmit = (event) => {
    setGrabando(false); // Inicia la grabación
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 0;
        }
        if (showprogrees === 0) {
          clearInterval(timer);
          return 0;
        }

        const diff = Math.floor(Math.random() * 10);
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);
    procesarFormulario(formData);
  };

  const handleAddRol = () => {

    if(!selectedValueUsuario || !selectedValueRol ) {return;};
    if (!('idUsuario' in selectedValueUsuario)) {

      return;
    }
    if (!('idRol' in selectedValueRol)) {

      return;
    }

    const newRow = {
      id: rolesxTareaUpdate.length + 1,
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
    const usuarioExistente = rolesxTareaUpdate.find(
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
        acciones: rolesxTareaUpdate
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
  }, [rolesxTareaUpdate]);

  const handleAutocompleteUserChange = (event, value) => {
    setSelectedValueUsuario(value);
  };

  const handleAutocompleteRolChange = (event, value) => {
    setSelectedValueRol(value);
  };

  useEffect(() => {
   
    if (selectedValueDepartamentos?.idDepartamento === 1) {
      const fechaObj = new Date();
      const año = fechaObj.getFullYear();
      const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
      const dia =  getLastDayOfMonth(año, mes);
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
    const GetVencimientoLegalTipoTarea = async () => {
      try {
        if(!selectedValueCliente || !selectedValueTareaTipo ) {return;};
        if (!('idCliente' in selectedValueCliente)) {

          return;
        }
        if (!('idTareaTipo' in selectedValueTareaTipo)) {

          return;
        }

        const reqPresupuesto = {
          mes: selectedValueMes.valor,
          anio: selectedValueAnio.valor,
          idCliente: selectedValueCliente.idCliente,
          idTareaTipo: selectedValueTareaTipo.idTareaTipo
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
  }, [selectedValueCliente, selectedValueMes, selectedValueAnio, selectedValueTareaTipo]);


  useEffect(() => {
    const GetTareaTipo = async () => {
      const response = await axios.post(API_URL + "/TareaTipoListar", {
        headers: {
          accept: "application/json",
        },
      });
      setElementsTareaTipo(response.data);
    };
    GetTareaTipo();
  }, []);

  useEffect(() => {
    const GetCliente = async () => {
      const response = await axios.post(API_URL + "/ClienteListar", {
        headers: {
          accept: "application/json",
        },
      });
      setElementsCliente(response.data);
    };
    GetCliente();
  }, []);

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
  }, []);

  const handleVolver = () => {
    navigate("/PresupuestoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  
  const handleAddTareaTipo = () => {
    if (selectedValueTareaTipo == null) {
      return;
    }
    if (selectedValueDepartamentos == null) {
      return;
    }
   const newRow = {
      id: data.length + 1,
      idTareaTipo: selectedValueTareaTipo.idTareaTipo,
      nombreTareaTipo: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {selectedValueTareaTipo.nombre}
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
      fechaVencimientoLegal: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {formData.fechaVencimientoLegal}
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
          {rolesxTareaUpdate.map((rol) => (
            <span key={data.length + 1}>
              {rol.nombreRol}: {rol.nombreUsuario}
              <br />
            </span>
          ))}
        </MDTypography>
      ),
      idDepartamento: selectedValueDepartamentos.idDepartamento,
      vencimientoDiasValor: vencimientoDias,
      fechaVencimientoLegalvalor: formData.fechaVencimientoLegal,
     
    };

    const usuarioExistente = data.find(
      (item) => item.idTareaTipo === selectedValueTareaTipo.idTareaTipo
    );
    console.log("newRow0", newRow);
    if (!usuarioExistente) {
      setData((prevDatos) => [...prevDatos, newRow]);

     

      const primitivo = {
        id: newRow.id,
        idTareaTipo: newRow.idTareaTipo,
        nombreTareaTipo: newRow.nombreTareaTipo.props.children,
        idDepartamento: newRow.idDepartamento,
        vencimientoDias: newRow.vencimientoDiasValor,
        fechaVencimientoLegal: newRow.fechaVencimientoLegalvalor,
        rolesAsignados: rolesxTareaUpdate.map((rol, i) => ({
          id: i,
          idUsuario: rol.idUsuario,
          idRol: rol.idRol,
        }))
      };

      console.log("primitivo", primitivo);
      setDataToSend((prevDatos) => [...prevDatos, primitivo]);
    }
  };

  const handleAutocompleteClienteChange = (event, value) => {
    setSelectedValueCliente(value);
  };
  const handleAutocompleteDeptoChange = (event, value) => {
    setSelectedValueDepartamentos(value);
  };
  const procesarFormulario = async (request) => {
    try {
      setLoading(true);

      console.log("data2", data)
      request.idCliente = selectedValueCliente.idCliente;
      request.idUsuario = localStorage.getItem("iduserlogueado");
      request.presupuestoxtareastipos = dataToSend.map((item, a) => ({
        idTareaTipo: item.idTareaTipo,
        vencimientoDias: item.vencimientoDias,
        fechaVencimientoLegal: item.fechaVencimientoLegal,
        idDepartamento: item.idDepartamento,
        rolesxTipoTarea: item.rolesAsignados.map((item, i) => ({
          id: i,
          idUsuario: item.idUsuario,
          nombreUsuario: item.nombreUsuario,
          idRol: item.idRol,
          nombreRol: item.nombreRol
        }))
        
      }));
      
      
      console.log("request2", request)

      validationSchema
        .validate(request)
        .then(async (validatedData) => {
          setGrabando(true); // Inicia la grabación
          setnombreboton("Volver");
          setExito(true);
          setMensaje("");

          console.log("formData", formData)

          const response = await fetch(API_URL + "/PresupuestoAlta", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const res = await response.json();

          if (res.rdoAccion) {
            // Manejar respuesta exitosa
            setMensaje("El Presupuesto ha sido Creado exitosamente!");
            setGrabando(true);
            setExito(true);
          } else {
            // Manejar errores si la respuesta no es exitosa
            setMensaje(res.rdoAccionDesc);
            setExito(false);
            setGrabando(false);
          }
        })
        .catch((error) => {
          console.log("Errores de validación:", error.message);
          setExito(false);
          setMensaje(error.message);
          setShowprogrees(0);
          setGrabando(false);
        });
    } catch (error) {
      console.log("error:", error);
      setMensaje("Error en la solicitud:", error);
      setGrabando(false); // Inicia la grabación
      setnombreboton("Cancelar");
    } finally {
      setLoading(false);
      setShowprogrees(0);
      setProgress(100);
    }
  };
  const handleAutocompleteChangeTareaTipo = (event, value) => {
    setSelectedValueTareaTipo(value);
    try {
      setVencimientoDias(value.vencimientoDias);
    } catch (error) { }
  };

  const handleAutocompleteMesChange = (event, value) => {
    setSelectedValueMes(value);
  };
  const handleAutocompleteAnioChange = (event, value) => {
    setSelectedValueAnio(value);
  };

  const eliminarItem = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };
  return (
    <BasicLayout dire image={bgImage}>
      <Card style={{ width: "159%" }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Agregar Presupuesto
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
                        Agregar una tarea inicia el camino operativo desde su creacion hasta su finalizacion.
                    </MDTypography> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox
              mb={2}

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
                    style={{display:'none'}}
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
                    style={{display:'none'}}
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
                <MDBox mb={2}>
                  <Autocomplete
                    onChange={handleAutocompleteClienteChange}
                    options={elementsCliente}
                    getOptionLabel={(option) => option.nombre}
                    getOptionDisabled={(option) => option.activo === false}
                    isOptionEqualToValue={(option, value) =>
                      option.nombre === value.nombre
                    }
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
                    value={formData.observaciones}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </MDBox>

                <Card>
                  <div style={{ flex: 1, marginT: "-15px" }}>
                    <MDBox
                      variant="gradient"
                      bgColor="info"
                      borderRadius="lg"
                      coloredShadow="info"
                      mx={2}
                      mt={0}
                      p={1}
                      mb={2}
                      textAlign="center"

                      style={{
                        display: "flex",
                        gap: "16px",
                        flexDirection: "row",
                        width: "100%",
                        height: "100%", // Asegura que el contenedor principal ocupe el alto completo
                      }}
                    >
                      <MDTypography
                        variant="h5"
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
                          onChange={handleAutocompleteChangeTareaTipo}
                          options={elementsTareaTipo}
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
                          isOptionEqualToValue={(option, value) =>
                            option.nombre === value.nombre
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

                    </MDBox>
                  </div>
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
                                {rolesxTareaUpdate.map((item, index) => (
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
                  <MDBox mb={2} mr={6} ml={6}>
                    <MDButton
                      onClick={() => {
                        handleAddTareaTipo();
                      }}
                      disabled={mostrarMensajeroles}
                      variant="gradient"
                      color="success"
                      endIcon={<PersonFillAdd />}
                      fullWidth
                    >
                      Confirmar Cambios de Tarea
                    </MDButton>
                  </MDBox>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {data.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ display: "none" }}>
                              {item.id}
                            </TableCell>
                            <TableCell style={{ display: "none" }}>
                              {item.idTareaTipo}
                            </TableCell>
                            <TableCell style={{ display: "none" }}>
                              {item.idDepartamento}
                            </TableCell>
                            <TableCell>{item.nombreTareaTipo}</TableCell>
                            <TableCell>{item.nombredepartamento}</TableCell>
                            <TableCell>{item.vencimientoDias}</TableCell>
                            <TableCell>{item.fechaVencimientoLegal}</TableCell>
                            <TableCell style={{ display: "none" }}>{item.vencimientoDiasValor}</TableCell>
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
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                </Card>
              </MDBox>

            </MDBox>
          </MDBox>
          <MDBox mr={2}   style={{ 
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
        <MDBox mt={3} mb={1} ml={5} mr={5}>
          <MDProgress
            color="success"
            loading="true"
            label={true}
            value={showprogrees === 0 ? progress : 0}
            display={loading && exito ? "true" : "false"}
            variant="contained"
          ></MDProgress>
        </MDBox>

        {mensaje !== "" && (
          <Alert severity={exito ? "success" : "error"}>
            <AlertTitle>{exito ? "Felicitaciones" : "Error"}</AlertTitle>
            {mensaje}
          </Alert>
        )}
        {/* </MDBox> */}
      </Card>
    </BasicLayout>
  );
};

export default PresupuestoAdd;

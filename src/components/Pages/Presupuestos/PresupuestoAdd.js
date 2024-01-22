import React, { useEffect, useState } from "react";
import API_URL from "../../../config";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los es../tilos de Bootstrap
import BasicLayout from "../../layauots/BasicLayout";
import {
  Alert,
  Autocomplete,
  Card,
  IconButton,
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
import { Delete, ExitToApp } from "@mui/icons-material";
import axios from "axios";

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
  });

  const validationSchema = yup.object().shape({
    observaciones: yup.string().required("El campo Observaciones es requerido"),
    idCliente: yup.string().required("Debe Indicar el Cliente"),
  });

  const [grabando, setGrabando] = useState(false);

  const [elementsCliente, setElementsCliente] = useState([]);
  const [elementsTareaTipo, setElementsTareaTipo] = useState([]);
  const [selectedValueTareaTipo, setSelectedValueTareaTipo] = useState([]);
  const [selectedValueCliente, setSelectedValueCliente] = useState([]);
  const [elementsDepto, setElementsDepto] = useState([]);
  const [selectedValueDepartamentos, setSelectedValueDepartamentos] = useState(
    []
  );
  const [vencimientoDias, setVencimientoDias] = useState(0);
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [nombreboton, setnombreboton] = useState("Cancelar");
  const [progress, setProgress] = useState(0);
  const [showprogrees, setShowprogrees] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [data, setData] = useState([]);
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log("chk :" + event);
    // Verifica si el tipo de campo es un checkbox (para campos booleanos)
    const newValue = type === "checkbox" ? checked : value;
    console.log("name ", name);

    setShowprogrees(1);
    setFormData({
      ...formData,
      [name]: newValue,
    });
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

  // useEffect(() => {
  //     // Coloca aquí el código que deseas ejecutar al montar el componente
  //     console.log('El componente se ha montado');

  //     // Por ejemplo, llamar a una función
  //     handleLoad();
  // }, []); // El segundo argumento es un array de dependencias vacío

  useEffect(() => {
    const GetTareaTipo = async () => {
      const response = await axios.post(API_URL + "/TareaTipoListar", {
        headers: {
          accept: "application/json",
        },
      });

      console.log("response " + response.data);
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
      console.log("response " + response.data);
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

      const defaultValueId = idDepartamento; // ID del elemento que deseas seleccionar por defectoa asd asd asd asd a sdasd asd asd
      const defaultValue = response.data.find(
        (item) => item.idDepartamento === defaultValueId
      );
      setSelectedValueDepartamentos(defaultValue);
    };
    GetDepartamento();
  }, []);

  const handleVolver = () => {
    navigate("/PresupuestoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  const handleAddTareaTipo = () => {
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
    };
    const usuarioExistente = data.find(
      (item) => item.idTareaTipo === selectedValueTareaTipo.idTareaTipo
    );

    if (!usuarioExistente) {
      setData((prevDatos) => [...prevDatos, newRow]);
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

      request.idCliente = selectedValueCliente.idCliente;
      request.idDepartamento = selectedValueDepartamentos.idDepartamento;

      request.presupuestoxtareastipos = data.map((item) => ({
        idTareaTipo: item.idTareaTipo,
        vencimientoDias: item.vencimientoDiasValor,
      }));
      request.idUsuario = localStorage.getItem("iduserlogueado");
      console.log("formData " + JSON.stringify(formData));
      validationSchema
        .validate(request)
        .then(async (validatedData) => {
          setGrabando(true); // Inicia la grabación
          setnombreboton("Volver");
          setExito(true);
          setMensaje("");

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
    } catch (error) {}
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
              style={{
                display: "flex",
                gap: "16px",
                flexDirection: "row",
                height: "100%", // Asegura que el contenedor principal ocupe el alto completo
              }}
            >
              <div style={{ flex: 1, marginTop: "-15px" }}>
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
                            {data.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell style={{ display: "none" }}>
                                  {item.id}
                                </TableCell>
                                <TableCell style={{ display: "none" }}>
                                  {item.idTareaTipo}
                                </TableCell>
                                <TableCell>{item.nombreTareaTipo}</TableCell>
                                <TableCell>{item.vencimientoDias}</TableCell>
                                <TableCell style={{ display: "none" }}>{item.vencimientoDiasValor}</TableCell>
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
              </div>
            </MDBox>
          </MDBox>
          <MDBox mb={1} style={{ display: "flex", gap: "16px" }}>
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

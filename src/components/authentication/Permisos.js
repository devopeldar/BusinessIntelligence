import React, { useEffect, useRef, useState } from 'react';
import BasicLayout from '../layauots/BasicLayout';
import { Card } from 'react-bootstrap';
import MDBox from '../controls/MDBox';
import MDTypography from '../controls/MDTypography';
import bgImage from '../../assets/images/bg-sign-up-cover.jpeg';
import { Alert, AlertTitle, Checkbox } from '@mui/material';
import API_URL from '../../config';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Save2Fill } from 'react-bootstrap-icons';
import MDButton from '../controls/MDButton';
import itemsMenu from '../Utils/itemsMenu';
import MDProgress from '../controls/MDProgress';
import { ExitToApp } from '@mui/icons-material';


const Permisos = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mantenimientotareas, setMantenimientoTareas] = useState(false);
  const [departamentos, setDepartamentos] = useState(false);
  const [tareas, setTareas] = useState(false);
  const [estadotarea, setEstadoTarea] = useState(false);
  const [tipodetareas, setTipoDeTareas] = useState(false);
  const [idperfil, setidPerfil] = useState(false);
  const [mnueventos, setMnuEventos] = useState(false);
  const [tipoevento, setTipoEventos] = useState(false);
  const [evento, setEventos] = useState(false);
  const [mnuclientes, setMnuClientes] = useState(false);
  const [mantenimientoclientes, setMantenimientoClientes] = useState(false);
  const [perfiles, setPerfiles] = useState(false);
  const [usuarios, setUsuarios] = useState(false);
  const [mnuseguridad, setMnuSeguridad] = useState(false);
  const [roles, setRol] = useState(false);
  const [nombreboton, setnombreboton] = useState("Cancelar");
  const [progress, setProgress] = useState(0);
  const [showprogrees, setShowprogrees] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const listaPerfilPermisoRef = useRef([]);
  const [grabando, setGrabando] = useState(false);
  useEffect(() => {
    setidPerfil(id);
    // Aquí realizas la llamada a tu API para obtener el Departamento específico por su ID
    const GetPermisos = async () => {
      try {
        const reqPermisosxPerfil = {
          idperfil: id
        };

        const response = await axios.post(API_URL + `/PerfilxPermisoListar`, reqPermisosxPerfil, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = response.data;
        const TAREA = data.some(item => item.codigoPermiso === itemsMenu.TAREA.valor);
        setTareas(TAREA);


        const TAREAS = data.some(item => item.codigoPermiso === itemsMenu.TAREAS.valor);

        setMantenimientoTareas(TAREAS);

        const DEPARTAMENTOS = data.some(item => item.codigoPermiso === itemsMenu.DEPARTAMENTOS.valor);
        setDepartamentos(DEPARTAMENTOS);



        const ESTADOSDETAREA = data.some(item => item.codigoPermiso === itemsMenu.ESTADOSDETAREA.valor);
        setEstadoTarea(ESTADOSDETAREA);

        const TIPOSDETAREAS = data.some(item => item.codigoPermiso === itemsMenu.TIPOSDETAREAS.valor);
        setTipoDeTareas(TIPOSDETAREAS);

        const EVENTOS = data.some(item => item.codigoPermiso === itemsMenu.EVENTOS.valor);
        setMnuEventos(EVENTOS);

        const EVENTO = data.some(item => item.codigoPermiso === itemsMenu.EVENTO.valor);
        setEventos(EVENTO);

        const TIPOSDEEVENTOS = data.some(item => item.codigoPermiso === itemsMenu.TIPOSDEEVENTOS.valor);
        setTipoEventos(TIPOSDEEVENTOS);

        const MANTENIMIENTOCLIENTES = data.some(item => item.codigoPermiso === itemsMenu.MANTENIMIENTOCLIENTES.valor);
        setMantenimientoClientes(MANTENIMIENTOCLIENTES);
        const CLIENTES = data.some(item => item.codigoPermiso === itemsMenu.CLIENTES.valor);
        setMnuClientes(CLIENTES);
        const SEGURIDAD = data.some(item => item.codigoPermiso === itemsMenu.SEGURIDAD.valor);
        setMnuSeguridad(SEGURIDAD);
        const USUARIOS = data.some(item => item.codigoPermiso === itemsMenu.USUARIOS.valor);
        setUsuarios(USUARIOS);
        const PERFILES = data.some(item => item.codigoPermiso === itemsMenu.PERFILES.valor);
        setPerfiles(PERFILES);
        const ROLES = data.some(item => item.codigoPermiso === itemsMenu.ROLES.valor);
        setRol(ROLES);

      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetPermisos();
  }, [id]);


  // Función para agregar un nuevo item a la lista
  const agregarItem = (codigoPermiso) => {
  
    const nuevoItem = { IDPerfil: idperfil, codigoPermiso: codigoPermiso.valor }; // Ejemplo de nuevo item
    listaPerfilPermisoRef.current.push(nuevoItem);
  
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      listaPerfilPermisoRef.current = [];
      if (tareas || (tipodetareas || estadotarea || mantenimientotareas || departamentos)) { agregarItem(itemsMenu.TAREA); }
      if (mantenimientotareas === true) { agregarItem(itemsMenu.TAREAS); }
      if (departamentos === true) { agregarItem(itemsMenu.DEPARTAMENTOS); }
      if (tipodetareas === true) { agregarItem(itemsMenu.TIPOSDETAREAS); }
      if (estadotarea === true) { agregarItem(itemsMenu.ESTADOSDETAREA); }
      if (mnuseguridad || (usuarios || perfiles || roles)) { agregarItem(itemsMenu.SEGURIDAD); }
      if (usuarios === true) { agregarItem(itemsMenu.USUARIOS); }
      if (perfiles === true) { agregarItem(itemsMenu.PERFILES); }
      if (roles === true) { agregarItem(itemsMenu.ROLES); }
      if (mnuclientes || mantenimientoclientes) { agregarItem(itemsMenu.CLIENTES); }
      if (mantenimientoclientes === true) { agregarItem(itemsMenu.MANTENIMIENTOCLIENTES); }
      if (mnueventos || (evento || tipoevento)) { agregarItem(itemsMenu.EVENTO); }
      if (evento === true) { agregarItem(itemsMenu.EVENTOS); }
      if (tipoevento === true) { agregarItem(itemsMenu.TIPOSDEEVENTOS); }

      console.log("listaPerfilPermisoRef ", listaPerfilPermisoRef);

      
      const response = await fetch(API_URL + "/PerfilxPermisoDTOModificacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listaPerfilPermisoRef.current),
      });

      const res = await response.json();
   
      if (res.rdoAccion) {
        // Manejar respuesta exitosa
        setMensaje("Los Permisos han sido Registrado exitosamente!");
        setGrabando(true);
        setExito(true);
        setnombreboton("Volver");
      } else {
        // Manejar errores si la respuesta no es exitosa
        setMensaje(res.rdoAccionDesc);
        setExito(false);
        setGrabando(false);
      }
    } catch (error) {
      setMensaje("Error en la solicitud:", error);
      setGrabando(true); // Inicia la grabación
      setnombreboton("Cancelar");
    } finally {
      setLoading(false);
      setShowprogrees(0);
      setProgress(100);
    }
  };
  const HandleMnuTarea = (event) => {

    setTareas(event.target.checked)
    setMantenimientoTareas(event.target.checked);
    setDepartamentos(event.target.checked);
    setEstadoTarea(event.target.checked);
    setTipoDeTareas(event.target.checked);

  };
  const HandleMnuSeguridad = (event) => {

    setMnuSeguridad(event.target.checked)
    setUsuarios(event.target.checked);
    setPerfiles(event.target.checked);
    setRol(event.target.checked);

  };
  const HandleMnuClientes = (event) => {

    setMnuClientes(event.target.checked)
    setMantenimientoClientes(event.target.checked);

  };
  const HandleMnuEvento = (event) => {

    setMnuEventos(event.target.checked)
    setTipoEventos(event.target.checked);
    setEventos(event.target.checked);

  };

  // const handleInputChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   console.log("chk :" + event)
  //   // Verifica si el tipo de campo es un checkbox (para campos booleanos)
  //   const newValue = type === 'checkbox' ? checked : value;

  //   setFormData({
  //     ...formData,
  //     [name]: newValue,
  //   });

  const handleVolver = () => {
    navigate("/PerfilesVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="warning"
          mx={2}
                    mt={-3}
                    p={3}
                    mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Permisos
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Esta seccion permite establecer que pantallas podra visualizar el usuario
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
            <MDBox mb={2}>

              <Checkbox name="tareas"
                onChange={(e) => HandleMnuTarea(e)}
                checked={tareas || (tipodetareas || estadotarea || mantenimientotareas || departamentos)}

              />

              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Tareas
              </MDTypography>
            </MDBox>
            <MDBox sx={{ ml: 5 }}>
              <Checkbox name="mantenimientotareas"
                onChange={(e) => setMantenimientoTareas(e.target.checked)}
                checked={mantenimientotareas}

              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Tareas
              </MDTypography>

            </MDBox>
            <MDBox sx={{ ml: 5 }}>
              <Checkbox name="tipodetareas"
                onChange={(e) => setTipoDeTareas(e.target.checked)}
                checked={tipodetareas}

              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Tipos de Tarea
              </MDTypography>


            </MDBox>
            <MDBox sx={{ ml: 5 }}>
              <Checkbox name="departamentos"
                onChange={(e) => setDepartamentos(e.target.checked)}
                checked={departamentos}

              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Departamentos
              </MDTypography>
            </MDBox>
            <MDBox sx={{ ml: 5 }}>
              <Checkbox name="estadotarea"
                onChange={(e) => setEstadoTarea(e.target.checked)}
                checked={estadotarea}

              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Estado de Tarea
              </MDTypography>
            </MDBox>
            <MDBox>

              <Checkbox name="mnueventos"
                onChange={(e) => HandleMnuEvento(e)}
                checked={mnueventos || (evento || tipoevento)}

              />

              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Eventos
              </MDTypography>
            </MDBox>
            <MDBox sx={{ ml: 5 }}>

              <Checkbox name="evento"
                onChange={(e) => setEventos(e.target.checked)}
                checked={evento}

              />

              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Eventos de Tareas
              </MDTypography>
            </MDBox>
            <MDBox sx={{ ml: 5 }}>
              <Checkbox name="tipoevento"
                onChange={(e) => setTipoEventos(e.target.checked)}
                checked={tipoevento}

              />

              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Tipos de Eventos
              </MDTypography>
            </MDBox>

            <MDBox>

              <Checkbox name="mnuclientes"
                onChange={(e) => HandleMnuClientes(e)}
                checked={mnuclientes || mantenimientoclientes}

              />

              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Clientes
              </MDTypography>
            </MDBox>
            <MDBox sx={{ ml: 5 }}>

              <Checkbox name="mantenimientoclientes"
                onChange={(e) => setMantenimientoClientes(e.target.checked)}
                checked={mantenimientoclientes}

              />

              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Mantenimiento Clientes
              </MDTypography>


            </MDBox>
            <MDBox>

              <Checkbox name="mnuseguridad"
                onChange={(e) => HandleMnuSeguridad(e)}
                checked={mnuseguridad || (usuarios || perfiles || roles)}

              />

              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Seguridad
              </MDTypography>
            </MDBox>
            <MDBox sx={{ ml: 5 }}>

              <Checkbox name="usuarios"
                onChange={(e) => setUsuarios(e.target.checked)}
                checked={usuarios}

              />

              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Usuarios
              </MDTypography>


            </MDBox>
            <MDBox sx={{ ml: 5 }}>

              <Checkbox name="perfiles"
                onChange={(e) => setPerfiles(e.target.checked)}
                checked={perfiles}

              />

              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Perfiles
              </MDTypography>


            </MDBox>
            <MDBox sx={{ ml: 5 }}>

              <Checkbox name="roles"
                onChange={(e) => setRol(e.target.checked)}
                checked={roles}

              />

              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Roles
              </MDTypography>


            </MDBox>
            <MDBox mt={5} mb={1}ml={5} mr={5}>
              <MDButton
                onClick={() => {
                  handleSubmit();
                }}
                variant="gradient"
                color="warning"
                endIcon={<Save2Fill />}
                disabled={grabando}
                fullWidth
              >
                Grabar
              </MDButton>
            </MDBox>
            <MDBox mt={5} mb={1}ml={5} mr={5}>
              <MDButton
                onClick={() => {
                  handleVolver();
                }}
                variant="gradient"
                color="primary"
                endIcon={<ExitToApp />}
                fullWidth
              >
                {nombreboton}
              </MDButton>
            </MDBox>
          </MDBox>
          <MDBox mt={4} mb={1}>
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
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default Permisos;
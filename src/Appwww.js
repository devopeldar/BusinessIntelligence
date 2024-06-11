import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React components
import MDBox from "../src/components/controls/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "../src/components/Sidenav"; //"../src/components/menu/SideNav";
import Configurator from "../src/components/layauots/Configurator";

// Material Dashboard 2 React themes
import theme from "../src/assets/theme/theme-rtl";
//import themeRTL from "../src/assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "../src/assets/theme-dark";
//import themeDarkRTL from "../src/assets/theme-dark/theme-rtl";

// RTL plugins
//import rtlPlugin from "stylis-plugin-rtl";
//import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
//import routes from "../src/routes";

// Material Dashboard 2 React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "../src/context";

// Images
import brandWhite from "../src/assets/images/logo-ct-dark.png";
import brandDark from "../src/assets/images/logo-ct-dark.png";
import Login from "./components/authentication/Login";
import Registrarme from "./components/authentication/Registrarme";
import Confirmacion from "./components/authentication/Confirmacion";
import ConfirmacionIngreso from "./components/authentication/ConfirmacionIngreso";
import RecuperarPass from "./components/authentication/RecuperarPass";
import ConfirmacionRecuperoPass from "./components/authentication/ConfirmacionRecuperoPass";
import PerfilAdd from "./components/authentication/Perfil/PerfilAdd";
import PerfilEdit from "./components/authentication/Perfil/PerfilEdit";
import Perfiles from "./components/authentication/Perfil/Perfiles";
import TareaTipoList from "./components/Pages/Tareas/TareaTipo/TareaTipoList";
import TareaEstadoList from "./components/Pages/Tareas/TareasEstado/TareaEstadoList";
import { AdminPanelSettings, AdminPanelSettingsOutlined, FileDownloadSharp, Settings } from "@mui/icons-material";
import TareaTipoAdd from "./components/Pages/Tareas/TareaTipo/TareaTipoAdd";
import TareaTipoEdit from "./components/Pages/Tareas/TareaTipo/TareaTipoEdit";
import TareaEstadoAdd from "./components/Pages/Tareas/TareasEstado/TareaEstadoAdd";
import TareaEstadoEdit from "./components/Pages/Tareas/TareasEstado/TareaEstadoEdit";
import DepartamentoList from "./components/Pages/Departamentos/DepartamentoList";
import DepartamentoAdd from "./components/Pages/Departamentos/DepartamentoAdd";
import DepartamentoEdit from "./components/Pages/Departamentos/DepartamentoEdit";
import TipoEventoList from "./components/Pages/TipoEvento/TipoEventoListar";
import TipoEventoAdd from "./components/Pages/TipoEvento/TipoEventoAdd";
import TipoEventoEdit from "./components/Pages/TipoEvento/TipoEventoEdit";
import ClienteList from "./components/Pages/Clientes/ClienteList";
import ClienteAdd from "./components/Pages/Clientes/ClienteAdd";
import ClienteEdit from "./components/Pages/Clientes/ClienteEdit";
import TareaList from "./components/Pages/Tareas/TareaList";
import SessionChecker from "./SessionChecker";
import RolList from "./components/authentication/Rol/RolList";
import ConfirmarCuentaxToken from "./components/authentication/ConfirmarCuentaxToken";
import ConfirmacionActivacionCuenta from "./components/authentication/ConfirmacionActivacionCuenta";
import RolAdd from "./components/authentication/Rol/RolAdd";
import RolEdit from "./components/authentication/Rol/RolEdit";
import Permisos from "./components/authentication/Permisos";
import CloseSession from "./components/authentication/CloseSession";
import EventoTareaAdd from "./components/Pages/Tareas/EventoTareaAdd";
import TareaTrakingList from "./components/Pages/Tareas/TareaTrakingList";
import TareaAdd from "./components/Pages/Tareas/TareaAdd";
import UsuarioEdit from "./components/authentication/Usuario/UsuarioEdit";
import UsuarioList from "./components/authentication/Usuario/UsuarioList";
import EventoTareaEdit from "./components/Pages/Tareas/EventoTareaEdit";
import PresupuestoList from "./components/Pages/Presupuestos/PresupuestoList";
import PresupuestoCopy from "./components/Pages/Presupuestos/PresupuestoCopy";
import PresupuestoAdd from "./components/Pages/Presupuestos/PresupuestoAdd";
import PresupuestoEdit from "./components/Pages/Presupuestos/PresupuestoEdit";
import PresupuestoAccept from "./components/Pages/Presupuestos/PresupuestoAccept";
import VencimientosEdit from "./components/Pages/Vencimientos/VencimientosEdit";
import VencimientosList from "./components/Pages/Vencimientos/VencimientosList";
import VencimientosAdd from "./components/Pages/Vencimientos/VencimientosAdd";
import TareaDocumentacionList from "./components/Pages/Tareas/TareasDocumentacion/TareaDocumentacionList";
import TareaDocumentacionDelete from "./components/Pages/Tareas/TareasDocumentacion/TareaDocumentacionDelete";
import CambiarContrasenia from "./components/authentication/CambiarContrasenia";
import EventoTareaDelete from "./components/Pages/Tareas/EventoTareaDelete";
import routesPermisos from "./routesPermisos";
import VencimientosAddMasivo from "./components/Pages/Vencimientos/VencimientosAddMasivo";

import { KeyFill, People, Person } from "react-bootstrap-icons";
import {
  Close,
  DateRange,
  Event,
  EventAvailable,
  ManageAccounts,
  PersonSearch,
  Task,
  TaskAlt,
} from "@mui/icons-material";
import axios from "axios";
import API_URL from "./config";

// import GraficoClientes from "./components/Pages/Charts/Clientes/GraficoClientes";
// import GraficoEstadoTareas from "./components/Pages/Charts/EstadoTareas/GraficoEstadoTareas";
import TratamientoNoConformidadListar from "./components/Pages/NoConformidad/TratamientoNoConformidadListar";

import NoConformidadAccionListar from "./components/Pages/NoConformidad/NoConformidadAcciones/NoConformidadAccionListar";
import NoConformidadAccionEdit from "./components/Pages/NoConformidad/NoConformidadAcciones/NoConformidadAccionEdit";
import NoConformidadAccionDelete from "./components/Pages/NoConformidad/NoConformidadAcciones/NoConformidadAccionDelete";
import NoConformidadAccionAdd from "./components/Pages/NoConformidad/NoConformidadAcciones/NoConformidadAccionAdd";
import TratamientoNoConformidadEdit from "./components/Pages/NoConformidad/TratamientoNoConformidadEdit";
import VencimientosDeleteByCode from "./components/Pages/Vencimientos/VencimientosDeleteByCode";
import TratamientoNoConformidadAuditor from "./components/Pages/NoConformidad/TratamientoNoConformidadAuditor";
import TratamientoNoConformidadView from "./components/Pages/NoConformidad/TratamientoNoConformidadView";


export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  // const [IsRegister, setIsRegister] = useState(false);

  const initialAuthState = localStorage.getItem("isLoggedIn") === "true";

  const isRegistrar = localStorage.getItem("isRegister") === "true";

  const isActivarCuenta = localStorage.getItem("isActivarCuenta") === "true";

  const isForgotPassword = localStorage.getItem("isForgotPassword") === "true";

  const [isLoggedIn, setIsLoggedIn] = useState(initialAuthState);
  const [shouldReload, setShouldReload] = useState(false);
  const [routesVisible, setRoutesVisible] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);

  const handleCloseSession = () => {
 
    localStorage.setItem("isRegister", "false");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("idPerfil", "0");
  
  
    // rutasVisibles = routes.filter(route => route.visible === true);
    // console.log("rutasVisibles ", rutasVisibles);
    // getRoutes(rutasVisibles)
  };

  let routesnew = [];
 const [routebydatabase, setRoutebydatabase] = useState([]);

routesnew = [
  {
    type: "title",
    name: "Tareas",
    title: "Tareas",
    key: "tareas",
    icon: <People />,
    visible: false,
    codigoPermiso: 100,
  },
  {
    type: "collapse",
    name: "Tareas",
    key: "mantenimientotareas",
    icon: <Task />,
    route: "/Tarea",
    component: <TareaList />,
    visible: false,
    codigoPermiso: 101,
    //visible: retrievedPermissions.USUARIOS?.valor || false
  },
  {
    type: "collapse",
    name: "Tipo de Tareas",
    key: "tipotareas",
    icon: <TaskAlt />,
    route: "/TareasTipo",
    component: <TareaTipoList />,
    visible: false,
    codigoPermiso: 102,
  },
  {
    type: "collapse",
    name: "Departamentos",
    key: "departamentostareas",
    icon: <Event />,
    route: "/Departamentos",
    component: <DepartamentoList />,
    visible: false,
    codigoPermiso: 103,
  },
  {
    type: "collapse",
    name: "Estados de Tareas",
    key: "estadotareas",
    icon: <Event />,
    route: "/TareaEstado",
    component: <TareaEstadoList />,
    visible: false,
    codigoPermiso: 104,
  },
  {
    type: "collapse",
    name: "Presupuestos",
    key: "presupuestos",
    icon: <Event />,
    route: "/Presupuestos",
    component: <PresupuestoList />,
    visible: false,
    codigoPermiso: 105,
  },
  {
    type: "collapse",
    name: "Vencimientos",
    key: "vencimientos",
    icon: <DateRange />,
    route: "/Vencimientos",
    component: <VencimientosList />,
    visible: false,
    codigoPermiso: 106,
  },
  {
    type: "title",
    name: "Auditoria",
    key: "auditoria",
    title: "Auditoria",
    icon: <FileDownloadSharp />,
    visible: true,
    codigoPermiso: 600,
  },
  {
    type: "collapse",
    name: "Acciones No Conformidad",
    key: "tiposnoconformidad",
    title: "Acciones No Conformidad",
    route: "/NoConformidadAccionListar",
    icon: <AdminPanelSettingsOutlined />,
    component: <NoConformidadAccionListar />,
    visible: false,
    codigoPermiso: 601,
  },
  {
    type: "collapse",
    name: "Tratamientos No Conformidad",
    key: "tratamientosnoconformidad",
    title: "Tratamientos No Conformidad",
    route: "/TratamientoNoConformidadListar",
    icon: <AdminPanelSettings />,
    component: <TratamientoNoConformidadListar />,
    visible: false,
    codigoPermiso: 602,
  },
  {
    type: "title",
    name: "Eventos",
    key: "eventos",
    title: "Eventos",
    visible: false,
    codigoPermiso: 200,
  },
  {
    type: "collapse",
    name: "Tipos de Evento",
    key: "tiposdeeventos",
    icon: <EventAvailable />,
    route: "/TipoEvento",
    component: <TipoEventoList />,
    visible: false,
    codigoPermiso: 201,
  },
  {
    type: "title",
    name: "Clientes",
    key: "clientes",
    title: "Clientes",
    visible: false,
    codigoPermiso: 300,
  },
  {
    type: "collapse",
    name: "Mantenimiento Clientes",
    key: "mantenimientoclientes",
    icon: <People />,
    route: "/Clientes",
    component: <ClienteList />,
    visible: false,
    codigoPermiso: 301,
  },
  {
    type: "title",
    name: "Seguridad",
    key: "seguridad",
    title: "Seguridad",
    icon: <KeyFill />,
    visible: true,
    codigoPermiso: 400,
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    title: "Usuarios",
    icon: <ManageAccounts />,
    route: "/Usuarios",
    component: <UsuarioList />,
    visible: false,
    codigoPermiso: 401,
  },
  {
    type: "collapse",
    name: "Perfiles",
    key: "perfiles",
    title: "Perfiles",
    icon: <Person />,
    route: "/Perfiles",
    component: <Perfiles />,
    visible: false,
    codigoPermiso: 402,
  },
  {
    type: "collapse",
    name: "Roles",
    key: "roles",
    icon: <PersonSearch />,
    route: "/Rol",
    component: <RolList />,
    visible: false,
    codigoPermiso: 403,
  },
  {
    type: "collapse",
    name: "ChangePassword",
    key: "changepassword",
    icon: <KeyFill />,
    route: "/CambiarContrasenia",
    component: <CambiarContrasenia />,
    visible: true,
    codigoPermiso: 404,
  },
  {
    type: "collapse",
    name: "Cerrar Sesion",
    key: "closesession",
    icon: <Close />,
    route: "/Closesession",
    component: <CloseSession handleCloseSession={handleCloseSession} />,
    visible: true,
    codigoPermiso: 999,
  },
];


const GetPermisos = async () => {
  let routes = [];
  try {
    const reqPermisosxPerfil = {
      idperfil: localStorage.getItem("idPerfil"),
    };

    const response = await axios.post(
      API_URL + `/PerfilxPermisoListar`,
      reqPermisosxPerfil,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const permisosBaseDatos = response.data;

    if(permisosBaseDatos != null){
      // Aquí se realiza cualquier operación o lógica que dependa de los permisos recuperados
      
      routes = routesnew.map((route) => {
        const permisoEncontrado = permisosBaseDatos.find(
          (permiso) => permiso.codigoPermiso === route.codigoPermiso
        );
        if (permisoEncontrado) {
          route.visible = true;
        } else {
          if (route.codigoPermiso === 999 || route.codigoPermiso === 404) {
            route.visible = true;
          } else {
            route.visible = false;
          }
        }
        return route;
      });
    }

    return routes;
    // Llamar a cualquier otra función o realizar operaciones adicionales aquí después de actualizar 'routes'
  } catch (error) {
    console.error("Error 222:", error);
  }
};


  const navigate = useNavigate();
  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
    });
    //stylisPlugins: [rtlPlugin],
    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem('isRegister', 'false');
    localStorage.setItem('isActivarCuenta', 'false');
    localStorage.setItem('isForgotPassword', 'false');
    setShouldReload(true);
    navigate("/");
  };
 useEffect(() => {
 
  }, []); // Se ejecuta solo una vez al montar el componente

  // Almacena el estado de autenticación en localStorage cuando cambie
  // useEffect( () => {
  //   localStorage.setItem("isLoggedIn", isLoggedIn);
    
  //   // Lógica para reconstruir las rutas basadas en el estado de autenticación (isLoggedIn)
  //   console.log("Routes ", 111);
  //   const updatedRoutes = routes.filter((route) => route.visible === true);
  //   console.log("Routes ", 222);
  //   setRoutesVisible(updatedRoutes);
  //     // Indica que la carga ha terminado
  //     setIsLoading(false);
  //     console.log("updatedRoutes ", updatedRoutes);
  //   if (shouldReload) {
      
  //     window.location.reload();
  //     setShouldReload(false); // Restablece shouldReload a false después de la recarga
  //   }
  // }, [isLoggedIn, shouldReload]);


  useEffect(() => {
    const fetchAndUpdateRoutes = async () => {
      try {
        // Aquí realizamos la lógica asíncrona para filtrar las rutas
        console.log("Routes ", 111);
        let routebydbtemp = await GetPermisos();
          // Esperamos a que se actualicen las rutas (por ejemplo, mediante una promesa)

          setRoutebydatabase(routebydbtemp);
  
        const updatedRoutes = routebydbtemp.filter((route) => route.visible === true);
        console.log("Routes ", 222);
        // Actualizamos el estado con las rutas filtradas
        setRoutesVisible(updatedRoutes);
  
            // Si shouldReload es verdadero, recargamos la página
        // if (shouldReload) {
        //   window.location.reload();
        //   setShouldReload(false); // Restablece shouldReload a false después de la recarga
        // }
      } catch (error) {
        console.error('Error al filtrar rutas:', error);
       
      }
    };
  
    // Llamamos a la función auxiliar asíncrona
    fetchAndUpdateRoutes();
  
    // Actualizamos el estado de isLoggedIn en localStorage
    localStorage.setItem("isLoggedIn", isLoggedIn);
  
  }, [isLoggedIn, shouldReload]);



  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction.tostrin);
   
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
 
  }, [pathname]);

  const getRoutes = (allRoutes) =>
 
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
            visible={route.visible}
          />
        );
      }
      
      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      {/* <Icon fontSize="small" color="inherit">
        settings
      </Icon> */}
      <Settings />
    </MDBox>
  );

  // if (isLoading) {
   
  //   setTimeout(() => {
  //     setIsLoading(false); // Finaliza la simulación de carga después de 2 segundos
  //   }, 5000);
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {isLoggedIn ? (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />

          <SessionChecker />

          <Routes>
            {getRoutes(routesVisible)}
            <Route
              path="/"
              element={<ConfirmacionIngreso />}
            />
            <Route
              path="/ConfirmacionActivacionCuenta"
              element={<ConfirmacionActivacionCuenta />}
            />
            <Route
              path="/ConfirmarCuentaXToken"
              element={<ConfirmarCuentaxToken />}
            />
            <Route
              path="/ConfirmacionIngreso"
              element={<ConfirmacionIngreso />}
            />
            <Route path="/Confirmacion" element={<Confirmacion />} />
            <Route
              path="/Login"
              element={<Login handleLogin={handleLogin} />}
            />
            {/* <Route path="*" element={<Login handleLogin={handleLogin} />} /> */}
            <Route path="/Registrarme" element={<Registrarme />} />
            <Route path="/RecuperarPass" element={<RecuperarPass />} />
            <Route
              path="/ConfirmacionRecuperoPass"
              element={<ConfirmacionRecuperoPass />}
            />
            <Route path="/Perfil/PerfilAdd" element={<PerfilAdd />} />
            <Route path="/Perfil/PerfilEdit/:id" element={<PerfilEdit />} />
            <Route path="/Perfil/Perfiles" element={<Perfiles />} />
            <Route path="/PerfilesVolver" element={<Perfiles />} />
            <Route path="/Perfiles" element={<Perfiles />} />
            <Route path="/DepartamentoAdd" element={<DepartamentoAdd />} />
            <Route
              path="/Departamento/DepartamentoEdit/:id"
              element={<DepartamentoEdit />}
            />
            <Route path="/Departamentos" element={<DepartamentoList />} />
            <Route path="/DepartamentoVolver" element={<DepartamentoList />} />

            <Route
              path="/TareaEstado/TareaEstadoEdit/:id"
              element={<TareaEstadoEdit />}
            />
            <Route path="/TareaEstadoAdd" element={<TareaEstadoAdd />} />
            <Route path="/TareaEstado" element={<TareaEstadoList />} />
            <Route path="/TareaEstadoVolver" element={<TareaEstadoList />} />

            <Route path="/TareasTipo" element={<TareaTipoList />} />
            <Route path="/TareaTipoVolver" element={<TareaTipoList />} />
            <Route path="/TareaTipoAdd" element={<TareaTipoAdd />} />
            <Route
              path="/TareaTipo/TareaTipoEdit/:id"
              element={<TareaTipoEdit />}
            />

            <Route path="/TipoEventoEdit/:id" element={<TipoEventoEdit />} />
            <Route path="/TipoEventoAdd" element={<TipoEventoAdd />} />
            <Route path="/TipoEvento" element={<TipoEventoList />} />
            <Route path="/TipoEventoVolver" element={<TipoEventoList />} />

            <Route path="/ClienteEdit/:id" element={<ClienteEdit />} />
            <Route path="/ClienteAdd" element={<ClienteAdd />} />
            <Route path="/Clientes" element={<ClienteList />} />
            <Route path="/ClienteVolver" element={<ClienteList />} />

            <Route path="/TareaEdit/:id" element={<TareaList />} />
            <Route path="/EventoTareaDelete/:id/:habilitado" element={<EventoTareaDelete />} />
            <Route path="/TareaAdd" element={<TareaAdd />} />
            <Route path="/Tarea" element={<TareaList />} />
            <Route path="/TareaVolver" element={<TareaList />} />

            <Route path="/RolEdit/:id" element={<RolEdit />} />
            <Route path="/RolAdd" element={<RolAdd />} />
            <Route path="/Rol" element={<RolList />} />
            <Route path="/RolVolver" element={<RolList />} />
            <Route path="/Permisos/:id" element={<Permisos />} />
            <Route path="/CloseSession" element={<CloseSession />} />

            <Route path="/EventoTareaEdit/:id/:habilitado" element={<EventoTareaEdit />} />
            <Route path="/EventoTareaAdd/:id" element={<EventoTareaAdd />} />
            <Route path="/TareaTraking/:id" element={<TareaTrakingList />} />
            <Route path="/TareaListVolver" element={<TareaList />} />

            <Route path="/UsuarioEdit/:id" element={<UsuarioEdit />} />
            <Route path="/UsuarioVolver" element={<UsuarioList />} />
            <Route path="/Usuarios" element={<UsuarioList />} />

            <Route path="/PresupuestoAceptar/:id/:habilitado" element={<PresupuestoAccept />} /> 
            <Route path="/PresupuestoCopy/:id" element={<PresupuestoCopy />} /> 
            <Route path="/PresupuestoVolver" element={<PresupuestoList />} />
            <Route path="/PresupuestoAdd" element={<PresupuestoAdd />} />
            <Route path="/PresupuestoEdit/:id" element={<PresupuestoEdit />} />
            <Route path="/Presupuestos" element={<PresupuestoList />} />
            <Route path="/VencimientosEdit/:id" element={<VencimientosEdit />} /> 
            <Route path="/VencimientosVolver" element={<VencimientosList />} />
            <Route path="/VencimientosAdd" element={<VencimientosAdd />} />
            <Route path="/VencimientosAddMasivo" element={<VencimientosAddMasivo />} />
            <Route path="/VencimientosDeleteByCode" element={<VencimientosDeleteByCode />} />
            <Route path="/Vencimientos" element={<VencimientosList />} />
            
            <Route path="/TareaDocumentacionList/:id" element={<TareaDocumentacionList />} />
            <Route path="/TareaDocumentacionDelete/:id" element={<TareaDocumentacionDelete />} /> 
            <Route path="/TareaDocumentacionVolver" element={<TareaDocumentacionList />} />
            

            <Route path="/NoConformidadAccionListar" element={<NoConformidadAccionListar />} /> 
            <Route path="/NoConformidadAccionAdd" element={<NoConformidadAccionAdd />} /> 
            <Route path="/NoConformidadAccionDelete/:id" element={<NoConformidadAccionDelete />} />
            <Route path="/NoConformidadAccionEdit/:id" element={<NoConformidadAccionEdit />} />
            <Route path="/NoConformidadAccionVolver" element={<NoConformidadAccionListar />} /> 
            
            <Route path="/TratamientoNoConformidadListar" element={<TratamientoNoConformidadListar />} />
            <Route path="/TratamientoNoConformidadEdit/:id" element={<TratamientoNoConformidadEdit />} />
            <Route path="/TratamientoNoConformidadView/:id" element={<TratamientoNoConformidadView />} />
            <Route path="/TratamientoNoConformidadAuditor/:id" element={<TratamientoNoConformidadAuditor />} />
            
            {/* <Route path="/Prueba" element={<Prueba />} /> */}
            <Route path="/CambiarContrasenia" element={<CambiarContrasenia />} />
            {/* <Route path="/chart1" element={<Example />} /> */}


            {/* Graficos */}
            {/* <Route path="/GraficoClientes" element={<GraficoClientes />} />
            <Route path="/GraficoEstadoTareas" element={<GraficoEstadoTareas />} /> */}
            
            {/* 


        <Route path="/TipoTareas" element={<TareaTipoList />} />
        <Route path="/EstadoTareas" element={<TareaEstadoList />} /> */}
          </Routes>

          <>

            <Sidenav
              color={sidenavColor}
              brand={
                (transparentSidenav && !darkMode) || whiteSidenav
                  ? brandDark
                  : brandWhite
              }
              brandName="Task Manager"
              routes={routesVisible}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              visible={false}
              
            />
            {/* <Configurator />
            {configsButton}
            {layout === "vr" && <Configurator />} */}
          </>
        </ThemeProvider>
      ) : (
        <>
          {!isLoggedIn &&
          !isRegistrar &&
          !isActivarCuenta &&
          !isForgotPassword ? (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
              <CssBaseline />
              <Login handleLogin={handleLogin} />
            </ThemeProvider>
          ) : isRegistrar ? (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
              <CssBaseline />
              <Registrarme />
            </ThemeProvider>
          ) : isActivarCuenta ? (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
              <CssBaseline />
              <ConfirmarCuentaxToken />
            </ThemeProvider>
          ) : (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
              <CssBaseline />
              <RecuperarPass />
            </ThemeProvider>
          )}
        </>
      )}
    </>
  );
}

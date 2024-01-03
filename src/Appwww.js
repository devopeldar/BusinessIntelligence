import { useState, useEffect, useMemo } from "react";

// react-router components
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

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
import themeRTL from "../src/assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "../src/assets/theme-dark";
import themeDarkRTL from "../src/assets/theme-dark/theme-rtl";

// RTL plugins
//import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "../src/routes";

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
import { Settings } from "@mui/icons-material";
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
  console.log("initialAuthState " + initialAuthState);
  const isRegistrar = localStorage.getItem("isRegister") === "true";

  const [isLoggedIn, setIsLoggedIn] = useState(initialAuthState);

  const rutasVisibles = routes.filter(route => route.visible === true);


  // const getPermissionsFromLocalStorage = () => {
  //   //const permissions = localStorage.getItem('perfilesfromDB');

  //   const retrievedPermissions = routes;
  //   // 2. Obtener los datos de localStorage
  //   const localStorageData = JSON.parse(localStorage.getItem('perfilesfromDB'));
  //   if (localStorageData != null) {
  //     const filteredRoutes = retrievedPermissions.filter(route => route.visible === false)
  //       .map(route => {
  //         const routeName = route.name; // Nombre de la ruta o algún identificador único
  //         const hasPermission = localStorageData && localStorageData.hasOwnProperty(routeName) && localStorageData[routeName].valor;
  //         return { ...route, visible: hasPermission }; // Actualizar la propiedad visible con el valor de localStorage
  //       });


  //     return filteredRoutes ? JSON.parse(filteredRoutes) : null;
  //   }
  //   return [];
  //   // 3. Filtrar las rutas con visible en false y verificar en los datos de localStorage

  // };
  // const rutasVisibles = getPermissionsFromLocalStorage();
  // console.log("rutasVisibles " + rutasVisibles);

  //const [isRegistrandome, setIsRegistrandome] = useState(isRegistrar);
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
    navigate("/ConfirmacionIngreso");
    //const userLogin = JSON.parse(sessionStorage.getItem('UsuarioLogueado'));
    //console.log("userLogin " + userLogin);
    // setLayout("dashboard");
    // console.log("layout " + layout);
  };

  // Almacena el estado de autenticación en localStorage cuando cambie
  useEffect(() => {

    localStorage.setItem("isLoggedIn", isLoggedIn);
    console.log(8888);
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setIsRegister(false);
  //   console.log("handleLoginaaa");
  // };

  // const handleRegister = () => {
  //   // Lógica para registro exitoso
  //   setIsLoggedIn(false);
  //   setIsRegister(true);
  //   console.log("handleLogin88888");
  // };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
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

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />

      <SessionChecker />

      <Routes>
        {getRoutes(rutasVisibles)}


        <Route path="/ConfirmacionActivacionCuenta" element={<ConfirmacionActivacionCuenta />} />
        <Route path="/ConfirmarCuentaXToken" element={<ConfirmarCuentaxToken />} />
        <Route path="/ConfirmacionIngreso" element={<ConfirmacionIngreso />} />
        <Route path="/Confirmacion" element={<Confirmacion />} />
       <Route path="/" element={<Login handleLogin={handleLogin} />} />
         {/*<Route path="*" element={<Login handleLogin={handleLogin} />} /> */}
        <Route path="/Registrarme" element={<Registrarme />} />
        <Route path="/RecuperarPass" element={<RecuperarPass />} />
        <Route
          path="/ConfirmacionRecuperoPass"
          element={<ConfirmacionRecuperoPass />}
        />
        <Route path="/Perfil/PerfilAdd" element={<PerfilAdd />} />
        <Route path="/Perfil/PerfilEdit/:id" element={<PerfilEdit />} />
        <Route path="/Perfil/Perfiles" element={<Perfiles />} />

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
        <Route path="/Cliente" element={<ClienteList />} />
        <Route path="/ClienteVolver" element={<ClienteList />} />

        <Route path="/TareaEdit/:id" element={<TareaList />} />
        <Route path="/TareaAdd" element={<TareaList />} />
        <Route path="/Tarea" element={<TareaList />} />
        <Route path="/TareaVolver" element={<TareaList />} />

        <Route path="/RolEdit/:id" element={<RolEdit />} />
        <Route path="/RolAdd" element={<RolAdd />} />
        <Route path="/Rol" element={<RolList />} />
        <Route path="/RolVolver" element={<RolList />} />
        <Route path="/Permisos/:id" element={<Permisos />} />
        {/* 


        <Route path="/TipoTareas" element={<TareaTipoList />} />
        <Route path="/EstadoTareas" element={<TareaEstadoList />} /> */}
      </Routes>

      {!isLoggedIn && !isRegistrar ? (
        <Login handleLogin={handleLogin} />
      ) : isRegistrar ? (
        <Registrarme />
      ) : (
        <>
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName="Task Manager"
            routes={rutasVisibles}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
          {layout === "vr" && <Configurator />}
        </>
      )}
    </ThemeProvider>
  );
}

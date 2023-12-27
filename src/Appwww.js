/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-router components
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Router,
  useNavigate,
} from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

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
  setLayout,
} from "../src/context";

// Images
import brandWhite from "../src/assets/images/logo-ct-dark.png";
import brandDark from "../src/assets/images/logo-ct-dark.png";
import Login from "./components/authentication/Login";
import { LayerBackward } from "react-bootstrap-icons";
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
import TareaEstado from "./components/Pages/Tareas/TareasEstado/TareaEstadoList";
import { Settings } from "@mui/icons-material";
import TareaTipoAdd from "./components/Pages/Tareas/TareaTipo/TareaTipoAdd";
import TareaTipoEdit from "./components/Pages/Tareas/TareaTipo/TareaTipoEdit";
import TareaEstadoAdd from "./components/Pages/Tareas/TareasEstado/TareaEstadoAdd";
import TareaEstadoEdit from "./components/Pages/Tareas/TareasEstado/TareaEstadoEdit";
import DepartamentoGet from "./components/Pages/Departamentos/DepartamentoGet";
import DepartamentoList from "./components/Pages/Departamentos/DepartamentoList";
import DepartamentoAdd from "./components/Pages/Departamentos/DepartamentoAdd";
import DepartamentoEdit from "./components/Pages/Departamentos/DepartamentoEdit";
import TipoEventoGet from "./components/Pages/TipoEvento/TipoEventoGet";
import TipoEventoList from "./components/Pages/TipoEvento/TipoEventoListar";
import TipoEventoAdd from "./components/Pages/TipoEvento/TipoEventoAdd";

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
  const [IsRegister, setIsRegister] = useState(false);

  const initialAuthState = localStorage.getItem("isLoggedIn") === "true";

  const isRegistrar = localStorage.getItem("isRegister") === "true";

  const [isLoggedIn, setIsLoggedIn] = useState(initialAuthState);
  const [isRegistrandome, setIsRegistrandome] = useState(isRegistrar);
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
    console.log("handleLogin");
    console.log("layout " + layout);

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsRegister(false);
    console.log("handleLoginaaa");
  };

  const handleRegister = () => {
    // Lógica para registro exitoso
    setIsLoggedIn(false);
    setIsRegister(true);
    console.log("handleLogin88888");
  };

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
      <Settings/>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
    
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {isLoggedIn && isRegistrar ? (
          <>
            {layout === "page" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={
                    (transparentSidenav && !darkMode) || whiteSidenav
                      ? brandDark
                      : brandWhite
                  }
                  brandName="Task Manager"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
              {getRoutes(routes)}
              <Route
                path="/ConfirmacionIngreso"
                element={<ConfirmacionIngreso />}
              />
              <Route path="/Confirmacion" element={<Confirmacion />} />
              <Route path="/" element={<Login handleLogin={handleLogin} />} />
              <Route path="*" element={<Login handleLogin={handleLogin} />} />
              <Route path="/Registrarme" element={<Registrarme />} />
              <Route path="/RecuperarPass" element={<RecuperarPass />} />
              <Route
                path="/ConfirmacionRecuperoPass"
                element={<ConfirmacionRecuperoPass />}
              />
              <Route path="/Perfil/PerfilAdd" element={<PerfilAdd />} />
              <Route path="/Perfil/PerfilEdit/:id" element={<PerfilEdit />} />
              <Route path="/Perfil/Perfiles" element={<Perfiles />} />
            </Routes>
          </>
        ) : (
          // Renderiza el componente de inicio de sesión solo si el usuario no está autenticado
          <Login handleLogin={handleLogin} />
        )}
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />

      <Routes>
        {getRoutes(routes)}
        <Route path="/ConfirmacionIngreso" element={<ConfirmacionIngreso />} />
        <Route path="/Confirmacion" element={<Confirmacion />} />
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="*" element={<Login handleLogin={handleLogin} />} />
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
        <Route path="/Departamento/DepartamentoEdit/:id" element={<DepartamentoEdit />} />
        <Route path="/Departamentos" element={<DepartamentoList />} />
        <Route path="/DepartamentoVolver" element={<DepartamentoList />} />

        <Route path="/TareaEstado/TareaEstadoEdit/:id" element={<TareaEstadoEdit />} />
        <Route path="/TareaEstadoAdd" element={<TareaEstadoAdd />} />
        <Route path="/TareaEstado" element={<TareaEstadoList />} />
        <Route path="/TareaEstadoVolver" element={<TareaEstadoList />} />

        <Route path="/TareaTipoVolver" element={<TareaTipoList />} />
        <Route path="/TareaTipoAdd" element={<TareaTipoAdd />} />
        <Route path="/TareaTipo/TareaTipoEdit/:id" element={<TareaTipoEdit />} />

        <Route path="/TipoEventoEdit/:id" element={<TipoEventoList />} />
        <Route path="/TipoEventoAdd" element={<TipoEventoAdd />} />
        <Route path="/TipoEvento" element={<TipoEventoList />} />
        <Route path="/TipoEventoVolver" element={<TipoEventoList />} />

{/* 


        <Route path="/TipoTareas" element={<TareaTipoList />} />
        <Route path="/EstadoTareas" element={<TareaEstadoList />} /> */}
      </Routes>

      {console.log(444)}
      {console.log(isLoggedIn)}
      {console.log(isRegistrar)}
      {!isLoggedIn && !isRegistrar ? (
        <Login handleLogin={handleLogin} />
      ) : isRegistrar ? (
        <Registrarme />
      ) : (
        <>
          {console.log(666666)}
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName="Task Manager"
            routes={routes}
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

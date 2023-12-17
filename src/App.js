import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AcercaDe from './components/Pages/AcercaDe';
import Auditoria from './components/authentication/Auditoria';
import Usuarios from './components/authentication/Usuarios';
import Roles from './components/authentication/Roles';
import Registrarme from './components/authentication/Registrarme';
import RecuperarPass from './components/authentication/RecuperarPass';
import Permisos from './components/authentication/Permisos';
import Clientes from './components/Pages/Clientes';
import Tarea from './components/Pages/Tarea';
import Login from './components/authentication/Login';
import PerfilAdd from './components/authentication/Perfil/PerfilAdd';
import Perfiles from './components/authentication/Perfil/Perfiles';
import PerfilEdit from './components/authentication/Perfil/PerfilEdit';
import Confirmacion from './components/authentication/Confirmacion';

import TareaTipoList from './components/Pages/Tareas/TareaTipo/TareaTipoList';
import TareaTipoAdd from './components/Pages/Tareas/TareaTipo/TareaTipoAdd';

import routes from './routes';
import SideNav from './components/menu/SideNav';
import TareaEstadoList from './components/Pages/TareasEstado/TareasEstadoList';
import DepartamentoList from './components/Pages/Departamentos/DepartamentoList';
import TipoEventoList from './components/Pages/TipoEvento/TipoEventoListar';
// import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
// componentDidMount(){
//   const { match } = this.props;
//   const { params } = match;
//   const { token } = params;

//   console.log('Token capturado:', token);
//   // Puedes hacer lo que necesites con el token aquí
// }

const App = () => {

 
  // const [controller, dispatch] = useMaterialUIController();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [IsRegister, setIsRegister] = useState(false);

  // const {
  //   miniSidenav,
  //   direction,
  //   layout,
  //   openConfigurator,
  //   sidenavColor,
  //   transparentSidenav,
  //   whiteSidenav,
  //   darkMode,
  // } = controller;
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("handleLogin");

  };

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

// Open sidenav when mouse enter on mini sidenav
// const handleOnMouseEnter = () => {
//   if (miniSidenav && !onMouseEnter) {
//     setMiniSidenav(dispatch, false);
//     setOnMouseEnter(true);
//   }
// };

// // Close sidenav when mouse leave mini sidenav
// const handleOnMouseLeave = () => {
//   if (onMouseEnter) {
//     setMiniSidenav(dispatch, true);
//     setOnMouseEnter(false);
//   }
// };
  return (
    <Router>
      <div>
        {
          !isLoggedIn && !IsRegister ? (
            <Login handleLogin={handleLogin} handleRegister={handleRegister} />
          ) :
            IsRegister ? (
              <Registrarme handleLogin={handleLogout} />
            ) : (
            //   <Sidenav
            //   // color={sidenavColor}
            //   // brand={(transparentSidenav && !darkMode) || whiteSidenav ? whiteSidenav : darkMode}
            //   brandName="Task Manager"
            //   routes={routes}
            //   // onMouseEnter={handleOnMouseEnter}
            //   // onMouseLeave={handleOnMouseLeave}
            // />
            <SideNav routes={routes} />
              // <Navigationbar handleClosesesion={handleClosesesion} />
            )}
        {/* Navegación con links */}

        <Routes>
          {/* <Switch>
          
            <Route path="/ConfirmarCuentaxToken/:token" component={<ConfirmarCuentaxToken />} />
          
          </Switch> */}
          {/* Rutas */}
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/about" element={<AcercaDe />} />
          <Route path="/changepassword" element={<changepassword />} />
          <Route path="/Usuarios" element={<Usuarios />} />
          <Route path="/Auditoria" element={<Auditoria />} />
          <Route path="/Roles" element={<Roles />} />
          <Route path="/Permisos" element={<Permisos />} />
          <Route path="/Confirmacion/:email" element={<Confirmacion />} />
          {/* <Route path="/Registrarme" element={<Registrarme />} /> */}
          <Route path="/ConfirmarCuentaxToken/:token" component={<Roles />} />
          {/* <Route exact path="/Registrarme"  onRegister={() => setIsLoggedIn(true)} element={<Registrarme />}/> */}

          <Route path="/RecuperarPass" element={<RecuperarPass />} />
          <Route path="/Perfil/PerfilAdd" element={<PerfilAdd />} />
          <Route path="/Perfil/PerfilEdit/:id" element={<PerfilEdit />} />
          <Route path="/Perfil/Perfiles" element={<Perfiles />} />
          <Route path="/Clientes" element={<Clientes />} />

          <Route path="/Tarea" element={<Tarea />} />
          <Route path="/TareaTipo" element={<TareaTipoList />} />
          <Route path="/TareaTipo/TareaTipoAdd" element={<TareaTipoAdd />} />

          <Route path="/TareaEstado" element={<TareaEstadoList />} />

          <Route path="/Departamento" element={<DepartamentoList />} />

          <Route path="/TipoEvento" element={<TipoEventoList />} />
          {/* <Route path="/TareaTipo/TareaTipoEdit/:id" element={<TareaTipoAdd />} /> */}
        </Routes>

        {/* 
          <Switch>
            <Route exact path="/">
              <Perfiles />
            </Route>
            <Route path="/editar/:id">
              <PerfilEdit />
            </Route>
          </Switch> */}

      </div>
    </Router>
  );
};

export default App; 
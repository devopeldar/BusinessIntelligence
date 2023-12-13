import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Inicio from './components/Pages/Inicio';
import AcercaDe from './components/Pages/AcercaDe';
import Navigationbar from './components/menu/Navigationbar';
import Auditoria from './components/authentication/Auditoria';
import changepassword from './components/authentication/changepassword';
import Usuarios from './components/authentication/Usuarios';
import Roles from './components/authentication/Roles';
import Registrarme from './components/authentication/Registrarme';
import RecuperarPass from './components/authentication/RecuperarPass';
import Permisos from './components/authentication/Permisos';
import Clientes from './components/Pages/Clientes';
import Tarea from './components/Pages/Tarea';
import TipoTarea from './components/Pages/TipoTarea';

import Login from './components/authentication/Login';
import PerfilAdd from './components/authentication/Perfil/PerfilAdd';
import Perfiles from './components/authentication/Perfil/Perfiles';
import PerfilEdit from './components/authentication/Perfil/PerfilEdit';
import Confirmacion from './components/authentication/Confirmacion';
import ConfirmarCuentaxToken from './components/authentication/ConfirmarCuentaxToken';
import { Switch } from '@mui/material';
// componentDidMount(){
//   const { match } = this.props;
//   const { params } = match;
//   const { token } = params;

//   console.log('Token capturado:', token);
//   // Puedes hacer lo que necesites con el token aquí
// }

const App = () => {

 

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [IsRegister, setIsRegister] = useState(false);
  const [IsConfirmacionRegister, setIsConfirmacionRegister] = useState(false);
  console.log(555555555555);
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("handleLogin");

  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsRegister(false);
    console.log("handleLoginaaa");

  };

  const handleClosesesion = () => {
    setIsLoggedIn(false);
    console.log("handleLoginwwwwww");
  };
  const handleRegister = () => {
    // Lógica para registro exitoso
    setIsLoggedIn(false);
    setIsRegister(true);
    console.log("handleLogin88888");
  };


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
              <Navigationbar handleClosesesion={handleClosesesion} />
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
          <Route path="/TipoTarea" element={<TipoTarea />} />

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
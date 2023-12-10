import React , { useState }from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Inicio from './components/Pages/Inicio';
import AcercaDe from './components/Pages/AcercaDe';
import Navigationbar from './components/menu/Navigationbar';
import Auditoria from './components/authentication/Auditoria';
import changepassword from './components/authentication/changepassword';
import Usuarios from './components/authentication/Usuarios';
import Roles from './components/authentication/Roles';
import Registrarme from './components/authentication/Roles';
import RecuperarPass from './components/authentication/RecuperarPass';
import Permisos from './components/authentication/Permisos';
import Clientes from './components/Pages/Clientes';
import Tarea from './components/Pages/Tarea';
import TipoTarea from './components/Pages/TipoTarea';

import Login from './components/authentication/Login';
import Perfil from './components/authentication/Perfil/Perfil';
import Perfiles from './components/authentication/Perfil/Perfiles';
import PerfilEditar from './components/authentication/Perfil/PerfilEditar';
import { Switch } from '@mui/material';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  return (
    <Router>
      <div>
      {!isLoggedIn ? (
        <Login handleLogin={handleLogin} />
      ):( 
        <Navigationbar handleLogout={handleLogout} />
      )}
        {/* Navegación con links */}
        
        <Routes>
            {/* Rutas */}
          {/* <Route path="/" element={<Inicio />} /> */}
          <Route path="/about" element={<AcercaDe />} />
          <Route path="/changepassword" element={<changepassword />} /> 
          <Route path="/Usuarios" element={<Usuarios />} />
          <Route path="/Auditoria" element={<Auditoria />} />
          <Route path="/Roles" element={<Roles />} />
          <Route path="/Permisos" element={<Permisos />} />
          <Route path="/Registrarme" element={<Registrarme />} />
          <Route path="/RecuperarPass" element={<RecuperarPass />} />
          <Route path="/Perfil/Perfil" element={<Perfil />} />
          <Route path="/Perfil/Perfiles" element={<Perfiles />} />
          <Route path="/Clientes" element={<Clientes />} />
                 
          <Route path="/Tarea" element={<Tarea />} />
          <Route path="/TipoTarea" element={<TipoTarea />} />

        </Routes>
      

          <Switch>
            <Route exact path="/">
              <Perfiles />
            </Route>
            <Route path="/editar/:id">
              <PerfilEditar />
            </Route>
          </Switch>

      </div>
    </Router>
  );
};

export default App; 
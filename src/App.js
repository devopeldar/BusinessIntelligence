import React from 'react';
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
const App = () => {
  return (
    <Router>
      <div>
        {/* Navegación con links */}
        <Navigationbar />
        <Routes>
            {/* Rutas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/about" element={<AcercaDe />} />
          <Route path="/changepassword" element={<changepassword />} /> 
          <Route path="/Usuarios" element={<Usuarios />} />
          <Route path="/Auditoria" element={<Auditoria />} />
          <Route path="/Roles" element={<Roles />} />
          <Route path="/Permisos" element={<Permisos />} />
          <Route path="/Registrarme" element={<Registrarme />} />
          <Route path="/RecuperarPass" element={<RecuperarPass />} />

          <Route path="/Clientes" element={<Clientes />} />
          
          
          <Route path="/Tarea" element={<Tarea />} />
          <Route path="/TipoTarea" element={<TipoTarea />} />

        </Routes>
      
      </div>
    </Router>
  );
};

export default App; 
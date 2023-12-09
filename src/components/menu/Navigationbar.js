import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { JournalCheck, KeyFill, ListTask, PersonFillSlash } from 'react-bootstrap-icons';
import { Person } from 'react-bootstrap-icons';
import { ListCheck } from 'react-bootstrap-icons';
import { PeopleFill } from 'react-bootstrap-icons';
import { PersonLinesFill } from 'react-bootstrap-icons';
import { PersonFillLock } from 'react-bootstrap-icons';
import { Journal } from 'react-bootstrap-icons';
const Menu = ({ handleLogout }) => {
  return (
    <div>
      <h2>Menú Principal</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
      {/* Agrega aquí tu contenido del menú */}
    </div>
  );
};


const Navigationbar = ({ handleLogout }) => {
  return (
    <Navbar bg="light" expand="lg">

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          <NavDropdown title="Tareas" id="basic-nav-dropdown">
            {/* Agregar elementos de submenú */}
            <NavDropdown.Item as={Link} to="/Tarea" >
              {/* <img src={sampleImage} alt="Icono" style={{ marginRight: '8px', width: '20px', height: '20px' }} /> */}
              <ListTask size={15} color="cornflowerblue" style={{ marginRight: '10px' }} />
              Mantenimiento Tareas</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/TipoTarea">
              <ListCheck size={15} color="green" style={{ marginRight: '10px' }} />
              Tipos de Tarea</NavDropdown.Item>



            {/* También puedes agregar más submenús aquí si es necesario */}
          </NavDropdown>
          <NavDropdown title="Clientes" id="basic-nav-dropdown">
            {/* Agregar elementos de submenú */}
            <NavDropdown.Item as={Link} to="/Clientes" >
              <Person size={15} color="cornflowerblue" style={{ marginRight: '10px' }} />
              Mantenimiento Clientes</NavDropdown.Item>


            {/* También puedes agregar más submenús aquí si es necesario */}
          </NavDropdown>

          <NavDropdown title="Informes" id="basic-nav-dropdown">
            {/* Agregar elementos de submenú */}
            <NavDropdown.Item as={Link} to="/about" >Reporte 1</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/about">Reporte 2</NavDropdown.Item>

            {/* También puedes agregar más submenús aquí si es necesario */}
          </NavDropdown>
          <NavDropdown title="Seguridad" id="basic-nav-dropdown">
            {/* Agregar elementos de submenú */}
            <NavDropdown.Item as={Link} to="/Usuarios" >
              <PeopleFill size={15} color="cornflowerblue" style={{ marginRight: '10px' }} />
              Usuarios</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/changepassword">
            <KeyFill size={15} color="cornflowerblue" style={{ marginRight: '10px' }} />
            Cambiar Contraseña</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Roles">
              <PersonLinesFill size={15} color="cornflowerblue" style={{ marginRight: '10px' }} />
              Roles</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Permisos">
            
            <PersonFillLock size={15} color="cornflowerblue" style={{ marginRight: '10px' }} />
              Permisos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Auditoria">
            <JournalCheck size={15} color="red" style={{ marginRight: '10px' }} />
            Auditoria</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout} >
              
            <PersonFillSlash size={15} color="red" style={{ marginRight: '10px' }} />
            Cerrar Sesion</NavDropdown.Item>
            {/* También puedes agregar más submenús aquí si es necesario */}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;

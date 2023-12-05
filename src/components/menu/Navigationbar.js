import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Navigationbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">INICIO</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        
          <NavDropdown title="Tareas" id="basic-nav-dropdown">
            {/* Agregar elementos de submenú */}
            <NavDropdown.Item as={Link} to="/Tarea" >Mantenimiento Tareas</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/TipoTarea">Tipos de Tarea</NavDropdown.Item>
  
            {/* También puedes agregar más submenús aquí si es necesario */}
          </NavDropdown>
          <NavDropdown title="Clientes" id="basic-nav-dropdown">
            {/* Agregar elementos de submenú */}
            <NavDropdown.Item as={Link} to="/Clientes" >Mantenimiento Clientes</NavDropdown.Item>

  
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
            <NavDropdown.Item as={Link} to="/Usuarios" >Usuarios</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/changepassword">Cambiar Contraseña</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Roles">Roles</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Permisos">Permisos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Auditoria">Auditoria</NavDropdown.Item>
            {/* También puedes agregar más submenús aquí si es necesario */}
          </NavDropdown>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;

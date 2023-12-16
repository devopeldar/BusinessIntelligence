import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PeopleIcon from "@mui/icons-material/People";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
const SideNav = () => {
  const [open, setOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [openSubMenuSeguridad, setOpenSubMenuSeguridad] = useState(false);
  const [openSubMenuClientes, setOpenSubMenuClientes] = useState(false);
  const [visiblemnuUsuarios, setVisiblemnuUsuarios] = useState('none');

  
  useEffect(() => {
    // La función que deseas llamar al cargar la página
    handleMenu();
  }, []); // El arreglo de dependencias vacío asegura que la función se ejecute solo una vez

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen);
  }; 
 const handleMenu = () => {
    setVisiblemnuUsuarios('block');
  };
  const toggleSubMenu = () => {
    setOpenSubMenu(!openSubMenu);
  };
  const toggleSubMenuSeguridad = () => {
    setOpenSubMenuSeguridad(!openSubMenuSeguridad);
  };

  const toggleSubMenuClientes = () => {
    setOpenSubMenuClientes(!openSubMenuClientes);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 , display: open ? 'none' : 'block'}}
      >
        <MenuIcon />
      </IconButton>
      {/* <Drawer anchor="left" > */}
      <Drawer sx={{
          borderRadius: '16px', // Ajusta el radio de los bordes según lo necesites
          '& .MuiDrawer-paper': {
            borderRadius: '16px', // Redondea el interior del Drawer
            height:'90vh',
            marginTop: '20px'
            
          },
        }} anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItemButton style={{ color: "black" }} onClick={toggleSubMenu}>
            <ListItemIcon>
              <AssignmentIcon color="info" />
            </ListItemIcon>

            <ListItemText primary="Tareas" />
            {openSubMenu ? <DragHandleIcon color="success" /> : <ArrowDownwardIcon color="success" />}
          </ListItemButton>
          <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4, color: "black" }}>
                <ListItemIcon>
                  <ListAltIcon color="info" />
                </ListItemIcon>
                <Link
                  to="/Tarea"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary="Mantenimiento Tareas" />
                </Link>
              </ListItem>
              <ListItem button sx={{ pl: 4, color: "black" }}>
                <ListItemIcon>
                  <PlaylistAddCheckIcon color="info" />
                </ListItemIcon>
                <Link
                  to="/TareaTipo"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary="Tipos de Tarea" />
                </Link>
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton
            style={{ color: "black" }}
            onClick={toggleSubMenuClientes}
          >
            <ListItemIcon>
              <PeopleIcon color="info" />
            </ListItemIcon>

            <ListItemText primary="Clientes" />
            {openSubMenuClientes ? <DragHandleIcon color="success" /> : <ArrowDownwardIcon color="success" />}
          </ListItemButton>
          <Collapse
            in={openSubMenuClientes}
            Clientes
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4, color: "black" }}>
                <ListItemIcon>
                  <RecentActorsIcon color="info" />
                </ListItemIcon>
                <Link
                  to="/Tarea"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary="Mantenimiento Clientes" />
                </Link>
              </ListItem>
            </List>
          </Collapse>
          <ListItemButton
            style={{ color: "black" }}
            onClick={toggleSubMenuSeguridad}
          >
            <ListItemIcon>
              <PrivacyTipIcon color="info" />
            </ListItemIcon>
            <ListItemText primary="Seguridad" />
            {openSubMenuSeguridad ? <DragHandleIcon color="success" /> : <ArrowDownwardIcon color="success" />}
          </ListItemButton>
          <Collapse in={openSubMenuSeguridad} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem  button sx={{ pl: 4, color: "black"}}>
                <ListItemIcon>
                  <PeopleIcon color="info" />
                </ListItemIcon>
                <Link
                  to="/Usuarios"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText  primary="Usuarios" />
                </Link>
              </ListItem>
              <ListItem button sx={{ pl: 4, color: "black" }}>
                <ListItemIcon>
                  <PeopleAltIcon color="info" />
                </ListItemIcon>
                <Link
                  to="/Perfil/Perfiles"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary="Perfiles" />
                </Link>
              </ListItem>
              <ListItem button sx={{ pl: 4, color: "black" }}>
                <ListItemIcon>
                  <PasswordIcon color="info" />
                </ListItemIcon>
                <Link
                  to="/changepassword"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary="Cambiar Contraseña" />
                </Link>
              </ListItem>
              <ListItem button sx={{ pl: 4, color: "black" }}>
                <ListItemIcon>
                  <LogoutIcon color="info" />
                </ListItemIcon>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary="Cerrar Sesion" />
                </Link>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Button onClick={closeDrawer}>Cerrar</Button>
      
      </Drawer>
    </>
  );
};

export default SideNav;

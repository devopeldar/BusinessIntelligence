import { KeyFill, People, Person } from "react-bootstrap-icons";
import CambiarContrasenia from "./components/authentication/CambiarContrasenia";
import Perfiles from "./components/authentication/Perfil/Perfiles";
import { AccountBalance, Event, EventAvailable, ManageAccounts, PeopleRounded, PersonSearch, Task, TaskAlt } from "@mui/icons-material";
import TareaTipoList from "./components/Pages/Tareas/TareaTipo/TareaTipoList";
import TareaEstadoList from "./components/Pages/Tareas/TareasEstado/TareaEstadoList";
import DepartamentoList from "./components/Pages/Departamentos/DepartamentoList";
import TipoEventoList from "./components/Pages/TipoEvento/TipoEventoListar";
import ClienteList from "./components/Pages/Clientes/ClienteList";
import TareaList from "./components/Pages/Tareas/TareaList";
import RolList from "./components/authentication/Rol/RolList";
import UsuarioList from "./components/authentication/Usuario/UsuarioList";

// Recuperar desde localStorage
const getPermissionsFromLocalStorage = () => {
  const permissions = localStorage.getItem('perfilesfromDB2');
  return permissions ? JSON.parse(permissions) : null;
};
const retrievedPermissions = getPermissionsFromLocalStorage();
console.log("retrievedPermissions " + retrievedPermissions);


let  routes = [];
// if(retrievedPermissions === null)
// {
//   routes = [
//     {
//       type: "title",
//       name: "Seguridad",
//       key: "seguridad",
//       title: "Seguridad",
//       icon: <KeyFill />,
//       visible: true
//     },
//     {
//       type: "collapse",
//       name: "ChangePassword",
//       key: "changepassword",
//       icon: <KeyFill />,
//       route: "/CambiarContrasenia",
//       component: <CambiarContrasenia />,
//       visible: true
//     },
//   ]
// }else{
  routes = [
    {
      type: "title",
      name: "Tareas",
      title: "Tareas",
      key: "tareas",
      icon: <People />,
      visible: true 
    },
    {
      type: "collapse",
      name: "Tareas",
      key: "mantenimientotareas",
      icon: <Task />,
      route: "components/Pages/Tarea",
      component: <TareaList />,
      visible : true
      //visible: retrievedPermissions.USUARIOS?.valor || false 
    },
    {
      type: "collapse",
      name: "Tipo de Tareas",
      key: "tipotareas",
      icon: <TaskAlt />,
      route: "/TipoTareas",
      component: <TareaTipoList />,
      visible: true
    },
    {
      type: "collapse",
      name: "Departamentos",
      key: "departamentostareas",
      icon: <Event />,
      route: "/Departamentos",
      component: <DepartamentoList />,
      visible: true
    },
    {
      type: "collapse",
      name: "Estados de Tareas",
      key: "estadotareas",
      icon: <Event />,
      route: "/EstadoTareas",
      component: <TareaEstadoList />,
      visible: true
    },
    {
      type: "title",
      name: "Eventos",
      key: "eventos",
      title: "Eventos",
      visible: true
    },
    {
      type: "collapse",
      name: "Tipos de Evento",
      key: "tiposdeeventos",
      icon: <EventAvailable/>,
      route: "components/Pages/TipoEvento",
      component: <TipoEventoList />,
      visible: true
    },
    {
      type: "title",
      name: "Clientes",
      key: "clientes",
      title: "Clientes",
      visible: true
    },
    {
      type: "collapse",
      name: "Mantenimiento Clientes",
      key: "mantenimientoclientes",
      icon: <People />,
      route: "components/Pages/Clientes",
      component: <ClienteList />,
      visible: true
    },
    {
      type: "title",
      name: "Seguridad",
      key: "seguridad",
      title: "Seguridad",
      icon: <KeyFill />,
      visible: true
    },
    {
      type: "collapse",
      name: "Usuarios",
      key: "usuarios",
      title: "Usuarios",
      icon: <ManageAccounts />,
      route: "/Usuarios",
      component: <UsuarioList />,
      visible: true
    },
    {
      type: "collapse",
      name: "Perfiles",
      key: "perfiles",
      title: "Perfiles",
      icon: <Person />,
      route: "/components/authentication/Perfil",
      component: <Perfiles />,
      visible: true
    },
    {
      type: "collapse",
      name: "Roles",
      key: "roles",
      icon: <PersonSearch />,
      route: "/Roles",
      component: <RolList />,
      visible: true
    },
    {
      type: "collapse",
      name: "ChangePassword",
      key: "changepassword",
      icon: <KeyFill />,
      route: "/CambiarContrasenia",
      component: <CambiarContrasenia />,
      visible: true
    },
  ];
// }
export default routes;

// const routes = [
//   {
//     type: "title",
//     name: "Tareas",
//     title: "Tareas",
//     key: "tareas",
//     icon: <People />,
//     visible: false
//   },
//   {
//     type: "collapse",
//     name: "Tareas",
//     key: "mantenimientotareas",
//     icon: <Task />,
//     route: "components/Pages/Tarea",
//     component: <TareaList />,
//     visible: false
//   },
//   {
//     type: "collapse",
//     name: "Tipo de Tareas",
//     key: "tipotareas",
//     icon: <TaskAlt />,
//     route: "/TipoTareas",
//     component: <TareaTipoList />,
//     visible: false
//   },
//   {
//     type: "collapse",
//     name: "Departamentos",
//     key: "departamentostareas",
//     icon: <Event />,
//     route: "/Departamentos",
//     component: <DepartamentoList />,
//     visible: false
//   },
//   {
//     type: "collapse",
//     name: "Estados de Tareas",
//     key: "estadotareas",
//     icon: <Event />,
//     route: "/EstadoTareas",
//     component: <TareaEstadoList />,
//     visible: false
//   },
//   {
//     type: "title",
//     name: "Eventos",
//     key: "eventos",
//     title: "Eventos",
//     visible: false
//   },
//   {
//     type: "collapse",
//     name: "Tipos de Evento",
//     key: "tiposdeeventos",
//     icon: <EventAvailable />,
//     route: "components/Pages/TipoEvento",
//     component: <TipoEventoList />,
//     visible: false
//   },
//   {
//     type: "title",
//     name: "Clientes",
//     key: "clientes",
//     title: "Clientes",
//     visible: false
//   },
//   {
//     type: "collapse",
//     name: "Mantenimiento Clientes",
//     key: "mantenimientoclientes",
//     icon: <People />,
//     route: "components/Pages/Clientes",
//     component: <ClienteList />,
//     visible: false
//   },
//   {
//     type: "title",
//     name: "Seguridad",
//     key: "seguridad",
//     title: "Seguridad",
//     icon: <KeyFill />,
//     visible: true
//   },
//   {
//     type: "collapse",
//     name: "Usuarios",
//     key: "usuarios",
//     title: "Usuarios",
//     icon: <ManageAccounts />,
//     route: "/Usuarios",
//     component: <UsuarioList />,
//     visible: false
//   },
//   {
//     type: "collapse",
//     name: "Perfiles",
//     key: "perfiles",
//     title: "Perfiles",
//     icon: <Person />,
//     route: "/components/authentication/Perfil",
//     component: <Perfiles />,
//     visible: false
//   },
//   {
//     type: "collapse",
//     name: "Roles",
//     key: "roles",
//     icon: <PersonSearch />,
//     route: "/Roles",
//     component: <RolList />,
//     visible: false
//   },
//   {
//     type: "collapse",
//     name: "ChangePassword",
//     key: "changepassword",
//     icon: <KeyFill />,
//     route: "/CambiarContrasenia",
//     component: <CambiarContrasenia />,
//     visible: true
//   },
// ];

// export default routes;

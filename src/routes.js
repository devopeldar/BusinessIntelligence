import Clientes from "./components/Pages/Clientes";
import Tarea from "./components/Pages/Tarea";

import { KeyFill, People, Person } from "react-bootstrap-icons";
import CambiarContrasenia from "./components/authentication/CambiarContrasenia";
import Perfiles from "./components/authentication/Perfil/Perfiles";
import { Event, Task, TaskAlt } from "@mui/icons-material";
import TareaTipoList from "./components/Pages/Tareas/TareaTipo/TareaTipoList";
import TareaEstadoList from "./components/Pages/Tareas/TareasEstado/TareaEstadoList";
import DepartamentoList from "./components/Pages/Departamentos/DepartamentoList";
import TipoEventoList from "./components/Pages/TipoEvento/TipoEventoListar";

const routes = [
  {
    type: "title",
    name: "Tareas",
    title: "Tareas",
    key: "tareas",
    icon: <People />,
  },
  {
    type: "collapse",
    name: "Tareas",
    key: "mantenimientotareas",
    icon: <Task />,
    route: "components/Pages/Tarea",
    component: <Tarea />,
  },
  {
    type: "collapse",
    name: "Tipo de Tareas",
    key: "tipotareas",
    icon: <TaskAlt />,
    route: "/TipoTareas",
    component: <TareaTipoList />,
  },
  {
    type: "collapse",
    name: "Departamentos",
    key: "departamentostareas",
    icon: <Event />,
    route: "/Departamentos",
    component: <DepartamentoList />,
  },
  {
    type: "collapse",
    name: "Estados de Tareas",
    key: "estadotareas",
    icon: <Event />,
    route: "/EstadoTareas",
    component: <TareaEstadoList />,
  },
  {
    type: "title",
    name: "Eventos",
    key: "eventos",
    title: "Eventos"
  },
  {
    type: "collapse",
    name: "Tipos de Evento",
    key: "tiposdeeventos",
    icon: <People />,
    route: "components/Pages/Clientes",
    component: <TipoEventoList />,
  },
  {
    type: "title",
    name: "Clientes",
    key: "clientes",
    title: "Clientes"
  },
  {
    type: "collapse",
    name: "Mantenimiento Clientes",
    key: "mantenimientoclientes",
    icon: <People />,
    route: "components/Pages/Clientes",
    component: <Clientes />,
  },
  {
    type: "title",
    name: "Seguridad",
    key: "seguridad",
    title: "Seguridad",
    icon: <KeyFill />,
  },
  {
    type: "collapse",
    name: "Perfiles",
    key: "perfiles",
    title: "Perfiles",
    icon: <Person />,
    route: "/components/authentication/Perfil",
    component: <Perfiles />,
  },
  {
    type: "collapse",
    name: "ChangePassword",
    key: "changepassword",
    icon: <KeyFill />,
    route: "/CambiarContrasenia",
    component: <CambiarContrasenia />,
  },
  
];

export default routes;

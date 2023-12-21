
/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// // Material Dashboard 2 React layouts
// import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Clientes from "./components/Pages/Clientes";
import Tarea from "./components/Pages/Tarea";
import Seguridad from "./components/Pages/Seguridad";
import Registrarme from "./components/authentication/Registrarme";
import Confirmacion from "./components/authentication/Confirmacion";
import { Key } from "react-bootstrap-icons";
import CambiarContrasenia from "./components/authentication/CambiarContrasenia";
import Perfiles from "./components/authentication/Perfil/Perfiles";

const routes = [
  {
    type: "collapse",
    name: "Tareas",
    key: "tareas",
    icon: <Icon fontSize="small">Tareas</Icon>,
    route: "components/Pages/Tarea",
    component: <Tarea />,
  },
  {
    type: "collapse",
    name: "Clientes",
    key: "clientes",
    icon: <Icon fontSize="small">Clientes</Icon>,
    route: "components/Pages/Clientes",
    component: <Clientes />,
  },
  {
    type: "title",
    name: "Seguridad",
    key: "seguridad",
    title: "Seguridad",
    icon: <Icon fontSize="small">Seguridad</Icon>,
  },
      {
        type: "collapse",
        name: "Perfiles",
        key: "perfiles",
        title: "Perfiles",
        icon: <Icon fontSize="small">Opción 1</Icon>,
        route: "/components/authentication/Perfil",
        component: <Perfiles />,
      },
   
  // {
  //   type: "collapse",
  //   name: "Registrarme",
  //   key: "registrarme",
  //   icon: <Icon fontSize="small">Seguridad</Icon>,
  //   route: "/components/Pages/Registrarme",
  //   component: <Registrarme />,
  // },
  {
    type: "collapse",
    name: "Confirmacion",
    key: "confirmacion",
    icon: <Icon fontSize="small">Confirmacion</Icon>,
    route: "/components/Pages/Confirmacion",
    component: <Confirmacion />,
  },
  {
    type: "collapse",
    name: "ChangePassword",
    key: "changepassword",
    icon: <Icon fontSize="small">Seguridad</Icon>,
    route: "/CambiarContrasenia",
    component: <CambiarContrasenia />,
  },
];

export default routes;

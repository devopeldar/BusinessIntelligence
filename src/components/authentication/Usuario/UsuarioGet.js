import { useEffect, useState } from "react";
import API_URL from "../../../config";
import MDTypography from "../../controls/MDTypography";
import MDBox from "../../controls/MDBox";
import MDBadge from "../../controls/MDBadge";
import MDButton from "../../controls/MDButton";
import { Check2All, CheckCircle, PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { Cancel, NoAccounts, PersonSearch } from "@mui/icons-material";

export default function UsuarioGet() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "/UsuarioListar", {
          headers: {
            accept: "application/json",
          },
        });

        const data = response.data.map((Usuario) => ({
          idUsuario: Usuario.idUsuario,
          nombre: Usuario.nombre,
          email: Usuario.email,
          emailConfirmado: Usuario.emailConfirmado,
          telefono: Usuario.telefono,
          fechaCambioPass: Usuario.fechaCambioPass,
          intentosFallidos: Usuario.intentosFallidos,
          activo: Usuario.activo,
          tokenExpirado: Usuario.tokenExpirado,
          loginCambiarClave: Usuario.loginCambiarClave,
        }));

        setRows(data);
      } catch (ex) {
        setError(ex);

        console.log(error);
      }
    };

    fetchData();
  }, [error]);

  const Nombre = ({ nombre, email, telefono }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        {email}
      </MDTypography>
      <MDTypography display="block" variant="caption" color="success" fontWeight="light">
        Nombre:  {nombre}{" "}
      </MDTypography>
      <MDTypography variant="caption" display="block" color="info" fontWeight="light">
        Telefono :{telefono}{" "}
      </MDTypography>

    </MDBox>
  );

  // emailConfirmado: Usuario.emailConfirmado,
  // fechaCambioPass: Usuario.fechaCambioPass,
  // intentosFallidos: Usuario.intentosFallidos,
  // tokenExpirado: Usuario.tokenExpirado,
  // loginCambiarClave: Usuario.loginCambiarClave,

  const DatosAcceso = ({ emailConfirmado, fechaCambioPass, intentosFallidos, tokenExpirado, loginCambiarClave }) => (

    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        Email Confirmado:
        {emailConfirmado ? (
          <CheckCircle color="success" /> // Icono para confirmado
        ) : (
          <Cancel color="error" /> // Icono para no confirmado
        )}
      </MDTypography>

      <MDTypography variant="caption" display="block" color={tokenExpirado ? "error":"dark"} fontWeight="bold">
        Token Expirado:
        {tokenExpirado ? (
          <Cancel color="error" /> // Icono para intentos fallidos
        ) : (
          <CheckCircle  color="success" /> // Icono para sin intentos fallidos
        )}
      </MDTypography>

      <MDTypography variant="caption" display="block" color={loginCambiarClave===true ? "error":"dark"} fontWeight="bold">
        Debe Cambiar Contraseña:
        {loginCambiarClave ===true? (
          <Cancel color="success" /> // Icono para intentos fallidos
        ) : (
          <CheckCircle  fontWeight="bold" color="error" /> // Icono para sin intentos fallidos
        )}
      </MDTypography>

      <MDTypography
        variant="caption"
        display="block"
        color={
          intentosFallidos <= 2 ? 'success' : intentosFallidos <= 4 ? 'warning' : 'error'
        }
        fontWeight="bold"
      >
        Intentos Fallidos: {intentosFallidos}
      </MDTypography>
      <MDTypography variant="caption" display="block" color="info" fontWeight="light">
        Fecha de Cambio de Contraseña: {fechaCambioPass ? formatDate(fechaCambioPass) : 'N/A'}
      </MDTypography>
      {/* Aquí puedes seguir agregando lógica similar para los otros booleanos */}
    </MDBox>
  );
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // El mes es devuelto de 0 a 11, por eso se le suma 1
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return {
    columns: [
      { Header: "ID Usuario", accessor: "idUsuario", align: "left" },
      { Header: "Usuario", accessor: "nombre", width: "35%", align: "left" },
      { Header: "Datos Acceso", accessor: "datosacceso", align: "left" },
      { Header: "Activo", accessor: "activo", align: "center" },
      { Header: "Acciones", accessor: "action", align: "center" },
    ],
    rows: rows.map((Usuario) => ({

      idUsuario: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {Usuario.idUsuario}
        </MDTypography>
      ), // Reemplaza <TuComponenteControl1 /> por el componente que desees en esta celda
      nombre: (
        <Nombre nombre={Usuario.nombre} email={Usuario.email} telefono={Usuario.telefono} />
      ),
      datosacceso: (
        <DatosAcceso emailConfirmado={Usuario.emailConfirmado} fechaCambioPass={Usuario.fechaCambioPass} 
        intentosFallidos={Usuario.intentosFallidos} tokenExpirado={Usuario.tokenExpirado} 
        loginCambiarClave={Usuario.loginCambiarClave}/>
      ),
      activo: (
        <MDBox ml={-1}>
          {Usuario.activo ? (
            <MDBadge
              badgeContent="activo"
              color="success"
              variant="gradient"
              size="sm"
            />
          ) : (
            <MDBadge
              badgeContent="desactivado"
              color="error"
              variant="gradient"
              size="sm"
            />
          )}
        </MDBox>
      ),
      action: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          <Link to={`../Usuario/UsuarioEdit/${Usuario.idUsuario}`}>
            <MDButton variant="text" color="dark">
              <PencilSquare color="blue" />
            </MDButton>
          </Link>
          <Link to={`../Usuario/UsuarioEdit/${Usuario.idUsuario}`}>
            <MDButton disabled={!Usuario.activo} variant="text" color="dark">
              <NoAccounts titleAccess="bloquear usuario"color="error" />
            </MDButton>
          </Link>
          <Link to={`../Usuario/UsuarioEdit/${Usuario.idUsuario}`}>
            <MDButton  variant="text" color="dark">
              <PersonSearch titleAccess="asignar rol a usuario" color="warning" />
            </MDButton>
          </Link>
          <Link to={`../Usuario/UsuarioEdit/${Usuario.idUsuario}`}>
            <MDButton  variant="text" color="dark">
              <PersonSearch titleAccess="asignar perfil a usuario" color="success" />
            </MDButton>
          </Link>
        </MDTypography>
      ),

    })),
  };
}

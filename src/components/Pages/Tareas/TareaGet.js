import React, { useEffect, useState } from "react";
import API_URL from "../../../config";
import MDTypography from "../../controls/MDTypography";
import MDBox from "../../controls/MDBox";
import MDButton from "../../controls/MDButton";
import axios from "axios";
import { Link } from "react-router-dom";
import MDProgress from "../../controls/MDProgress";
import { AccessAlarm, Grid3x3, PlayArrow, Stop } from "@mui/icons-material";
import PauseIcon from '@mui/icons-material/Pause';
export default function TareaGet() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const requsuario = {
          idUsuario: localStorage.getItem('iduserlogueado')
        };
        const response = await axios.post(API_URL + "/TareaListarTodo",requsuario, {
          headers: {
            accept: "application/json",
          },
        });
        console.log(response.data);
        // const data = response.data.map((Tarea) => ({

        //     idTarea: Tarea.idTarea,
        //     tareaTipoNombre: Tarea.tareaTipoNombre,
        //     tareaTipoCodigo: Tarea.tareaTipoCodigo,
        //     clienteNombre: Tarea.clienteNombre,
        //     departamentoNombre: Tarea.departamentoNombre,
        //     roles: Tarea.roles,
        //     estadoDescripcion: Tarea.estadoDescripcion,
        //     observaciones: Tarea.observaciones,
        //     fechaCreacion: Tarea.fechaCreacion,
        //     fechaInicio: Tarea.fechaInicio,
        //     fechaVencimiento: Tarea.fechaVencimiento,
        //     fechaVencimientoLegal: Tarea.fechaVencimientoLegal,
        //     fechaFinalizacion: Tarea.fechaFinalizacion,
        //     porcentajetranscurrido: Tarea.porcentajeTrascurrido
        //     {Tarea.porcentajetranscurrido < 20 ? color = "error" : "info"}
        //     {Tarea.porcentajetranscurrido > 60 ? color = "success" : "info"}
        //     const color

        // }));

        const data = response.data.map((Tarea) => {
          let color = "info"; // Valor por defecto
          // let roles = Tarea.roles;

          // // Verificar si el campo Roles contiene "|"
          // if (roles.includes('|')) {
          //     // Reemplazar "|" por un salto de línea "\n"
          //     roles = roles.replace(/\|/g, '\n');
          // }

          if (Tarea.porcentajeTrascurrido < 20) {
            color = "error";
          } else if (Tarea.porcentajeTrascurrido > 60) {
            color = "success";
          }

          return {
            idTarea: Tarea.idTarea,
            tareaTipoNombre: Tarea.tareaTipoNombre,
            tareaTipoCodigo: Tarea.tareaTipoCodigo,
            clienteNombre: Tarea.clienteNombre,
            departamentoNombre: Tarea.departamentoNombre,
            roles: Tarea.roles,
            estadoDescripcion: Tarea.estadoDescripcion,
            observaciones: Tarea.observaciones,
            fechaCreacion: Tarea.fechaCreacion,
            fechaInicio: Tarea.fechaInicio,
            fechaVencimiento: Tarea.fechaVencimiento,
            fechaVencimientoLegal: Tarea.fechaVencimientoLegal,
            fechaFinalizacion: Tarea.fechaFinalizacion,
            porcentajetranscurrido: Tarea.porcentajeTrascurrido,
            color: color,
            estado: Tarea.estado,
            tiempoDetenido: Tarea.tiempoDetenido
          };
        });
        setRows(data);
      } catch (ex) {
        setError(ex);

        console.log(error);
      }
    };

    fetchData();
  }, [error]);

  const Nombre = ({
    cliente,
    depto,
    tareaTipoCodigo,
    tareaTipoNombre,
    estadoDescripcion,
  }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        {cliente}
      </MDTypography>
      <MDTypography
        display="block"
        variant="caption"
        color="secondary"
        fontWeight="light"
      >
        Depto: {depto}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="info"
        fontWeight="light"
      >
        Tipo Tarea :{tareaTipoNombre} {tareaTipoCodigo}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="success"
        fontWeight="light"
      >
        Estado Tarea :{estadoDescripcion}{" "}
      </MDTypography>
    </MDBox>
  );

  const PorcTranscurrido = ({ progres, color }) => (
    <MDBox width="310%" ml="auto">
      <MDBox mt={2.85}>
        <MDProgress
          label={true}
          variant="gradient"
          color={color}
          value={progres}
        />
      </MDBox>
    </MDBox>
  );
  const Fechas = ({
    fechaCreacion,
    fechaInicio,
    fechaVencimiento,
    fechaVencimientoLegal,
    fechaFinalizacion,tiempoDetenido
  }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        Fecha Creacion: {formatDate(fechaCreacion)}
      </MDTypography>
      <MDTypography
        display="block"
        variant="caption"
        color="info"
        fontWeight="light"
      >
        Fecha Inicio: {formatDate(fechaInicio)}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="error"
        fontWeight="light"
      >
        Fecha Venc. :{formatDate(fechaVencimiento)}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="warning"
        fontWeight="light"
      >
        Fecha Venc. Legal :{formatDate(fechaVencimientoLegal)}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="warning"
        fontWeight="light"
      >
        Fecha Finalizacion :{formatDate(fechaFinalizacion)}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="error"
        fontWeight="bold"
      >
        Tiempo Detenido :{tiempoDetenido}{" "}
      </MDTypography>
      
    </MDBox>
  );

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // El mes es devuelto de 0 a 11, por eso se le suma 1
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderRolesWithLineBreaks = (roles) => {
    console.log("aca");
    if (roles.includes("|")) {
      return roles.split("|").map((role, index) => (
        <React.Fragment key={index}>
          {role}
          {index !== roles.split("|").length - 1 && <br />}{" "}
          {/* Añade <br /> excepto en la última línea */}
        </React.Fragment>
      ));
    }
    return roles;
  };

  return {
    columns: [
      // { Header: "ID Tarea", accessor: "idTarea", align: "left" },
      { Header: "", accessor: "estado", align: "left" },
      {
        Header: "Descripcion",
        accessor: "descripcion",
        width: "20%",
        align: "left",
      },
      { Header: "Roles", accessor: "roles", align: "left" },
      { Header: "Fechas", accessor: "fecha", align: "left" },
      {
        Header: "Porc. Transcurrido",
        accessor: "porctranscurrido",
        align: "left",
      },
      { Header: "Observaciones", accessor: "observaciones", align: "left" },

      { Header: "Acciones", accessor: "action", align: "center" },
    ],
    rows: rows.map((Tarea) => ({
      // idTarea: (
      //   <MDTypography
      //     component="a"
      //     href="#"
      //     variant="caption"
      //     color="text"
      //     fontWeight="medium"
      //   >
      //     {Tarea.idTarea}
      //   </MDTypography>
      // ), // Reemplaza <TuComponenteControl1 /> por el componente que desees en esta celda

      estado: (
        <MDBox ml={-1}>
          {Tarea.estado === 1 || Tarea.estado === 2 ? (
            <PlayArrow color="success" fontSize="medium" />
          ) : Tarea.estado === 3 ? (
            <PauseIcon color="error" fontSize="medium" />
          ) : (
            <Stop color="info" fontSize="medium" />
          )}
        </MDBox>
      ),
      descripcion: (
        <Nombre
          cliente={Tarea.clienteNombre}
          depto={Tarea.departamentoNombre}
          tareaTipoCodigo={Tarea.tareaTipoCodigo}
          tareaTipoNombre={Tarea.tareaTipoNombre}
          estadoDescripcion={Tarea.estadoDescripcion}
        />
      ),
      roles: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {renderRolesWithLineBreaks(Tarea.roles)}
        </MDTypography>
      ),
      fecha: (
        <Fechas
          fechaCreacion={Tarea.fechaCreacion}
          fechaInicio={Tarea.fechaInicio}
          fechaVencimiento={Tarea.fechaVencimiento}
          fechaVencimientoLegal={Tarea.fechaVencimientoLegal}
          fechaFinalizacion={Tarea.fechaFinalizacion}
          tiempoDetenido={Tarea.tiempoDetenido}
        />
      ),

      porctranscurrido: (
        <PorcTranscurrido
          progres={Tarea.porcentajetranscurrido}
          color={Tarea.color}
        />
      ),
      observaciones: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {Tarea.observaciones}
        </MDTypography>
      ),

      action: (
        <MDBox ml={-1}>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Link to={`../EventoTareaAdd/${Tarea.idTarea}`}>
              <MDButton variant="text" color="dark">
                <AccessAlarm
                  color="warning"
                  titleAccess="Agregar Evento a Tarea"
                />
              </MDButton>
            </Link>
          </MDTypography>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Link to={`../EventoTareaTraking/${Tarea.idTarea}`}>
              <MDButton variant="text" color="dark">
                <Grid3x3
                  color="info"
                  titleAccess="Ver traking de Eventos de una Tarea"
                />
              </MDButton>
            </Link>
          </MDTypography>
        </MDBox>
      ),
    })),
  };
}

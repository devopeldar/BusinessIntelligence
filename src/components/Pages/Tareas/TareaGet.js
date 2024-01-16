import React, { useEffect, useState } from "react";
import API_URL from "../../../config";
import MDTypography from "../../controls/MDTypography";
import MDBox from "../../controls/MDBox";
import MDButton from "../../controls/MDButton";
import axios from "axios";
import { Link } from "react-router-dom";
import MDProgress from "../../controls/MDProgress";
import { AccessAlarm, Delete, DoneAll, Grid3x3, PanoramaFishEye, PlayArrow, PlayCircle, SearchOutlined, Stop } from "@mui/icons-material";
import PauseIcon from '@mui/icons-material/Pause';
import MDSnackbar from "../../controls/MDSnackbar";

export default function TareaGet() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  const closeSuccessSB = () => setSuccessSB(false);
  const [successSB, setSuccessSB] = useState(false);
  const [successSBPrev, setSuccessSBPrev] = useState(false);

  const [dateTime, setDateTime] = useState("");
  const [errorSB, setErrorSB] = useState(false);
  // const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  useEffect(() => {
    const obtenerFechaHoraActual = () => {
      const fechaHoraActual = new Date();
      const fechaFormateada = obtenerFechaFormateada(fechaHoraActual);
      setDateTime(fechaFormateada);
    };

    obtenerFechaHoraActual();
  }, []);

  const obtenerFechaFormateada = (fecha) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    return fecha.toLocaleString("es-ES", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const requsuario = {
          idUsuario: localStorage.getItem('iduserlogueado')
        };
        console.log(requsuario)
        const response = await axios.post(API_URL + "/TareaListarTodo", requsuario, {
          headers: {
            accept: "application/json",
          },
        });

        const data = response.data.map((Tarea) => {
          let color = "info"; // Valor por defecto

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
            tiempoDetenido: Tarea.tiempoDetenido,
            tiempoTranscurrido: Tarea.tiempoTranscurrido
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

  const HandleIniciar = async (idTarea) => {
    try {
      setSuccessSBPrev(true);
      const reqtarea = {
        idUsuario: localStorage.getItem('iduserlogueado'),
        idTarea: idTarea
      };

      const response = await axios.post(API_URL + "/EventoIniciar", reqtarea, {
        headers: {
          accept: "application/json",
        },
      });
      const res = await response.json();
      console.log("res tarea ", res)
      if (res.rdoAccion) {
        setSuccessSB(true);
        setErrorSB(false)

      } else {
        setSuccessSB(false);
        setErrorSB(true)
      }


    } catch (ex) {
      setError(ex);

      console.log(error);
    }

  }





  const Nombre = ({
    cliente,
    depto,
    tareaTipoCodigo,
    tareaTipoNombre,
    estadoDescripcion, observaciones
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
      <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="bold"
      >
        Observaciones :{observaciones}
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
    fechaFinalizacion, tiempoDetenido, tiempoTranscurrido
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
        Fecha Inicio: {fechaInicio ? formatDate(fechaInicio) : "--/--/--"}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="info"
        fontWeight="bold"
      >
        Fecha Finalizacion :{fechaFinalizacion ? formatDate(fechaFinalizacion) : "--/--/--"}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="info"
        fontWeight="bold"
      >
        Tiempo Transcurrido :{tiempoTranscurrido}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="error"
        fontWeight="light"
      >
        Fecha Venc. :{fechaVencimiento ? formatDate(fechaVencimiento) : "--/--/--"}{" "}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        color="warning"
        fontWeight="light"
      >
        Fecha Venc. Legal :{fechaVencimientoLegal ? formatDate(fechaVencimientoLegal) : "--/--/--"}{" "}
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
      { Header: "", width: "10%", accessor: "estado", align: "left" },
      {
        Header: "Descripcion",
        accessor: "descripcion",
        width: "10%",
        align: "left",
      },
      { Header: "Roles", width: "15%", accessor: "roles", align: "left" },
      { Header: "Fechas", accessor: "fecha", align: "left" },
      {
        Header: "Porc. Transcurrido",
        accessor: "porctranscurrido",
        align: "left",
      },
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
            <PlayArrow color="success" fontSize="large" />
          ) : Tarea.estado === 3 ? (
            <PauseIcon color="error" fontSize="large" />
          ) : Tarea.estado === 0 ? (
            <PlayArrow color="warning" fontSize="large" />
          ) : Tarea.estado === 4 ? (
            <DoneAll color="success" fontSize="large" />

          ) : (<Stop color="info" fontSize="large" />)}
        </MDBox>
      ),
      descripcion: (
        <Nombre
          cliente={Tarea.clienteNombre}
          depto={Tarea.departamentoNombre}
          tareaTipoCodigo={Tarea.tareaTipoCodigo}
          tareaTipoNombre={Tarea.tareaTipoNombre}
          estadoDescripcion={Tarea.estadoDescripcion}
          observaciones={Tarea.observaciones}
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
          tiempoTranscurrido={Tarea.tiempoTranscurrido}

        />
      ),

      porctranscurrido: (
        <PorcTranscurrido
          progres={Tarea.porcentajetranscurrido}
          color={Tarea.color}
        />
      ),

      action: (
        <MDBox ml={0}>
          {Tarea.estado === 0 &&
            <MDBox ml={0}>
              <MDTypography variant="caption" color="text" fontWeight="medium">
                <Link onClick={() => HandleIniciar(Tarea.idTarea)} >
                  {/* <MDButton variant="text" color="dark" onClick={() => HandleIniciar(Tarea.idTarea)}> */}
                  <PlayCircle fontSize="large"
                    color="success"
                    titleAccess="Iniciar Tarea"
                  />
                </Link>
                <MDSnackbar
                  color="success"
                  icon="notifications"
                  title="Task Manager"
                  content="Iniciando Tarea....."
                  dateTime={dateTime}
                  open={successSBPrev}
                  onClose={closeSuccessSB}
                  close={closeSuccessSB}

                />
                {/* </MDButton> */}
                <MDSnackbar
                  color="info"
                  icon="notifications"
                  title="Task Manager"
                  content="Tarea iniciada exitosamente"
                  dateTime={dateTime}
                  open={successSB}
                  onClose={closeSuccessSB}
                  close={closeSuccessSB}

                />
                <MDSnackbar
                  color="error"
                  icon="warning"
                  title="Material Dashboard"
                  content="Hello, world! This is a notification message"
                  dateTime="11 mins ago"
                  open={errorSB}
                  onClose={closeErrorSB}
                  close={closeErrorSB}

                />
              </MDTypography>

              <MDTypography variant="caption" color="text" fontWeight="medium">
                <Link to={`../Delete/${Tarea.idTarea}`}>

                  <Delete fontSize="large"
                    color="error"
                    titleAccess="Eliminar Tarea"
                  />

                </Link>
              </MDTypography>
            </MDBox>}
          <MDBox ml={0}>
            {Tarea.estado > 0 && Tarea.estado !== 4 &&
                <MDTypography variant="caption" color="text" fontWeight="medium">
                  <Link to={`../EventoTareaAdd/${Tarea.idTarea}`}>

                    <AccessAlarm fontSize="large"
                      color="warning"
                      titleAccess="Agregar Evento a Tarea"
                    />

                  </Link>
                </MDTypography>}
            <MDTypography variant="caption" color="text" fontWeight="medium">
              <Link to={`../TareaTraking/${Tarea.idTarea}`}>

                <SearchOutlined fontSize="large"
                  color="info"
                  titleAccess="Ver traking de Eventos de una Tarea"
                />
                {/* </MDButton> */}
              </Link>
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
    })),
  };
}

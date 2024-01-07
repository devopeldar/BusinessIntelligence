import { useEffect, useState } from "react";
import API_URL from "../../../config";
import MDTypography from "../../controls/MDTypography";
import MDBox from "../../controls/MDBox";
import MDBadge from "../../controls/MDBadge";
import MDButton from "../../controls/MDButton";
import { PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import EstadosProgresoTarea from "../../Utils/estadosProgresoTarea";

export default function TipoEventoGet() {
 
    const [rows, setRows] = useState([]);

    function obtenerDescripcionPorValor(valor) {
        for (let estado in EstadosProgresoTarea) {
          if (EstadosProgresoTarea[estado].valor === valor) {
            return EstadosProgresoTarea[estado].descripcion;
          }
        }
        return "Estado no encontrado";
      }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(API_URL + "/EventoTipoListar", {
                    headers: {
                        accept: "application/json",
                    },
                });

                //setTipoEvento(response.data);
               
                const data = response.data.map((EventoTipo) => ({
                    idEventoTipo: EventoTipo.idEventoTipo,
                    descripcion: EventoTipo.descripcion,
                    activo: EventoTipo.activo,
                    idTareaEstado: EventoTipo.idTareaEstado,
                    estadotareadescripcion: EventoTipo.tareaEstado,
                    enviaMail: EventoTipo.enviaMail,
                    detiene: EventoTipo.detiene,
                    estado: EventoTipo.estado,
                }));

                setRows(data);
            } catch (ex) {
                //setError(ex);

                console.log(ex);
            }
        };

        fetchData();
    });

    return {
        columns: [
           // { Header: "ID Tipo Evento", accessor: "idEventoTipo", align: "left" },
            { Header: "Descripcion", accessor: "descripcion", width: "25%", align: "left" },
            { Header: "Estado Tarea", accessor: "estadotareadescripcion", align: "center" },
            { Header: "Estado", accessor: "estado", align: "center" },
            { Header: "Envia Mail", accessor: "enviaMail", align: "center" },
            { Header: "Detiene Tarea", accessor: "detiene", align: "center" },
            { Header: "Activo", accessor: "activo", align: "center" },
            // { Header: "idTareaEstado", accessor: "idTareaEstado", align: "center"},
            { Header: "Acciones", accessor: "action", align: "center" },
        ],
        rows: rows.map((EventoTipo) => ({

            // idEventoTipo: (
            //     <MDTypography
            //         component="a"
            //         href="#"
            //         variant="caption"
            //         color="text"
            //         fontWeight="medium"
            //     >
            //         {EventoTipo.idEventoTipo}
            //     </MDTypography>
            // ), // Reemplaza <TuComponenteControl1 /> por el componente que desees en esta celda
            descripcion: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {EventoTipo.descripcion}
                </MDTypography>
            ),
            estadotareadescripcion: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {EventoTipo.estadotareadescripcion}
                </MDTypography>
            ),
            estado: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {obtenerDescripcionPorValor(EventoTipo.estado)}
                </MDTypography>
            ),
            enviaMail: (
                <MDBox ml={-1}>
                    {EventoTipo.enviaMail ? (
                        <MDBadge
                            badgeContent="SI"
                            color="success"
                            variant="gradient"
                            size="sm"
                        />
                    ) : (
                        <MDBadge
                            badgeContent="NO"
                            color="error"
                            variant="gradient"
                            size="sm"
                        />
                    )}
                </MDBox>
            ),
            detiene: (
                <MDBox ml={-1}>
                    {EventoTipo.detiene ? (
                        <MDBadge
                            badgeContent="SI"
                            color="success"
                            variant="gradient"
                            size="sm"
                        />
                    ) : (
                        <MDBadge
                            badgeContent="NO"
                            color="error"
                            variant="gradient"
                            size="sm"
                        />
                    )}
                </MDBox>
            ),
            activo: (
                <MDBox ml={-1}>
                    {EventoTipo.activo ? (
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
                    <Link to={`../TipoEventoEdit/${EventoTipo.idEventoTipo}`}>
                        <MDButton variant="text" color="dark">
                            <PencilSquare color="blue" />
                        </MDButton>
                    </Link>
                </MDTypography>
            ),

        })),
    };
}

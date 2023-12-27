import { useEffect, useState } from "react";
import API_URL from "../../../config";
import MDTypography from "../../controls/MDTypography";
import MDBox from "../../controls/MDBox";
import MDBadge from "../../controls/MDBadge";
import MDButton from "../../controls/MDButton";
import { Edit } from "@mui/icons-material";
import { PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TipoEventoGet() {
    const [tiposdeeventos, setTipoEvento] = useState([]);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(API_URL + "/EventoTipoListar", {
                    headers: {
                        accept: "application/json",
                    },
                });

                setTipoEvento(response.data);
                console.log("tiposdeeventos " + tiposdeeventos);
                const data = response.data.map((EventoTipo) => ({
                    idEventoTipo: EventoTipo.idEventoTipo,
                    descripcion: EventoTipo.descripcion,
                    activo: EventoTipo.activo,
                    idTareaEstado: EventoTipo.idTareaEstado,
                    estadotareadescripcion: EventoTipo.tareaEstado,

                }));

                setRows(data);
            } catch (ex) {
                setError(ex);

                console.log(ex);
            }
        };

        fetchData();
    }, []);

    return {
        columns: [
            { Header: "ID Tipo Evento", accessor: "idEventoTipo", align: "left" },
            { Header: "Descripcion", accessor: "descripcion", width: "45%", align: "left" },
            { Header: "Estado Tarea", accessor: "estadotareadescripcion", align: "center" },
            { Header: "Activo", accessor: "activo", align: "center" },
            // { Header: "idTareaEstado", accessor: "idTareaEstado", align: "center"},
            { Header: "Acciones", accessor: "action", align: "center" },
        ],
        rows: rows.map((EventoTipo) => ({

            idEventoTipo: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {EventoTipo.idEventoTipo}
                </MDTypography>
            ), // Reemplaza <TuComponenteControl1 /> por el componente que desees en esta celda
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
            // idTareaEstado: (
            //     EventoTipo.idTareaEstado 
            // ),
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

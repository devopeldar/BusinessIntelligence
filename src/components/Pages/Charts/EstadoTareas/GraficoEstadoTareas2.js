import React, { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import axios from "axios";
import {
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import MDTypography from "../../../controls/MDTypography";
import MDBox from "../../../controls/MDBox";
import PageLayout from "../../../layauots/PageLayout";
import PieChartCustom from "../Components/PieChartCustom";
import BarChartCustom from "../Components/BarChartCustom";
import BarChartCompostCustom from "../Components/BarChartCompostCustom";
import MDSnackbar from "../../../controls/MDSnackbar";
import API_URL from "../../../../config";

const GraficoEstadoTareas2 = () => {
  const [successSB, setSuccessSB] = useState(false);
  const [successSBPrev, setSuccessSBPrev] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [graficoTextTextInt, setGraficoTextTextInt] = useState([]);
  const [graficoTextIntInt, setGraficoTextIntInt] = useState([]);
  const [graficoTextInt, setGraficoTextInt] = useState([]);
  const [dateTime, setDateTime] = useState("");

  const closeSuccessSB = () => setSuccessSB(false);
  const closeErrorSB = () => setErrorSB(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSuccessSBPrev(true);
        const reqGraphs = { grupo: "EstadoTipo" };

        const response = await axios.post(
          `${API_URL}/GraficosListar`,
          reqGraphs,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const res = await response.data;
        console.log("res:", res);
        console.log("res.graficoTextInt:", res.graficoTextInt);
        //if (res.rdoAccion) {
        setSuccessSB(true);
        setSuccessSBPrev(false);
        setErrorSB(false);
        // setGraficoTextTextInt(res.graficoTextTextInt);
        // setGraficoTextIntInt(res.graficoTextIntInt);
        setGraficoTextInt(...res.graficoTextInt);
        // console.log("graficoTextTextInt:", graficoTextTextInt);
        // console.log("graficoTextIntInt:", graficoTextIntInt);
        console.log("graficoTextInt:", graficoTextInt);
        // } else {
        //     setMensajeError(res.rdoAccionDesc);
        //     setSuccessSB(false);
        //     setErrorSB(true);
        //     setSuccessSBPrev(false);
        // }
      } catch (error) {
        console.log("Errores de Proceso:", error.message);
        setSuccessSB(false);
        setErrorSB(true);
        setSuccessSBPrev(false);
        setMensajeError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <PageLayout
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MDBox width="100%" height="100%">
        <Grid
          width="80%"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Card
            style={{
              width: "100%",
              marginLeft: "260px",
              marginTop: "60px",
              marginRight: "auto",
            }}
          >
            <MDBox
              variant="gradient"
              bgColor="warning"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Ejemplos de Gráficos de Estados de Tarea
              </MDTypography>
              <MDTypography
                display="block"
                variant="button"
                color="white"
                my={1}
              >
                Información general acerca de los estado en que se encuentran
                las tareas
              </MDTypography>
            </MDBox>
            {/* <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'space-between', width: '100%' }}>
                            <Card style={{ flex: 1 }}>
                                <BarChartCustom
                                    data={graficoTextTextInt}
                                    namekey={"label1"}
                                    datakey={"valor1"}
                                    title={graficoTextTextInt[0]?.titulo}
                                    mostrarfiltro={true}
                                    nameeje={graficoTextTextInt[0]?.label1Nombre}
                                    nameejevertical={graficoTextTextInt[0]?.valor1Nombre}
                                    observaciones={"sin observaciones por el momento..."}
                                />
                            </Card>
                        </div> */}
            <div
              style={{
                display: "flex",
                marginTop: "15px",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* <Card style={{ flex: 1 }}>
                                <BarChartCompostCustom
                                    data={graficoTextIntInt}
                                    namekey={"label1"}
                                    datakey={"valor1"}
                                    datakey2={"value2"}
                                    title={graficoTextIntInt[0]?.titulo}
                                    mostrarfiltro={true}
                                    nameeje={graficoTextIntInt[0]?.label1Nombre}
                                    nameeje2={graficoTextIntInt[0]?.valor2Nombre}
                                    nameejevertical={graficoTextIntInt[0]?.valor1Nombre}
                                    nameejevertical2={graficoTextIntInt[0]?.valor2Nombre}
                                    observaciones={"sin observaciones por el momento..."}
                                />
                            </Card> */}
              <Card style={{ flex: 1 }}>
                {graficoTextInt.length > 0 && (
                  <PieChartCustom
                    data={graficoTextInt}
                    namekey={"label1"}
                    datakey={"valor1"}
                    title={graficoTextInt[0]?.titulo}
                    mostrarfiltro={true}
                    observaciones={"sin observaciones por el momento..."}
                  />
                )}
              </Card>
            </div>
          </Card>
        </Grid>
      </MDBox>
      <MDSnackbar
        color="info"
        icon="notifications"
        title="Task Manager"
        content="Cargando paneles..."
        dateTime={dateTime}
        open={successSBPrev}
        onClose={closeSuccessSB}
        close={closeSuccessSB}
      />
      <MDSnackbar
        color="success"
        icon="notifications"
        title="Task Manager"
        content="Paneles Cargados exitosamente"
        dateTime={dateTime}
        open={successSB}
        onClose={closeSuccessSB}
        close={closeSuccessSB}
      />
      <MDSnackbar
        color="error"
        icon="warning"
        title="Task Manager"
        content={mensajeError}
        dateTime={dateTime}
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
      />
    </PageLayout>
  );
};

export default GraficoEstadoTareas2;

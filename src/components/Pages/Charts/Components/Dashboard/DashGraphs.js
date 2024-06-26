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
import MDTypography from "../../../../controls/MDTypography";
import MDBox from "../../../../controls/MDBox";
import PageLayout from "../../../../layauots/PageLayout";
import PieChartCustom from "../PieChartCustom";
import BarChartCustom from "../BarChartCustom";
import BarChartCompostCustom from "../BarChartCompostCustom";
import MDSnackbar from "../../../../controls/MDSnackbar";
import API_URL from "../../../../../config";
import TableChartCustom from "../TableChartCustom";

const DashGraphs = () => {
  const [successSB, setSuccessSB] = useState(false);
  const [successSBPrev, setSuccessSBPrev] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [graficos, setGraficos] = useState([]);


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

        if (res.rdoAccion) {
          setSuccessSB(true);
          setSuccessSBPrev(false);
          setErrorSB(false);


          // Actualiza el estado con los gráficos
          setGraficos(res.graficosList);
          console.log("res.graficosList", res.graficosList)

        } else {
          setMensajeError(res.rdoAccionDesc);
          setSuccessSB(false);
          setErrorSB(true);
          setSuccessSBPrev(false);
        }
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

  const renderGraficos = () => {
    return graficos.map((grafico, idx) => {
      console.log("grafico", grafico);
      switch (grafico.graficosUnificados[0].idTipoGrafico) {
        case 1:
          return <Card style={{marginTop: '10px', flex: 1 }}><PieChartCustom key={idx} data={grafico.graficosUnificados} mostrarfiltro={true} namekey={"label1"} datakey={"valor1"} title={grafico.graficosUnificados[0]?.titulo}
            observaciones={"sin observaciones por el momento..."} /></Card>

        case 3:
          return <Card style={{marginTop: '10px', flex: 1 }}><BarChartCustom
            data={grafico.graficosUnificados}
            namekey={"label1"}
            datakey={"valor1"}
            namekey2={"label2"}
            title={grafico.graficosUnificados[0]?.titulo}
            mostrarfiltro={true}
            nameeje={grafico.graficosUnificados[0]?.label1Nombre}
            nameeje2={grafico.graficosUnificados[0]?.label2Nombre}
            nameejevertical={grafico.graficosUnificados[0]?.valor1Nombre}
            observaciones={"sin observaciones por el momento..."}
          /></Card>
        case 2:
          return <Card style={{ marginTop: '10px', flex: 1 }}><BarChartCompostCustom
            data={grafico.graficosUnificados}
            namekey={"label1"}
            datakey={"valor1"}
            datakey2={"valor2"}
            title={grafico.graficosUnificados[0]?.titulo}
            mostrarfiltro={true}
            nameeje={grafico.graficosUnificados[0]?.valor1Nombre}
            nameeje2={grafico.graficosUnificados[0]?.valor2Nombre}
            nameejevertical={grafico.graficosUnificados[0]?.valor1Nombre}
            nameejevertical2={grafico.graficosUnificados[0]?.valor2Nombre}
            observaciones={"sin observaciones por el momento..."}
          />
          </Card>

        case 4:
          return  <Card style={{ marginTop: '10px',flex: 1 }}><TableChartCustom key={idx} data={grafico.graficosUnificados} title={grafico.graficosUnificados[0]?.titulo} observaciones={"sin observaciones por el momento..."} /></Card>


        default:
          return null;
      }
    });
  };

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
              marginLeft: "280px",
              marginTop: "80px",
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
                Panel de Indicadores
              </MDTypography>
              <MDTypography
                display="block"
                variant="button"
                color="white"
                my={1}
              >
                Informacion general
              </MDTypography>
            </MDBox>
            <MDBox p={2}>
              {renderGraficos()}
            </MDBox>
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

export default DashGraphs;

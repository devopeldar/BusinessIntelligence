import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import MDTypography from '../../../controls/MDTypography';
import MDBox from '../../../controls/MDBox';
import { Card, Grid } from '@mui/material';
import PageLayout from '../../../layauots/PageLayout';
import PieChartCustom from '../Components/PieChartCustom';
import BarChartCustom from '../Components/BarChartCustom';
import BarChartCompostCustom from '../Components/BarChartCompostCustom';
import axios from 'axios';
import MDSnackbar from '../../../controls/MDSnackbar';
import API_URL from '../../../../config';

const GraficoEstadoTareas = () => {

    const closeSuccessSB = () => setSuccessSB(false);
    const [successSB, setSuccessSB] = useState(false);
    const [successSBPrev, setSuccessSBPrev] = useState(false);
    const closeErrorSB = () => setErrorSB(false);
    const [dateTime, setDateTime] = useState("");
    const [errorSB, setErrorSB] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [graficoTextTextInt, setGraficoTextTextInt] = useState([]);
    const [graficoTextIntInt, setGraficoTextIntInt] = useState([]);
    const [graficoTextInt, setGraficoTextInt] = useState([]);


    useEffect(  ()=> {
        const fetchData = async () => {
        try
        {
          setSuccessSBPrev(true);
          const reqGraphs = {
            graficoNombre: "EstadoTipo"
          };
        const response = await axios.post(API_URL + `/GraficosListar` ,reqGraphs, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          }
        });

          const res = await response.data;
          console.log("res:", res);
          if (res.rdoAccion) {
            setSuccessSB(true);
            setSuccessSBPrev(false);
            setErrorSB(false);
            setGraficoTextTextInt(res.graficoTextTextInt);
            setGraficoTextIntInt(res.graficoTextIntInt);
            setGraficoTextInt(res.graficoTextInt);

          } else {
              // Manejar errores si la respuesta no es exitosa
              setMensajeError(res.rdoAccionDesc);
              setSuccessSB(false);
              setErrorSB(true);
              setSuccessSBPrev(false);
              
          }
   
        }
        catch(error) {
          console.log("Errores de Proceso:", error.message);
          setSuccessSB(false);
          setErrorSB(true);
          setSuccessSBPrev(false);
      };
    }
    fetchData();
    },[]);


    return (
    
        <PageLayout style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <MDBox px={1} width="100%" height="100vh" mx="auto"> */}
        <MDBox width="100%" height="100%">
        <Grid  width='80%' justifyContent="center" alignItems="center" height="100%">
            {/* <Grid item xs={11} sm={9} md={5} lg={4} xl={3}> */}
            <Card style={{ width: '100%', marginLeft:'260px', marginTop:'60px',   marginRight: 'auto' }}>
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
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Ejemplos de Gráficos de Estados de Tarea
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
            Informacion general acerca de los estado en que se encuentran las tareas
            </MDTypography>
        </MDBox>
        <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'space-between', width: '100%' }}>
            {/* Primer Gráfico */}
            <Card style={{ flex: 1 }}>
            <BarChartCustom data={graficoTextTextInt} namekey={"label1"} datakey={"valor1"} title={graficoTextTextInt[0].titulo} 
                            mostrarfiltro={true} nameeje={graficoTextTextInt[0].label1Nombre} 
                            nameejevertical={graficoTextTextInt[0].valor1Nombre} observaciones={"sin observaciones por el momento..."}/>
            </Card>

            {/* Segundo Gráfico */}
            {/* <Card style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataradar}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
            </Card> */}

        </div>
        <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'space-between', width: '100%' }}>
        <Card style={{ flex: 1 }}>
        <BarChartCompostCustom data={graficoTextIntInt} namekey={"label1"} datakey={"valor1"} datakey2={"value2"} title={graficoTextIntInt[0].titulo} 
                            mostrarfiltro={true} nameeje={graficoTextIntInt[0].label1Nombre} nameeje2={graficoTextIntInt[0].valor2Nombre} 
                            nameejevertical={graficoTextIntInt[0].valor1Nombre} nameejevertical2={graficoTextIntInt[0].valor2Nombre} observaciones={"sin observaciones por el momento..."}/>
        
            </Card>
            <Card style={{ flex: 1 }}>
            
            <PieChartCustom data={graficoTextInt} namekey={"label1"} datakey={"valor1"} title={graficoTextIntInt[0].graficoTextInt} 
                            mostrarfiltro={true} observaciones={"sin observaciones por el momento..."}/>
            </Card>
        </div>
        </Card>
        </Grid>
            {/* </Grid> */}
        </MDBox>
        <MDSnackbar
            color="success"
            icon="notifications"
            title="Task Manager"
            content="Cargando paneles....."
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

export default GraficoEstadoTareas;
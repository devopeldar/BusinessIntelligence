import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import MDTypography from '../../../controls/MDTypography';
import MDBox from '../../../controls/MDBox';
import { Autocomplete, Card, Checkbox, Grid, List, ListItem, ListItemIcon, ListItemText, ListSubheader, TextField } from '@mui/material';
import PageLayout from '../../../layauots/PageLayout';
import PieChartCustom from '../Components/PieChartCustom';
import { CheckBox } from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BarChartCustom from '../Components/BarChartCustom';
const dataMes = [
  { label1: 'Enero', value1: 400, titulo: 'Ventas x Mes', label1Nombre: 'Meses', valor1Nombre: 'Cantidad Ventas' },
  { label1: 'Febrero', value1: 300, titulo: 'Ventas x Mes', label1Nombre: 'Meses', valor1Nombre: 'Cantidad Ventas' },
  { label1: 'Marzo', value1: 600, titulo: 'Ventas x Mes', label1Nombre: 'Meses', valor1Nombre: 'Cantidad Ventas' },
  { label1: 'Abril', value1: 200, titulo: 'Ventas x Mes', label1Nombre: 'Meses', valor1Nombre: 'Cantidad Ventas' },
  { label1: 'Mayo', value1: 700, titulo: 'Ventas x Mes', label1Nombre: 'Meses', valor1Nombre: 'Cantidad Ventas' },
  { label1: 'Junio', value1: 400, titulo: 'Ventas x Mes', label1Nombre: 'Meses', valor1Nombre: 'Cantidad Ventas' },
  { label1: 'Julio', value1: 300, titulo: 'Ventas x Mes', label1Nombre: 'Meses', valor1Nombre: 'Cantidad Ventas' }
];




const data2 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 900 },
  { name: 'Group F', value: 100 },
  { name: 'Group G', value: 600 }
];

  const dataarea = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  const dataradar = [
    {
      subject: 'Math',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Chinese',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'English',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Geography',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Physics',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'History',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

const GraficoClientes = () => {
  // const [srcpiechart, setSrcPieChart]= useState([]);
  // const [selectedMonths, setSelectedMonths] = useState([]);

  // const handleMonthChange = (event, selectedValues) => {
  //   setSelectedMonths(selectedValues);
  // };

  // const handleToggle = (month) => () => {
  //   const selectedIndex = selectedMonths.indexOf(month);
  //   const newSelected = [...selectedMonths];

  //   if (selectedIndex === -1) {
  //     newSelected.push(month);
  //   } else {
  //     newSelected.splice(selectedIndex, 1);
  //   }

  //   setSelectedMonths(newSelected);
  // };


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
          Ejemplos de Gráficos de Clientes
        </MDTypography>
        <MDTypography display="block" variant="button" color="white" my={1}>
          Prueba de cómo se verían los gráficos
        </MDTypography>
      </MDBox>
      <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'space-between', width: '100%' }}>
        {/* Primer Gráfico */}
        <Card style={{ flex: 1 }}>
        <BarChartCustom data={dataMes} namekey={"label1"} datakey={"value1"} title={dataMes[0].titulo} 
                          mostrarfiltro={true} nameeje={dataMes[0].label1Nombre} 
                          nameejevertical={dataMes[0].valor1Nombre} observaciones={"sin observaciones por el momento..."}/>
        </Card>

        {/* Segundo Gráfico */}
        <Card style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataradar}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
        </Card>

      </div>
      <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'space-between', width: '100%' }}>
      <Card style={{ flex: 1 }}>
       
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={dataarea}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize:'10px' }}/>
          <YAxis style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize:'10px' }}/>
          <Tooltip />
          <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
     
          </ResponsiveContainer>
        </Card>
        <Card style={{ flex: 1 }}>
        
          <PieChartCustom data={dataMes} namekey={"label1"} datakey={"value1"} title={"ejemplo de grafico de torta"} 
                          mostrarfiltro={true} observaciones={"sin observaciones por el momento..."}/>
        </Card>
      </div>
      </Card>
      </Grid>
        {/* </Grid> */}
      </MDBox>
    </PageLayout>

  );
};

export default GraficoClientes;
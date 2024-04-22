import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, AreaChart, Area, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import MDTypography from '../../../controls/MDTypography';
import MDBox from '../../../controls/MDBox';
import { Card, Grid } from '@mui/material';
import BasicLayout from '../../../layauots/BasicLayout';
import bgImage from "../../../../assets/images/bg-sign-up-cover.jpeg";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import PageLayout from '../../../layauots/PageLayout';
import { red } from '@mui/material/colors';
const data2 = [
  { name: 'Enero', ventas: 400 },
  { name: 'Febrero', ventas: 300 },
  { name: 'Marzo', ventas: 600 },
  { name: 'Abril', ventas: 200 },
  { name: 'Mayo', ventas: 700 },
  { name: 'Junio', ventas: 400 },
  { name: 'Julio', ventas: 300 },
  { name: 'Agosto', ventas: 600 },
  { name: 'Septiembre', ventas: 200 },
  { name: 'Octubre', ventas: 700 },
];

const data = [
  { id: 0, value: 10, label: 'series A' },
  { id: 1, value: 15, label: 'series B' },
  { id: 2, value: 20, label: 'series C' },
];
const dataPie = [
    { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
    { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
    { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
    { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
    { name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c' },
    { name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57' },
    { name: 'unknown', uv: 6.67, pv: 4800, fill: '#ffc658' },
  ];

  const legendStyle = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };


  function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();
  
    if (valueAngle === null) {
      // No value to display
      return null;
    }
  
    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="red" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="red"
          strokeWidth={3}
        />
      </g>
    );
  }

  const settings = {
    width: 200,
    height: 200,
    value: 60,
  };
  
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


  const size = {
    width: 400,
    height: 200,
  };
const GraficoClientes = () => {
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
        <ResponsiveContainer width="100%" height={400}>
            <BarChart width={200} height={300} data={data2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize:'10px' }}/>
              <YAxis style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize:'10px' }} />
              <Tooltip style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize:'10px' }}/>
              <Legend />
              <Bar dataKey="ventas" fill="#8884d8" />
            </BarChart>

          </ResponsiveContainer>
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
          <ResponsiveContainer width="100%" height={400}>
          <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label} (${item.value})`,
                  arcLabelMinAngle: 45,
                  data,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontWeight: 'bold',
                },
              }}
              {...size}
            />
          </ResponsiveContainer>
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
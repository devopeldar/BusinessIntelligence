import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import MDTypography from '../../../controls/MDTypography';
import MDBox from '../../../controls/MDBox';
import { Card } from '@mui/material';
import BasicLayout from '../../../layauots/BasicLayout';
import bgImage from "../../../../assets/images/bg-sign-up-cover.jpeg";
const data = [
  { name: 'Enero', ventas: 400 },
  { name: 'Febrero', ventas: 300 },
  { name: 'Marzo', ventas: 600 },
  { name: 'Abril', ventas: 200 },
  { name: 'Mayo', ventas: 700 },
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


const GraficoClientes = () => {
  return (
    // <BasicLayout image={bgImage}>
    //   <Card>
    //     <MDBox
    //       variant="gradient"
    //       bgColor="warning"
    //       borderRadius="lg"
    //       coloredShadow="success"
    //       mx={2}
    //       mt={-3}
    //       p={3}
    //       mb={1}
    //       textAlign="center"
    //     >
    //       <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
    //         Ejemplos de Gráficos de Clientes
    //       </MDTypography>
    //       <MDTypography  display="block" variant="button" color="white" my={1}>
    //         Prueba de cómo se vería un gráfico
    //       </MDTypography>
    //     </MDBox>
    //     <ResponsiveContainer width="100%" height={800}>
    //         <BarChart width={200} height={300} data={data}>
    //         <CartesianGrid strokeDasharray="3 3" />
    //         <XAxis dataKey="name" />
    //         <YAxis />
    //         <Tooltip />
    //         <Legend />
    //         <Bar dataKey="ventas" fill="#8884d8" />
    //         </BarChart>

    //         <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={dataPie}>
    //         <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
    //         <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={legendStyle} />
    //       </RadialBarChart>


    //     </ResponsiveContainer>
    //   </Card>
    // </BasicLayout>
    <BasicLayout image={bgImage}>
    {/* <div style={{ background: 'white',  width:'850px', padding: '20px' }}> */}
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
      <div style={{ display: 'flex', width:'800px', justifyContent: 'space-between' }}>
        {/* Primer Gráfico */}
        <Card style={{ width: '48%' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart width={200} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Segundo Gráfico */}
        <Card style={{ width: '48%' }}>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={dataPie}>
              <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: '20px', top: '20px' }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    {/* </div> */}
    </BasicLayout>
  );
};

export default GraficoClientes;
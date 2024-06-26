import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@mui/material';
import BasicLayout from '../../layauots/BasicLayout';
import MDBox from '../../controls/MDBox';
import MDTypography from '../../controls/MDTypography';
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";

const Example1 = () => {
  const data = [
    { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
    { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
    { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
    { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
    { name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c' },
    { name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57' },
    { name: 'unknown', uv: 6.67, pv: 4800, fill: '#ffc658' },
  ];
sssssss
  const legendStyle = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
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
            Ejemplos de Gráficos
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Prueba de cómo se vería un gráfico
          </MDTypography>
        </MDBox>
        <ResponsiveContainer width="100%" height={400}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
            <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={legendStyle} />
          </RadialBarChart>
        </ResponsiveContainer>
      </Card>
    </BasicLayout>
  );
};

export default Example1;


// import React, { PureComponent } from 'react';
// import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
// import BasicLayout from '../../layauots/BasicLayout';
// import { Card } from '@mui/material';
// import MDBox from '../../controls/MDBox';
// import MDTypography from '../../controls/MDTypography';
// import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
// const Example1 = () => {
// const data = [
//   {
//     name: '18-24',
//     uv: 31.47,
//     pv: 2400,
//     fill: '#8884d8',
//   },
//   {
//     name: '25-29',
//     uv: 26.69,
//     pv: 4567,
//     fill: '#83a6ed',
//   },
//   {
//     name: '30-34',
//     uv: 15.69,
//     pv: 1398,
//     fill: '#8dd1e1',
//   },
//   {
//     name: '35-39',
//     uv: 8.22,
//     pv: 9800,
//     fill: '#82ca9d',
//   },
//   {
//     name: '40-49',
//     uv: 8.63,
//     pv: 3908,
//     fill: '#a4de6c',
//   },
//   {
//     name: '50+',
//     uv: 2.63,
//     pv: 4800,
//     fill: '#d0ed57',
//   },
//   {
//     name: 'unknow',
//     uv: 6.67,
//     pv: 4800,
//     fill: '#ffc658',
//   },
// ];

// const style = {
//   top: '50%',
//   right: 0,
//   transform: 'translate(0, -50%)',
//   lineHeight: '24px',
// };


// return (
//     <BasicLayout image={bgImage}>
//       <Card>
//         <MDBox
//           variant="gradient"
//           bgColor="warning"
//           borderRadius="lg"
//           coloredShadow="success"
//           mx={2}
//           mt={-3}
//           p={3}
//           mb={1}
//           textAlign="center"
//         >
//         <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//            Ejemplos de Graficos
//           </MDTypography>
//           <MDTypography display="block" variant="button" color="white" my={1}>
//            Prueba de como se veria un grafico
//           </MDTypography>
//         </MDBox>
//       <ResponsiveContainer width="100%" height="100%">
//         <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
//           <RadialBar
//             minAngle={15}
//             label={{ position: 'insideStart', fill: '#fff' }}
//             background
//             clockWise
//             dataKey="uv"
//           />
//           <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
//         </RadialBarChart>
//       </ResponsiveContainer>
//       </Card>
//       </BasicLayout>
//     );
//   };


// export default Example1;
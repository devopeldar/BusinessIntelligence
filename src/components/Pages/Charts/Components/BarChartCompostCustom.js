import "./styles.css";
import React, { useEffect, useState } from "react";
import { Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import { Checkbox, List, ListItem, Stack } from '@mui/material';
import { getMultiSectionDigitalClockSectionUtilityClass } from "@mui/x-date-pickers/MultiSectionDigitalClock/multiSectionDigitalClockSectionClasses";
import COLORS from "../../../Utils/Colors";
import { axisClasses } from "@mui/x-charts";

export default function BarChartCompostCustom ({ data, datakey, title, namekey, mostrarfiltro, observaciones, 
                                        nameeje, nameejevertical, datakey2, nameeje2,nameejevertical2 }) {
    
const [srcpiechart, setSrcPieChart]= useState([]);
const [selectedItems, setSelectedItems] = useState([]);

const handleToggle = (month) => () => {
    const selectedIndex = selectedItems.indexOf(month);
    const newSelected = [...selectedItems];

    if (selectedIndex === -1) {
        newSelected.push(month);
    } else {
        newSelected.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelected);
};

useEffect( ()=> {

setSrcPieChart(data);

},[]);

useEffect(() => {
   
    const filteredData = data.filter((item) => selectedItems.includes(item));
  
    if(filteredData.length > 0)
      setSrcPieChart(filteredData);
    else
      setSrcPieChart(data);
  
  }, [selectedItems]); // Actualizar cuando cambia la selección de meses

  
const chartSetting = {
    yAxis: [
      {
        label: 'rainfall (mm)',
      },
    ],
    
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },
  };
  return (
    <>
    <MDBox>
        <MDTypography variant="body2" style={{ marginTop:5, textAlign:'center',  fontWeight: '900' }}>
            {title}
        </MDTypography>
    </MDBox>
    <MDBox
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    >
   
    {mostrarfiltro &&(
        <>
        <List>
            <MDBox>
                <MDTypography variant="body2" style={{ marginLeft: 8, fontWeight: 'bold', fontSize:'10px' }}>
                Filtros
                </MDTypography>
            </MDBox>
            {data.map((items, i) => {
            const isSelected = selectedItems.indexOf(items) !== -1;

            return (
                <ListItem
             
                key={items[i]?.[namekey]}
                onClick={handleToggle(items)}
                >
                <Checkbox
                    checked={isSelected}
                    color="primary"
                    onChange={handleToggle(items)}
                />
                <MDTypography variant="body2" style={{ marginLeft: 8, fontSize:'10px' }}>
                    {items?.[namekey]}
                </MDTypography>
                </ListItem>
            );
            })}
        </List>
        </>
    )} 
    <BarChart width={600} height={300} data={srcpiechart}
    {...chartSetting}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={namekey} style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize:'10px' }}/>
      <YAxis style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize:'10px' }} />     
      <Tooltip display={false}
        contentStyle={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '10px' }} // Estilo del contenido del tooltip
        formatter={(value, name, props) => {
            return (
                <div>
                    <p>{props.payload.label1}</p>
                    <p>{nameejevertical}: {value}</p>
                    {/* <p>{nameejevertical2}: {value}</p> */}
                </div>
            );
        }}
        labelStyle={{ display: 'none' }} 
        />
      <Legend />
      
      <Bar name={nameeje}  dataKey={datakey} fill="#8884d8" />
      <Bar name={nameeje2} dataKey={datakey2} fill="#0088FE" />
    </BarChart>
    </MDBox>
    <MDBox>
        <MDTypography variant="body2" style={{
            marginTop: 5,
            textAlign: 'center',
            fontWeight: '100',
            fontStyle: 'italic', // Utiliza 'italic' en lugar de 'obliqueo' para cursiva
            opacity: 0.7, // Controla la transparencia ajustando el valor de 'opacity'
        }}>
           *{observaciones}
        </MDTypography>
    </MDBox>
    </>
  );
}
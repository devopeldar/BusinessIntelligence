import "./styles.css";
import React, { useEffect, useState } from "react";
import { Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import { Checkbox, List, ListItem, Stack } from '@mui/material';

export default function BarChartCustom({ data, datakey, title, namekey, mostrarfiltro, observaciones, nameeje, nameejevertical }) {
    
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
                <MDTypography variant="body2" style={{ marginLeft: 8, fontWeight: 'bold' }}>
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
                <MDTypography variant="body2" style={{ marginLeft: 8 }}>
                    {items?.[namekey]}
                </MDTypography>
                </ListItem>
            );
            })}
        </List>
        </>
    )} 
    <BarChart width={600} height={300} data={srcpiechart}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={namekey} style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize:'10px' }}/>
      <YAxis style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize:'10px' }} />
      {/* <Tooltip label={'ssss'} style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize:'10px' }}/> */}
      <Tooltip
        contentStyle={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '10px' }} // Estilo del contenido del tooltip
        formatter={(value, name, props) => {
            console.log(props)
            console.log(name)
            return (
                <div>
                    
                    <p>{props.payload.label1}</p>
                    <p>{nameejevertical}: {value}</p>
                </div>
            );
        }}
        labelStyle={{ display: 'none' }} 
        />
      <Legend />
      <Bar name={nameeje}  dataKey={datakey} fill="#8884d8" />
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
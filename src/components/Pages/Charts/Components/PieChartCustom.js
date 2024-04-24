import "./styles.css";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import COLORS from "../../../Utils/Colors";
import { Checkbox, List, ListItem, Stack } from '@mui/material';

export default function PieChartCustom({ data, datakey, title, namekey, mostrarfiltro, observaciones }) {
    
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
    <PieChart width={500} height={400}>
      <Pie
        data={srcpiechart}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey={datakey}
        paddingAngle={5}
        labelLine={false}
      >
        {srcpiechart.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    <Stack gap={2}>
        <MDBox sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {COLORS.map((color, i) => (
            (srcpiechart[i]?.[namekey] && 
            <Stack key={color} alignItems="center" spacing={1}>
              <MDBox sx={{ width: 20, height: 20, background: color }} />
              <MDTypography variant="body2" sx={{ opacity: 0.7 }}>
                {srcpiechart[i]?.[namekey]} {srcpiechart[i]?.[datakey]}
              </MDTypography>
            </Stack>
            )
          ))}
        </MDBox>
      </Stack>
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
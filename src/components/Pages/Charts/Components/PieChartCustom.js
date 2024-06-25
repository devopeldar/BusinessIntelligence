import "./styles.css";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, PieLabelRenderProps  } from "recharts";
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
  console.log("data pie:", data);
setSrcPieChart(data);

},[]);

useEffect(() => {
  console.log("data pie2:", data);
    const filteredData = data.filter((item) => selectedItems.includes(item));
    
    if(filteredData.length > 0)
      setSrcPieChart(filteredData);
    else
      setSrcPieChart(data);
  
  }, [selectedItems,data ]); // Actualizar cuando cambia la selección de meses

  // const renderCustomizedLabel = (props: PieLabelRenderProps) => {
  //   const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  //   const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
  
  //   return (
  //     <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
  //       {props.payload.label1}
  //       {`${props.payload.label1}: ${(percent * 100).toFixed(2)}%`}
  //     </text>
  //   );
  // };

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
                <MDTypography variant="body2" style={{ marginLeft: 8, fontWeight: 'bold',fontSize: '10px' }}>
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
                <MDTypography variant="body2" style={{ fontSize: '10px', marginLeft: 8 }}>
                    {items?.[namekey]} 
                </MDTypography>
                </ListItem>
            );
            })}
        </List>
        </>
    )} 
    <PieChart width={500} height={400} marginTop={50}>
      <Pie
        data={srcpiechart} innerRadius= {30}
        outerRadius= {150}
        paddingAngle= {5}
        cornerRadius= {5}
       
        cx= {150}
        cy={200}
        
        fill="#8884d8"
        dataKey={datakey}
       //</PieChart>name={props.payload.label1}
        labelLine={false}
        //label={renderCustomizedLabel}
      >
        {srcpiechart.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value, name, props) => {
          const { payload } = props;
          return [`${value}`, `${payload.label1}`];
        }}
        contentStyle={{ fontSize: '12px', fontFamily: 'Arial' }} // Ajusta el tamaño de la fuente aquí
      />
    </PieChart>
    <Stack gap={2}>
        <MDBox sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {COLORS.map((color, i) => (
            (srcpiechart[i]?.[namekey] && 
            <Stack key={color} alignItems="center" spacing={1}>
              <MDBox sx={{ width: 20, height: 20, background: color }} />
              <MDTypography variant="body2" sx={{ opacity: 0.7, fontSize: '9px'  }}>
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
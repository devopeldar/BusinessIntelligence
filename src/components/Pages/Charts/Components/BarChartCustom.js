import "./styles.css";
import React, { useEffect, useState } from "react";
import { Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import { Checkbox, List, ListItem, Stack } from '@mui/material';

export default function BarChartCustom({ data, datakey, title, namekey, mostrarfiltro, observaciones, nameeje, nameejevertical, namekey2, nameeje2 }) {

    const [srcpiechart, setSrcPieChart] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filteredData, setFilteredData] = useState(data);

    const handleToggle = (usrselect) => () => {
        const selectedIndex = selectedUsers.indexOf(usrselect);
        let newSelectedUsers = [...selectedUsers];

        if (selectedIndex === -1) {
            newSelectedUsers.push(usrselect);
        } else {
            newSelectedUsers.splice(selectedIndex, 1);
        }

        setSelectedUsers(newSelectedUsers);
        filterData(newSelectedUsers);
    };

    const filterData = (selectedUsers) => {
        if (selectedUsers.length === 0) {
            setFilteredData(data);
        } else {
            const newFilteredData = data.filter(item => selectedUsers.includes(item.label1));
            setFilteredData(newFilteredData);
        }
    };

    useEffect(() => {
        setSrcPieChart(data);
    }, [data]);

    useEffect(() => {
        const newFilteredData = data.filter((item) => selectedUsers.includes(item.label1));
        if (newFilteredData.length > 0) {
            setSrcPieChart(newFilteredData);
        } else {
            setSrcPieChart(data);
        }
    }, [selectedUsers, data]); // Actualizar cuando cambia la selección de usuarios

    // Filtramos los elementos únicos por la propiedad label1
    const uniqueUsers = [...new Map(data.map(item => [item.label1, item])).values()];

    return (
        <>
            <MDBox>
                <MDTypography variant="body2" style={{ marginTop: 5, textAlign: 'center', fontWeight: '900' }}>
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

                {mostrarfiltro && (
                    <>
                        <List>
                            <MDBox>
                                <MDTypography variant="body2" style={{ marginLeft: 8, fontWeight: 'bold',fontSize: '10px' }}>
                                    Filtros
                                </MDTypography>
                            </MDBox>
                            {uniqueUsers.map((item, index) => {
                                const isSelected = selectedUsers.indexOf(item.label1) !== -1;

                                return (
                                    <ListItem
                                        key={item.label1}
                                        onClick={handleToggle(item.label1)}
                                    >
                                        <Checkbox
                                            checked={isSelected}
                                            color="primary"
                                            onChange={handleToggle(item.label1)}
                                        />
                                        <MDTypography variant="body2" style={{fontSize: '10px', marginLeft: 8 }}>
                                            {item.label1}
                                        </MDTypography>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </>
                )}
                <BarChart width={900} height={400} data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={namekey} style={{ height:'50px', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '7px' }} interval={0} angle={-45} textAnchor="end" />
                    <YAxis style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '10px' }} />
                    <Tooltip
                        contentStyle={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '10px' }} // Estilo del contenido del tooltip
                        formatter={(value, name, props) => {
                            return (
                                <div>
                                    <p>{props.payload.label1}<br />{props.payload.label2}</p>
                                    <p>{nameejevertical}: {value}</p>
                                </div>
                            );
                        }}
                        labelStyle={{ display: 'none' }}
                    />
                    <Legend />
                    <Bar key={filteredData.id} name={nameeje} dataKey={datakey} fill="#82ca9d" />
                </BarChart>
            </MDBox>
            <MDBox>
                <MDTypography variant="body2" style={{
                    marginTop: 5,
                    textAlign: 'center',
                    fontWeight: '100',
                    fontStyle: 'italic', // Utiliza 'italic' en lugar de 'oblique' para cursiva
                    opacity: 0.7, // Controla la transparencia ajustando el valor de 'opacity'
                }}>
                    *{observaciones}
                </MDTypography>
            </MDBox>
        </>
    );
}
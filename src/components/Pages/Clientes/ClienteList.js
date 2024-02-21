
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardLayout from '../../controls/DashboardLayout';
import DashboardNavbar from '../../controls/DashboardNavbar';
import MDBox from '../../controls/MDBox';
import { Grid } from '@mui/material';
import { Card } from 'react-bootstrap';
import MDTypography from '../../controls/MDTypography';
import MDButton from '../../controls/MDButton';
import DataTable from '../../controls/Tables/DataTable';
import { BuildingFillAdd, FileExcel, FilePdf, Filter, PencilSquare } from 'react-bootstrap-icons';
import ClienteGet from './ClienteGet';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../../config';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import MDBadge from '../../controls/MDBadge';
import { Filter1 } from '@mui/icons-material';
import MDInput from '../../controls/MDInput';
function ClienteList() {
    const [nombrecliente   , setNombreCliente] = useState("");
    const [email   , setEmail] = useState("");
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState([]);
    //const { columns, rows } = ClienteGet();
    const history = useNavigate();
    const [Clientes, setClientes] = useState([]);
    const [espdf, setEsPDF] = useState(false);
    const handleAdd = () => {
        history('/ClienteAdd'); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
    };

    useEffect(() => {
        fetchData();
      }, []);

      

        const fetchData = async () => {
          try {
            const reqcliente = {
              nombre:nombrecliente,
              email : email
            };
            console.log("reqCliente", reqcliente)
            const response = await axios.post(API_URL + "/ClienteListar", reqcliente, {
              headers: {
                accept: "application/json",
              },
            });
    
         
            const data = response.data.map((Cliente) => ({
  
            
                nombre: (
                    <Nombre
                      nombre={Cliente.nombre}
                      contacto={"Contacto: " + Cliente.contacto}
                      email={"Email: " + Cliente.email}
                      telefono={"Telefono: " + Cliente.telefono}
                    />
                  ),
                  cuit: (
                    <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                  >
                    {Cliente.cuit}
                  </MDTypography>
                  ),
                  descripcionIVA: (
                    <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                  >
                    {Cliente.descripcionIVA}
                  </MDTypography>
                  ),
                  observaciones: (
                    <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                  >
                    {Cliente.observaciones}
                  </MDTypography>
                  ),
                  activo: (
                    <MDBox ml={-1}>
                      {Cliente.activo ? (
                        <MDBadge
                          badgeContent="activo"
                          color="success"
                          variant="gradient"
                          size="sm"
                        />
                      ) : (
                        <MDBadge
                          badgeContent="desactivado"
                          color="error"
                          variant="gradient"
                          size="sm"
                        />
                      )}
                    </MDBox>
                  ),
                  action: (
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                      <Link to={`../ClienteEdit/${Cliente.idCliente}`}>
                        <MDButton variant="text" color="dark">
                          <PencilSquare color="blue" />
                        </MDButton>
                      </Link>
                    </MDTypography>
                  ),
            
            
            }));
           
            setRows(data);
            setColumns( [
                // { Header: "ID Cliente", accessor: "idCliente", align: "left" },
                { Header: "Cliente", accessor: "nombre", width: "25%", align: "left" },
                { Header: "Cuit", accessor: "cuit", align: "left" },
                { Header: "Cond. Iva", accessor: "descripcionIVA", align: "left" },
                { Header: "observaciones", accessor: "observaciones", align: "left" },
                { Header: "Activo", accessor: "activo", align: "center" },
                { Header: "Acciones", accessor: "action", align: "center" },
              ]);
        
          } catch (ex) {
            setError(ex);
    
            console.log(error);
          }
        };
    
      const handleFilter = () => {
        fetchData(); // Llamada desde el evento del botón
      };
      
    const handlePDF = () => {
        setEsPDF(true);
        fetchData();

    };

    // Función para generar el PDF
    const generatePDF = (data) => {
        const doc = new jsPDF();

        const columns = ['ID Cliente', 'Nombre', 'Contacto', 'Teléfono', 'Email']; // Ajusta las columnas según tus datos
        const rows = data.map((item) => [
            item.idCliente.toString(),
            item.nombre,
            item.contacto,
            item.telefono,
            item.email
            // Añade más datos según tu estructura JSON
        ]);

        const header = (cell, y) => {
            doc.setFillColor(51, 122, 183); // Color del encabezado
            doc.setTextColor(255);
            doc.setFontStyle('bold');
            doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
            doc.text(cell.text, cell.x + cell.width / 2, cell.y + cell.height / 2, {
                align: 'center',
                valign: 'middle'
            });
        };

        const options = {
            startY: 10,
            margin: { horizontal: 10 },
            headStyles: { fillColor: [51, 122, 183], textColor: 255 },
            bodyStyles: { textColor: 0 },
            columnStyles: { 0: { cellWidth: 30 } }, // Ajusta el ancho de la primera columna si es necesario
            theme: 'grid'
        };

        doc.autoTable(columns, rows, options, header);


        return doc;
    };


    const generateAndDownloadPDF = () => {
        const pdf = generatePDF(Clientes);
        pdf.save('ListadoClientes-PDF.pdf'); // Descarga el archivo PDF
    };


    const handleExcel = () => {
        setEsPDF(false);
        fetchData();

    };


    const Nombre = ({ nombre, contacto, email, telefono }) => (
        <MDBox lineHeight={1} textAlign="left">
          <MDTypography
            display="block"
            variant="caption"
            color="dark"
            fontWeight="bold"
          >
            {nombre}
          </MDTypography>
          <MDTypography variant="caption" color="warning" fontWeight="light">
            {contacto}{" "}
          </MDTypography>
          <MDTypography variant="caption" color="warning" fontWeight="light">
            {email}{" "}{telefono}{" "}
          </MDTypography>
        </MDBox>
      );

      
    const fetchDatapDF = async () => {
        try {
            const response = await axios.post(API_URL + "/ClienteListar", {
                headers: {
                    accept: "application/json",
                },
            });

            setClientes(response.data);
            // const data = response.data.map((Cliente) => ({
            //     idCliente: Cliente.idCliente,
            //     nombre: Cliente.nombre,
            //     activo: Cliente.activo,
            //     contacto: Cliente.contacto,
            //     telefono: Cliente.telefono,
            //     email: Cliente.email,
            //     cuit: Cliente.cuit,
            //     observaciones: Cliente.observaciones,
            //     tipoIVA: Cliente.tipoIVA,
            //     descripcionIVA: Cliente.descripcionIVA
            // }));
            if (espdf === true) {
                exportToExcel(); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos

            }
            else {
                generateAndDownloadPDF();
            }


        } catch (ex) {

            console.log(ex);
        }

    };



    // Función para exportar datos a Excel
    const exportToExcel = () => {
        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        // Definir el encabezado de las columnas
        const headers = [
            'Razon Social', 'Contacto', 'Teléfono', 'Email', 'Cuit', 'Descripción IVA', 'Activo'
        ];

        // Agregar el encabezado a la hoja de cálculo
        worksheet.addRow(headers);
        console.log("Clientes " + Clientes);
        // Agregar los datos al archivo Excel
        Clientes.forEach((row) => {
            const rowData = [
                row.nombre,
                row.contacto,
                row.telefono,
                row.email,
                row.cuit,
                row.descripcionIVA,
                row.activo
            ];

            worksheet.addRow(rowData);
        });

        // Generar el archivo Excel y descargarlo
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);

            // Crear un enlace de descarga para el archivo Excel y hacer clic automáticamente
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ListadoClientes.xlsx');
            document.body.appendChild(link);
            link.click();

            // Limpiar el enlace y la URL después de la descarga
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
        });
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>


                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="secondary"
                                borderRadius="lg"
                                coloredShadow="secondary"
                            >
                                <MDTypography variant="h6" color="white">
                                    Clientes

                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3} py={3} px={2}>
                                <Grid container justifyContent="space-between" alignItems="center" direction="row">
                                    <Grid item>
                                        <MDButton
                                            onClick={() => {
                                                handleAdd();
                                            }}
                                            variant="gradient"
                                            color="success"
                                            endIcon={<BuildingFillAdd />}
                                            text="contained"
                                        >
                                            Agregar
                                        </MDButton>
                                        <MDButton
                                            onClick={() => {
                                                handleFilter();
                                            }}
                                            variant="gradient"
                                            color="info"
                                            endIcon={<Filter1 />}
                                            text="contained"
                                            >
                                            Filtrar
                                        </MDButton>
                                        <MDButton
                                            onClick={() => {
                                                handleExcel();
                                            }}
                                            variant="gradient"
                                            color="warning"
                                            endIcon={<FileExcel />}
                                            text="contained"
                                        >
                                            Excel
                                        </MDButton>


                                        <MDButton
                                            onClick={() => {
                                                handlePDF();
                                            }}
                                            variant="gradient"
                                            color="error"
                                            endIcon={<FilePdf />}
                                            text="contained"
                                        >
                                            PDF
                                        </MDButton>

                                        <MDBox pt={3} py={3} px={2} style={{ display: "flex" }}>
                                        <Grid>
                                        <MDTypography variant="h9" color="info">
                                            Filtros
                                            </MDTypography>
                                            <MDBox mb={2}>
                                                <MDInput
                                                    type="text"
                                                    name="nombreCliente"
                                                    label="Nombre Cliente"
                                                    variant="standard"
                                                    value={nombrecliente}
                                                    onChange={(e) => setNombreCliente(e.target.value)}
                                                    
                                                />
                                            </MDBox>
                                            <MDBox mb={2}>
                                                <MDInput
                                                    type="text"
                                                    name="email"
                                                    label="Correo Electronico"
                                                    variant="standard"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    
                                                />
                                            </MDBox>
                                            </Grid>
                                        </MDBox>
                                    </Grid>
                                    
                                    <DataTable
                                        table={{ columns, rows }}
                                        isSorted={false}                                        
                                        showTotalEntries={true}
                                        canSearch={false}
                                        pagination={{ color: "secondary", variant: "gradient" }}
                                    />
                                </Grid>
                            </MDBox>
                        </Card>
                    </Grid>

                </Grid>
            </MDBox>
            {/* <Footer /> */}
        </DashboardLayout >
    );
}


export default ClienteList;
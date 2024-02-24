import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el archivo CSS de Bootstrap

import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import { Grid, Icon } from "@mui/material";
import { Card } from "react-bootstrap";
import DashboardLayout from "../../../controls/DashboardLayout";
import DashboardNavbar from "../../../controls/DashboardNavbar";
import DataTable from "../../../controls/Tables/DataTable";
import { useNavigate } from 'react-router-dom';
import TareaEstadoGet from "./TareaEstadoGet";
import jsPDF from "jspdf";
import MDButton from "../../../controls/MDButton";
import axios from "axios";
import API_URL from "../../../../config";
import { Bandaid, Check, FilePdf } from "react-bootstrap-icons";

function TareaEstadoList() {
  const { columns, rows } = TareaEstadoGet();
  const history = useNavigate();
  const [TareasEstados, setTareasEstados] = useState([]);
  const [espdf, setEsPDF] = useState(false);
  const handlePDF = () => {
    setEsPDF(true);
    fetchData();
  };


  const fetchData = async () => {
    try {
      const response = await axios.post(API_URL + "/TareaEstadoListar", {
        headers: {
          accept: "application/json",
        },
      });

      setTareasEstados(await response.data);

      // if (espdf === true) {
      //   //  exportToExcel(); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
      // } else {
        generateAndDownloadPDF();
      //}
    } catch (ex) {
      console.log(ex);
    }
  };

  function getIcon(activo) {
    return activo ? 'SI' : 'NO';//<Icon icon={Check} color="success"></Icon>  : <Icon icon={Bandaid} color="warning"></Icon>
  }

  const generateAndDownloadPDF = () => {
    const pdf = generatePDF(TareasEstados);
    pdf.save("ListadoTareas-PDF.pdf"); // Descarga el archivo PDF
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.setFont('times');
    doc.setFontSize(12);
    const columns = [ "Descripcion", "Estado Final", "Activo", "Observaciones"]; // Ajusta las columnas según tus datos
    const rows = data.map((item) => [
      item.descripcion,
      getIcon(item.esEstadoFinal),
      getIcon(item.activo)  ,
      item.observaciones,
      // Añade más datos según tu estructura JSON
    ]);

    const header = (cell, y) => {
      doc.setFillColor(51, 122, 183); // Color del encabezado
      doc.setTextColor(255);
      doc.setFontStyle("bold");
      doc.rect(cell.x, cell.y, cell.width, cell.height, "F");
      doc.text(cell.text, cell.x + cell.width / 2, cell.y + cell.height / 2, {
        align: "center",
        valign: "middle",
      });
    };

    const options = {
      startY: 10,
      margin: { horizontal: 10 },
      headStyles: { fillColor: [51, 122, 183], textColor: 255 },
      bodyStyles: { textColor: 0 },
      columnStyles: { 0: { cellWidth: 30 } }, // Ajusta el ancho de la primera columna si es necesario
      theme: "grid",
    };

    doc.autoTable(columns, rows, options, header);

    return doc;
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Estados de Tarea
                 
                </MDTypography>
              </MDBox>
              <MDBox pt={3}  py={3}
                px={2}>
                
              {/* <MDButton
                    onClick={() => {
                      handleAdd();
                    }}
                    variant="gradient"
                    color="success"
                    endIcon={<BuildingFillAdd />}
                    text="contained"
                  >
                    Agregar
                  </MDButton> */}
                   {/* <DataGridPremium
                    rows={rows}
                    columns={columns}
                    // slots={{
                    //   toolbar: CustomToolbar,
                    // }}
                  /> */}
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
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder
                  pagination={{color:"info", variant:"gradient"}}
                />
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default TareaEstadoList;

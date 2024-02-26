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
//import TareaDocumentacionGet from "./TareaDocumentacionGet";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MDButton from "../../../controls/MDButton";
import axios from "axios";
import API_URL from "../../../../config";
import MDInput from "../../../controls/MDInput";
import { styled } from '@mui/material/styles';
import { Save } from "@mui/icons-material";


function TareaDocumentacionList() {
  //const { columns, rows } = TareaDocumentacionGet();
  const history = useNavigate();
  const [TareasEstados, setTareasEstados] = useState([]);
  const [espdf, setEsPDF] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(''); // Estado para almacenar el nombre del archivo seleccionado

  
  const handlePDF = () => {
    setEsPDF(true);
    fetchData();
  };
  const handleFileChange = (event) => {
  
      const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name); // Actualiza el nombre del archivo seleccionado en el estado
    }
      
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    onChange:{handleFileChange}
  });

  const fetchData = async () => {
    try {
      const response = await axios.post(API_URL + "/TareaDocumentacionListar", {
        headers: {
          accept: "application/json",
        },
      });

      setTareasEstados(await response.data);

      // if (espdf === true) {
      //   //  exportToExcel(); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
      // } else {
       // generateAndDownloadPDF();
      //}
    } catch (ex) {
      console.log(ex);
    }
  };

  function FileInput({ handleFileChange }) {
    return (
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileChange} // Pasa la función como prop
      />
    );
  }

  function getIcon(activo) {
    return activo ? 'SI' : 'NO';//<Icon icon={Check} color="success"></Icon>  : <Icon icon={Bandaid} color="warning"></Icon>
  }



  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Enviar el archivo al servidor
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Obtener la ruta del archivo devuelta por el servidor
      const filePath = response.data.filePath;
      
      // Aquí puedes guardar la ruta del archivo en tu base de datos
      console.log('Ruta del archivo guardada:', filePath);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
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
                  Documentacion anexada de Tarea
                 
                </MDTypography>
              </MDBox>

              <MDBox component="form" role="form">
              <MDBox pt={3}  py={3}
                px={2}>
                <MDButton
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  color="info"
                  // onClick={handleUpload} 
                  styled={{ width:'60px' }}
                >
                  Seleccionar Archivo
                  <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </MDButton>
            </MDBox>
            <MDBox pt={3}  py={3}
                px={2}>
                <MDInput
                    type="text"
                    name="uploadfile"
                    required
                    label="Archivo"
                    variant="standard"
                    multiline={true}
                    value={selectedFileName}

                />
            </MDBox>
            <MDBox pt={3}  py={3}
                px={2}>
            <MDButton
                    onClick={() => {
                      handleUpload();
                    }}
                    variant="gradient"
                    color="success"
                    endIcon={<Save />}
                    text="contained"
                  >
                    Subir Archivo
                  </MDButton>
                  </MDBox>
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
                    {/* <MDButton
                      onClick={() => {
                        handlePDF();
                      }}
                      variant="gradient"
                      color="error"
                      endIcon={<FilePdf />}
                      text="contained"
                    >
                      PDF
                    </MDButton> */}
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder
                  pagination={{color:"info", variant:"gradient"}}
                /> */}
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default TareaDocumentacionList;

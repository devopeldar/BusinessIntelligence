import React, { useEffect, useState } from 'react';
import BasicLayout from '../layauots/BasicLayout';
import { Card } from 'react-bootstrap';
import MDBox from '../controls/MDBox';
import MDTypography from '../controls/MDTypography';
import bgImage from '../../assets/images/bg-sign-up-cover.jpeg';
import { Checkbox } from '@mui/material';
import API_URL from '../../config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { HandIndex, Save2Fill } from 'react-bootstrap-icons';
import MDButton from '../controls/MDButton';


const Permisos = () => {

  const { id } = useParams();
  const [mantenimientotareas, setMantenimientoTareas] = useState(false);
  const [departamentos, setDepartamentos] = useState(false);
  const [tareas, setTareas] = useState(false);
  const [estadotarea, setEstadoTarea] = useState(false);
  const [tipodetareas, setTipoDeTareas] = useState(false);
  const [idperfil, setidPerfil] = useState(false);
  const [mnueventos, setMnuEventos] = useState(false);
  const [tipoevento, setTipoEventos] = useState(false);
  const [evento, setEventos] = useState(false);
  const [mnuclientes, setMnuClientes] = useState(false);
  const [mantenimientoclientes, setMantenimientoClientes] = useState(false);
  const [perfiles, setPerfiles] = useState(false);
  const [usuarios, setUsuarios] = useState(false);
  const [mnuseguridad, setMnuSeguridad] = useState(false);
  const [roles, setRol] = useState(false);





  useEffect(() => {
    setidPerfil(id);
    // Aquí realizas la llamada a tu API para obtener el Departamento específico por su ID
    const GetPermisos = async () => {
      try {
        const reqPermisosxPerfil = {
          idperfil: id
        };

        const response = await axios.post(API_URL + `/PerfilXPermisoGetByID`, reqPermisosxPerfil, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = response.data;

        setMantenimientoTareas(data.mantenimientotareas);
        setDepartamentos(data.departamentos);
        setTareas(data.tareas);
        setEstadoTarea(data.estadotarea);
        setTipoDeTareas(data.nombre);
        setDepartamentos(data.tipodetareas);
        setMnuEventos(data.mnueventos);
        setEventos(data.event);
        setTipoEventos(data.tipoevento);
        setMantenimientoClientes(data.mantenimientoclientes);
        setMnuClientes(data.mnuclientes);
        setMnuSeguridad(data.mnuseguridad);
        setUsuarios(data.usuarios);
        setPerfiles(data.perfiles);
        setRol(data.roles);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetPermisos();
  }, [id]);

  
  const handleSubmit = (event) => {
    console.log("handleSubmit " + tareas);
    console.log("handleSubmit " + departamentos);
    console.log("handleSubmit " + estadotarea);
    console.log("handleSubmit " + tipodetareas);
    console.log("handleSubmit " + mantenimientotareas);
  };
  const HandleMnuTarea = (event) => {
    console.log("event " + event);
    setTareas(event.target.checked)
    setMantenimientoTareas(event.target.checked);
    setDepartamentos(event.target.checked);
    setEstadoTarea(event.target.checked);
    setTipoDeTareas(event.target.checked);

  };
  const HandleMnuSeguridad = (event) => {

    setMnuSeguridad(event.target.checked)
    setUsuarios(event.target.checked);
    setPerfiles(event.target.checked);
    setRol(event.target.checked);

  };
  const HandleMnuClientes = (event) => {
 
    setMnuClientes(event.target.checked)
    setMantenimientoClientes(event.target.checked);
    
  };
  const HandleMnuEvento = (event) => {

    setMnuEventos(event.target.checked)
    setTipoEventos(event.target.checked);
    setEventos(event.target.checked);
    
  };

  // const handleInputChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   console.log("chk :" + event)
  //   // Verifica si el tipo de campo es un checkbox (para campos booleanos)
  //   const newValue = type === 'checkbox' ? checked : value;

  //   setFormData({
  //     ...formData,
  //     [name]: newValue,
  //   });



  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="warning"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Permisos
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Esta seccion permite establecer que pantallas podra visualizar el usuario
          </MDTypography>
        </MDBox>
        <MDBox>

          <Checkbox name="tareas"
            onChange={(e) => HandleMnuTarea(e)}
            checked={tareas || (tipodetareas || estadotarea || mantenimientotareas || departamentos)}

          />

          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Tareas
          </MDTypography>
        </MDBox>
        <MDBox sx={{ ml: 5 }}>
          <Checkbox name="mantenimientotareas"
            onChange={(e) => setMantenimientoTareas(e.target.checked)}
            checked={mantenimientotareas}

          />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Tareas
          </MDTypography>

        </MDBox>
        <MDBox sx={{ ml: 5 }}>
          <Checkbox name="tipodetareas"
            onChange={(e) => setTipoDeTareas(e.target.checked)}
            checked={tipodetareas}

          />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Tipos de Tarea
          </MDTypography>


        </MDBox>
        <MDBox sx={{ ml: 5 }}>
          <Checkbox name="departamentos"
            onChange={(e) => setDepartamentos(e.target.checked)}
            checked={departamentos}

          />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Departamentos
          </MDTypography>
        </MDBox>
        <MDBox sx={{ ml: 5 }}>
          <Checkbox name="estadotarea"
            onChange={(e) => setEstadoTarea(e.target.checked)}
            checked={estadotarea}

          />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Estado de Tarea
          </MDTypography>
        </MDBox>
        <MDBox>

          <Checkbox name="mnueventos"
             onChange={(e) => HandleMnuEvento(e)}
            checked={mnueventos || (evento || tipoevento)}

          />

          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Eventos
          </MDTypography>
        </MDBox>
        <MDBox sx={{ ml: 5 }}>

          <Checkbox name="evento"
            onChange={(e) => setEventos(e.target.checked)}
            checked={evento}

          />

          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Eventos de Tareas
          </MDTypography>
        </MDBox>
        <MDBox sx={{ ml: 5 }}>
          <Checkbox name="tipoevento"
            onChange={(e) => setTipoEventos(e.target.checked)}
            checked={tipoevento}

          />

          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Tipos de Eventos
          </MDTypography>
        </MDBox>

        <MDBox>

          <Checkbox name="mnuclientes"
            onChange={(e) => HandleMnuClientes(e)}
            checked={mnuclientes && mantenimientoclientes}

          />

          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Clientes
          </MDTypography>
        </MDBox>
        <MDBox sx={{ ml: 5 }}>

          <Checkbox name="mantenimientoclientes"
            onChange={(e) => setMantenimientoClientes(e.target.checked)}
            checked={mantenimientoclientes}

          />

          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Mantenimiento Clientes
          </MDTypography>


        </MDBox>
        <MDBox>

          <Checkbox name="mnuseguridad"
             onChange={(e) => HandleMnuSeguridad(e)}
            checked={mnuseguridad || (usuarios || perfiles || roles)}

          />

          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Seguridad
          </MDTypography>
        </MDBox>
        <MDBox sx={{ ml: 5 }}>

          <Checkbox name="usuarios"
            onChange={(e) => setUsuarios(e.target.checked)}
            checked={usuarios}

          />

          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Usuarios
          </MDTypography>


        </MDBox>
        <MDBox sx={{ ml: 5 }}>

          <Checkbox name="perfiles"
            onChange={(e) => setPerfiles(e.target.checked)}
            checked={perfiles}

          />

          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Perfiles
          </MDTypography>


        </MDBox>
        <MDBox sx={{ ml: 5 }}>

          <Checkbox name="roles"
            onChange={(e) => setRol(e.target.checked)}
            checked={roles}

          />

          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Roles
          </MDTypography>


        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton mt={4} mb={1}
            onClick={() => {
              handleSubmit();
            }}
            variant="gradient"
            color="warning"
            endIcon={<Save2Fill />}

            fullWidth
          >
            Grabar
          </MDButton>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default Permisos;
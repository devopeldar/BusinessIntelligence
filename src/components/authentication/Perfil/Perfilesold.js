import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el archivo CSS de Bootstrap
import { Link } from "react-router-dom";
import API_URL from "../../../config";
import axios from "axios";
import LSButton from "../../controls/Button/LSButton";
import MDBox from "../../controls/MDBox";
import MDTypography from "../../controls/MDTypography";
import { Grid } from "@mui/material";
import { Card } from "react-bootstrap";

const Perfiles = () => {
  const [perfiles, setPerfiles] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [idperfil, setidperfil] = useState(null);
  const [nombreperfil, setnombreperfil] = useState("");

  const handleDeleteClick = (id, nombre) => {
    // Mostrar el modal de confirmación

    setidperfil(id);
    setnombreperfil(nombre);
    setShowConfirmation(true);
    document.body.style.overflow = "hidden"; // Bloquear el scroll del body
  };
  const handleCancel = () => {
    // Cancelar la eliminación y ocultar el modal de confirmación
    setShowConfirmation(false);
    setidperfil(null);
    document.body.style.overflow = "auto"; // Habilitar el scroll del body nuevamente
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "/PerfilesGet", {
          headers: {
            accept: "application/json",
          },
        });
        setPerfiles(response.data);
      } catch (error) {
        setError(error);

        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      await fetch(API_URL + "/PerfilesDelete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idperfil: `${idperfil}` }),
      });

      setShowConfirmation(false);
      document.body.style.overflow = "auto"; // Habilitar el scroll del body nuevamente

      // Actualiza la lista de perfiles en el estado después de eliminar el perfil
      setPerfiles((prevPerfiles) =>
        prevPerfiles.filter((perfil) => perfil.idPerfil !== idperfil)
      );
    } catch (error) {
      console.error("Error al eliminar el perfil:", error);
    }
  };

  // return (
  //   <div></div>
    // <div className="container mt-4">
    //   <h2>Lista de Perfiles</h2>
    //   {/* <button type="button" as={Link} to="/Perfil" className="btn btn-success">Agregar Perfil</button> */}
    //   <Link to="/Perfil/PerfilAdd">
    //     <LSButton
    //       type="button"
    //       as={Link}
    //       to="/Perfil"
    //       className="btn btn-success"
    //       caption={"Agregar Perfil"}
    //     ></LSButton>
    //   </Link>
    //   <table className="table">
    //     <thead>
    //       <tr>
    //         <th>ID</th>
    //         <th>Nombre</th>
    //         <th>Activo</th>
    //         <th>Acciones</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {perfiles.map((perfil) => (
    //         <tr key={perfil.idPerfil}>
    //           <td>{perfil.idPerfil}</td>
    //           <td>{perfil.nombre}</td>
    //           <td>
    //             <input type="checkbox" checked={perfil.activo} readOnly />
    //           </td>

    //           <td>
    //             <Link
    //               to={`../../Perfil/PerfilEdit/${perfil.idPerfil}`}
    //               className="btn btn-primary me-2"
    //             >
    //               Modificar
    //             </Link>
    //             <button
    //               className="btn btn-danger"
    //               onClick={() =>
    //                 handleDeleteClick(perfil.idPerfil, perfil.nombre)
    //               }
    //             >
    //               Eliminar
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   {/* Modal de confirmación */}
    //   {showConfirmation && (
    //     // <div className="modal-overlay" style={{display: 'block', width: '600px', height: '200px', marginTop: '400px',marginLeft: '300px',}}>
    //     //   <div className="modal-content" >
    //     //   <div className="modal-header">
    //     <div className="modalconf-overlay">
    //       <div className="modalconf">
    //         <p className="modal-title">
    //           ¿Estás seguro de que deseas eliminar el perfil{" "}
    //           <b>{nombreperfil}</b>?
    //         </p>
    //         <div className="containernodal">
    //           <LSButton
    //             caption={"Eliminar"}
    //             type={"button"}
    //             className="buttonnodal btn btn-danger"
    //             onClick={handleConfirmDelete}
    //           ></LSButton>
    //           <LSButton
    //             caption={"Cancelar"}
    //             type={"button"}
    //             className="buttonnodal btn btn-success"
    //             onClick={handleCancel}
    //           ></LSButton>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
//   );
// };
// return {
//   <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Authors Table
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Projects Table
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns: pColumns, rows: pRows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   // columns: [
//   //   { Header: "author", accessor: "author", width: "45%", align: "left" },
//   //   { Header: "function", accessor: "function", align: "left" },
//   //   { Header: "status", accessor: "status", align: "center" },
//   //   { Header: "employed", accessor: "employed", align: "center" },
//   //   { Header: "action", accessor: "action", align: "center" },
//   // ],

//   // rows: [
//   //   {
//   //     author: "Seba",
//   //     function: "Manager" ,
//   //     status: (
//   //       "online"
//   //     ),
//   //     employed: (
//   //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//   //         23/04/18
//   //       </MDTypography>
//   //     ),
//   //     action: (
//   //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//   //         Edit
//   //       </MDTypography>
//   //     ),
//   //   }
//   // ],
// };
// return (
//   <DashboardLayout>
//     <DashboardNavbar />
//     <MDBox pt={6} pb={3}>
//       <Grid container spacing={6}>
//         <Grid item xs={12}>
//           <Card>
//             <MDBox
//               mx={2}
//               mt={-3}
//               py={3}
//               px={2}
//               variant="gradient"
//               bgColor="info"
//               borderRadius="lg"
//               coloredShadow="info"
//             >
//               <MDTypography variant="h6" color="white">
//                 Authors Table
//               </MDTypography>
//             </MDBox>
//             <MDBox pt={3}>
//               <DataTable
//                 table={{ columns, rows }}
//                 isSorted={false}
//                 entriesPerPage={false}
//                 showTotalEntries={false}
//                 noEndBorder
//               />
//             </MDBox>
//           </Card>
//         </Grid>
//     </MDBox>
//     <Footer />
//   </DashboardLayout>
// );

}
export default Perfiles;

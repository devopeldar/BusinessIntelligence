import axios from 'axios';
import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';

export default function  PerfilesGet () {
    const [perfiles, setPerfiles] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "/PerfilesGet", {
          headers: {
            accept: "application/json",
          },
        });
        setPerfiles(response.data);
      } catch (ex) {
        setError(ex);

        console.log(ex);
      }
    };

    fetchData();
  }, []);
  // Resto del código...
return {

    columns: [
        { Header: "author", accessor: "author", width: "45%", align: "left" },
        { Header: "function", accessor: "function", align: "left" },
        { Header: "status", accessor: "status", align: "center" },
        { Header: "employed", accessor: "employed", align: "center" },
        { Header: "action", accessor: "action", align: "center" },
      ],
    
      rows: perfiles
      //[
    //     {perfiles.map((perfil) => (

    //         ))}

    //     {
    //       author: "Seba",
    //       function: "Manager" ,
    //       status: (
    //         "online"
    //       ),
    //       employed: (
    //         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //           23/04/18
    //         </MDTypography>
    //       ),
    //       action: (
    //         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //           Edit
    //         </MDTypography>
    //       ),
    //     }
       
    //   ],
    };
}

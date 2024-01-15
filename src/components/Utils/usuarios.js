import { useEffect, useState } from "react";
import API_URL from "../../config";
import axios from "axios";

const Usuarios = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "/UsuarioListar", {
          headers: {
            accept: "application/json",
          },
        });
        
        setRows(response.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    fetchData();
  }, []); // El array de dependencias está vacío para que useEffect solo se ejecute una vez al montar el componente

  return rows;
};

export default Usuarios;


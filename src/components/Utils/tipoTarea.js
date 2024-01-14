import { useEffect, useState } from "react";
import API_URL from "../../config";
import axios from "axios";

const TipoTarea = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "/TareaTipoListar", {
          headers: {
            accept: "application/json",
          },
        });

        const data = response.data.map((tipoTarea) => ({
          idTareaTipo: tipoTarea.idTareaTipo,
          nombre: tipoTarea.nombre,
          activo: tipoTarea.activo,
        }));

        setRows(data);
      } catch (ex) {
        console.error(ex);
      }
    };

    fetchData();
  }, []); // El array de dependencias está vacío para que useEffect solo se ejecute una vez al montar el componente

  return rows;
};

export default TipoTarea;


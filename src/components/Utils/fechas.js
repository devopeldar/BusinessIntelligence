const obtenerFechaFormateada = (fecha) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    return fecha.toLocaleString("es-ES", options);
  };   
   export default obtenerFechaFormateada;
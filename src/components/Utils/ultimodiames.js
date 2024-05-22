

// Función para obtener el último día del mes
const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  export default getLastDayOfMonth;
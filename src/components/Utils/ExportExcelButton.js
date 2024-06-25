import React from 'react';
import { ExcelFile, ExcelSheet } from 'react-data-export';

import MDButton from '../controls/MDButton';

const ExportExcelButton = ({ data, sheetName, columns }) => {
  const formatDataForExport = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Mapea los datos según las columnas proporcionadas
    return data.map((item) => ({
      columns: columns.map((col) => ({
        title: col.label,
        value: item[col.accessor],
      })),
    }));
  };

  return (
    <ExcelFile element={<MDButton variant="contained" color="primary">Exportar a Excel</MDButton>}>
      <ExcelSheet data={formatDataForExport()} name={sheetName || 'Sheet'}>
        {columns.map((col, index) => (
          <ExcelColumn key={index} label={col.label} value={`columns[${index}].value`} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcelButton;
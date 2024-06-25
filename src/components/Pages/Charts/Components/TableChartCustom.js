import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, Pagination, Stack } from '@mui/material';
import MDBox from '../../../controls/MDBox';
import MDTypography from '../../../controls/MDTypography';
import { IconButton } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DataTable from '../../../controls/Tables/DataTable';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { DashboardCustomize, SettingsInputComponent } from '@mui/icons-material';
import { FileExcel } from 'react-bootstrap-icons';
import MDButton from '../../../controls/MDButton';
import ExcelJS from "exceljs";
import MDPagination from '../../../controls/MDPagination';
export default function TableChartCustom({ data, title, observaciones }) {
    const [srcTableData, setSrcTableData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [columnsData, setColumns] = useState([]);
    useEffect(() => {
        console.log("data table:", data);
        setSrcTableData(data);

        const transformedData = data.map((item, index) => ({
            id: index + 1, // Añadir un ID único a cada fila
            ...item
        }));
        setRows(transformedData);

        const keys = Object.keys(data[0]).filter(key => key !== 'titulo');
        const generatedColumns = keys.map(key => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            width: 150
        }));
        setColumns(generatedColumns);


    }, [data]);

     const columns = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'tipodeDato' && key !== 'titulo' && key !== 'id') : [];

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, srcTableData.length - page * rowsPerPage);

    // Función para exportar datos a Excel
    const exportToExcel = () => {
        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Datos");

        const headers = columnsData.map(column => column.field);
        // Definir el encabezado de las columnas
        // Agregar el encabezado a la hoja de cálculo
        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "CCCCCC" } // Gris claro
            };
        });

        // Agregar los datos al archivo Excel
        data.forEach((item) => {
            worksheet.addRow(item);

        });

        // Ajustar el ancho de las columnas según el contenido
        worksheet.columns.forEach((column, index) => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, (cell) => {
                const columnLength = cell.value ? cell.value.toString().length : 10;
                if (columnLength > maxLength) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 10 ? 10 : maxLength + 2; // Establecer el ancho mínimo de la columna
        });

        // Generar el archivo Excel y descargarlo
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = URL.createObjectURL(blob);

            // Crear un enlace de descarga para el archivo Excel y hacer clic automáticamente
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Reporte.xlsx");
            document.body.appendChild(link);
            link.click();

            // Limpiar el enlace y la URL después de la descarga
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
        });
    };



    return (
        <>
            <MDBox>
                <MDTypography variant="body2" style={{ marginTop: 5, textAlign: 'center', fontWeight: '900' }}>
                    {title}
                </MDTypography>
            </MDBox>
            <MDBox
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                   
                }}
            >
                <div style={{ width: '90%' }}>
                    <MDButton
                        onClick={() => {
                            exportToExcel();
                        }}
                        variant="gradient"
                        color="success"
                        endIcon={<FileExcel />}
                        text="contained"
                    >
                        Excel
                    </MDButton>
                    <TableContainer  sx={{ height: '600px' }}component={Paper}>
                        <Table>
                            <TableHead sx={{ display: 'contents' }}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column} sortDirection={orderBy === column ? order : false}> <TableSortLabel
                                            active={orderBy === column}
                                            direction={orderBy === column ? order : 'asc'}
                                            onClick={() => handleRequestSort(column)}
                                        >
                                            {column}
                                        </TableSortLabel></TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
                            {stableSort(srcTableData, getComparator(order, orderBy)).map((row, index) => (
                                
                                <TableRow key={index}>

                                    {columns.map((column, colIndex) => (
                                        <TableCell key={`${index}-${colIndex}`}>{row[column]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody> */}
                            <TableBody>
                                {stableSort(srcTableData, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <TableRow key={index}>
                                            {columns.map((column, colIndex) => (
                                                <TableCell key={`${index}-${colIndex}`}>{row[column]}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={columns.length} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <MDPagination
                        showFirstButton={true}
                        showLastButton={true}
                        count={srcTableData.length}
                        rowsPerPage={rowsPerPage}

                        page={page}
                        color='info'
                        onChange={handleChangePage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}


                        labelRowsPerPage="Registros por página"
                    />
                </div>
            </MDBox>
            <MDBox>
                <MDTypography variant="body2" style={{
                    marginTop: 5,
                    textAlign: 'center',
                    fontWeight: '100',
                    fontStyle: 'italic',
                    opacity: 0.7,
                }}>
                    *{observaciones}
                </MDTypography>
            </MDBox>
        </>
    );
}
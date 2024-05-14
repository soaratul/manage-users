import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@mui/material';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import { useDispatch } from 'react-redux';
import { setEditRow } from '../../store/user/actions';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'DESC'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable(props) {
  const dispatch = useDispatch();
  const {
    tableHeading,
    AddLink,
    headCells,
    FilterForm,
    rows,
    page,
    count,
    onPageChange,
    order,
    orderBy,
    rowsPerPage,
    onRowsPerPageChange,
    onRequestSort
  } = props;
  const [dense, setDense] = useState(false);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = rows.length ? false : true;

  const handleEditClick = (id) => {
    const rowdata = rows.find((row) => row.id === id);
    const editableRowData = rows.find((row) => row.id === id);
    console.log('SSSSSSSSS', editableRowData);
    console.log('KM ID-JI-2', id);
    console.log('KM ID-rows-2', rows);
    console.log('KM ID-data', editableRowData);
    // setEditingRowIndex(index);
    dispatch(setEditRow(editableRowData));
  };

  const handleSaveClick = () => {
    // setEditingRowIndex(null);
    // Here you can save the updated data to your backend or perform any other action
  };

  const handleCancelClick = () => {
    // setEditingRowIndex(null);
    // Here you can reset any changes made during editing
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          tableHeading={tableHeading}
          AddLink={AddLink}
          FilterForm={FilterForm}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
            />
            <TableBody>
              {rows.map((row, rowIndex) => {
                return (
                  <TableRow hover tabIndex={-1} key={`key-${rowIndex}`}>
                    {headCells.map((headCell, headCellIndex) => {
                      return (
                        <TableCell key={`cell-${headCellIndex}`} align='left'>
                          {row[headCell.id] ? row[headCell.id] : 'NA'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRows && (
                <TableRow>
                  <TableCell colSpan={Object.keys(headCells).length}>
                    No result
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 25, 50, 100]}
          component='div'
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          showFirstButton={true}
          showLastButton={true}
        />
      </Paper>
    </Box>
  );
}

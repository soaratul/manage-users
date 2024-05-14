import {
  Accordion,
  AccordionSummary,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import EnhancedTableHead from './EnhancedTableHead';
import styled from '@emotion/styled';

const StyledAccordionSummary = styled(AccordionSummary)({
  marginBottom: '0',
  pointerEvents: 'none',
  '& > .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'none !important'
  }
});

export default function SimpleTable(props) {
  const { tableHeading, headCells, rows, AddLink } = props;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = rows.length ? false : true;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Typography
          sx={{ flex: '1 1 100%', padding: 1 }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          {tableHeading}
          {AddLink}
        </Typography>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={'medium'}
          >
            <EnhancedTableHead headCells={headCells} />
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
      </Paper>
    </Box>
  );
}

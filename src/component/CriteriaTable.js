import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default function CriteriaTable(props) {

  const data_columns = [
    { name: 'Criteria', attribute: 'criterionName' },
    //  { name: 'Type', attribute: 'type' },
    { name: 'Weight' + ' (%)', attribute: 'weight' },
    { name: 'REMOVE' }
  ];


  return (
    <TableContainer component={Paper} >
      <Table aria-label="a dense table">
        <TableHead>
          <TableRow>
            {data_columns.map((column, idx) => (
              idx === 0 ?
                <TableCell key={column.name}>{column.name}</TableCell>
                :
                <TableCell align="center" key={column.name}>{column.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.rows.map((row, idx) => (
            <TableRow key={row.criterionName}>
              <TableCell component="th" scope="row">
                {row.criterionName}
              </TableCell>
              {/* check what is type  */}
              {/* <TableCell align="center">{row.type === 1 ? 'Cost' : 'Benefit'}</TableCell> */}
              <TableCell align="center">{row.weight}</TableCell>
              <TableCell align="center"><Button variant="contained" color="secondary"
                onClick={() => props.removeRow(idx)}>
                REMOVE </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
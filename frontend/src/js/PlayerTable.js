import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, age, position) {
  return { name, age, position };
}

const rows = [
  createData('Player1', 20, 'PositionA'),
  createData('Player2', 20, 'PositionA'),
  createData('Player3', 20, 'PositionA'),
  createData('Player4', 20, 'PositionB'),
  createData('Player5', 20, 'PositionB'),
  createData('Player6', 20, 'PositionB'),
  createData('Player7', 20, 'PositionC'),
  createData('Player8', 20, 'PositionC'),
  createData('Player9', 20, 'PositionC'),
  createData('Player10', 20, 'PositionD'),
  createData('Player11', 20, 'PositionE'),
];

export default function PlayerTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Player Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


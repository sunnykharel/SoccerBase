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

function createData(name, points) {
  return { name, points };
}

const rows = [
  createData('Team1', 1),
  createData('Team2', 3),
  createData('Team3', 5),
  createData('Team4', 7),
  createData('Team5', 9),
];

export default function TeamTable(props) {
  const classes = useStyles();
  console.log(props.table)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Team Name</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.table.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
              <a href={"http://www.soccerbase.appspot.com/Teams/"+(row.team_name+"").replace(' ', '%20')} > {row.team_name}</a>
              </TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


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

function createData(name, numTeams) {
  return { name, numTeams };
}

const rows = [
  createData('League1', 20),
  createData('League2', 30),
  createData('League3', 25),
];

export default function LeagueTable(props) {
  const classes = useStyles();
  console.log(props.table)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>League Name</TableCell>
            <TableCell align="right">League Type</TableCell>
            <TableCell align="right">Number of Teams</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.table.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">

                <a href={"http://www.soccerbase.appspot.com/Leagues/"+row.league_id+"_"+(row.name+"").replace(' ', '%20')} > {row.name}</a>
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.num_teams}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


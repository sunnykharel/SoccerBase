// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// function createData(name, numTeams) {
//   return { name, numTeams };
// }

// const rows = [
//   createData('League1', 20),
//   createData('League2', 30),
//   createData('League3', 25),
// ];

// export default function LeagueTable(props) {
//   const classes = useStyles();
//   console.log(props.table)

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} size="medium" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell>League Name</TableCell>
//             <TableCell align="right">League Type</TableCell>
//             <TableCell align="right">Number of Teams</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {props.table.map((row) => (
//             <TableRow key={row.name}>
//               <TableCell component="th" scope="row">

//                 <a href={"http://www.soccerbase.appspot.com/Leagues/"+row.league_id+"_"+(row.name+"").replace(' ', '%20')} > {row.name}</a>
//               </TableCell>
//               <TableCell align="right">{row.type}</TableCell>
//               <TableCell align="right">{row.num_teams}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'League Name', minWidth: 240 },
  { id: 'type', label: 'League Type', minWidth: 100, 
  },
  {
    id: 'num_teams',
    label: 'Number of Teams',
    minWidth: 170,
    align: 'right',
    
  },
];

function createData(name, type, num_teams) {
  return { name, type , num_teams};
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function PlayerTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.table.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if(column.id == "name"){
                      return (
                        <TableCell key={column.id} align={column.align}>
                    <a href={"http://www.soccerbase.appspot.com/Leagues/"+row.league_id+"_"+(row.name+"").replace(' ', '%20')} > {row.name}</a>                      
                      </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 25, 50]}
        component="div"
        count={props.table.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

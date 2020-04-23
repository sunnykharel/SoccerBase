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

// function createData(name, points) {
//   return { name, points };
// }

// const rows = [
//   createData('Team1', 1),
//   createData('Team2', 3),
//   createData('Team3', 5),
//   createData('Team4', 7),
//   createData('Team5', 9),
// ];

// export default function TeamTable(props) {
//   const classes = useStyles();
//   console.log(props.table)
//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Team Name</TableCell>
//             <TableCell align="right">Points</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {props.table.map((row) => (
//             <TableRow key={row.name}>
//               <TableCell component="th" scope="row">
//               <a href={"http://www.soccerbase.appspot.com/Teams/"+row.team_id+"_"+(row.team_name+"").replace(' ', '%20')} > {row.team_name}</a>
//               </TableCell>
//               <TableCell align="right">{row.points}</TableCell>
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
  { id: 'team_name', label: 'Team Name', minWidth: 240 },
  { id: 'venue_capacity', label: 'Capacity', minWidth: 100, 
  format: (value) => value.toLocaleString(),
  },
  {
    id: 'founded',
    label: 'Founded',
    minWidth: 170,
    align: 'right',
    
  },
];

function createData(team_name, venue_capacity, founded) {
  return { team_name, venue_capacity , founded};
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
  // for(let i=0; i<props.table.length; i++){
  //   props.table[i] = <a href={"http://www.soccerbase.appspot.com/Teams/"+props.team_id+"_"+(props.team_name+"").replace(' ', '%20')} > {props.team_name}</a>
  // }
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
                    if(column.id == "team_name"){
                      return (
                        <TableCell key={column.id} align={column.align}>
                      <a href={"http://www.soccerbase.appspot.com/Teams/"+row.team_id+"_"+(row.team_name+"").replace(' ', '%20')} > {row.team_name}</a>                          
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

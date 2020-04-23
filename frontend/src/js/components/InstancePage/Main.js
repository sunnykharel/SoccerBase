import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TeamTable from '../../TeamTable';
import PlayerTable from '../../PlayerTable';
import LeagueTable from '../../LeagueTable';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  root: {
    display: "flex",

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

export default function Main(props) {
  const classes = useStyles();
  // const { posts, title } = props;


  if(props.type == "team"){
    return (
      <Grid item xs={12} md={8}>
        <Typography variant="h5" gutterBottom>
          Player Table
         
        </Typography>
        <Divider /> 

        <PlayerTable/>  
        
        {/* <Table tableData = {props.tableData} col={props.col}/>
        also remove post.map stuff and i have to make the table*/}
      </Grid>
    );
  }

  else if(props.type == "country"){
    return (
      <Grid item xs={12} md={8}>
        <Typography variant="h5" gutterBottom>
          League Table
         
        </Typography>
        <Divider /> 

        <LeagueTable table = {props.table}/>  
        
        {/* <Table tableData = {props.tableData} col={props.col}/>
        also remove post.map stuff and i have to make the table*/}
      </Grid>
    );
  }

  else if(props.type == "league"){
    return (
      <Grid item xs={12} md={8}>
        <Typography variant="h5" gutterBottom>
          Team Table
         
        </Typography>
        <Divider /> 

        <TeamTable/>  
        
        {/* <Table tableData = {props.tableData} col={props.col}/>
        also remove post.map stuff and i have to make the table*/}
      </Grid>
    );
  }

  
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};

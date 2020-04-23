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
        <Typography variant="h6" gutterBottom>
          {props.title}
         
        </Typography>
        <Divider /> 
          <div>
  
          {console.log(props.element)}
          

          <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
        {<h5> Country: {props.element.country} </h5>}
          <img src={props.element.team_logo} />
        </Typography>
        
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  
          </div>
        
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

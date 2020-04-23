import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  //const { archives, description, social, title } = props;
  if(props.type == "team"){
  return (
    <Grid item xs={12} md={4}>
       <Typography variant="h5" gutterBottom>
          More Information
         
        </Typography>
       <Divider /> 
      <CardContent>
        <Typography variant="h5" component="h2">
          {<h5> Team Logo:</h5>}
          <img src={props.element.team_logo} />
          {<h5> Country: {props.element.country} </h5>}
          {<h5> Year Founded: {props.element.founded} </h5>}
          {<h5> League: {props.element.league_name} </h5>}
          {<h5> Venue City: {props.element.venue_city} </h5>}
          {<h5> Stadium Name: {props.element.venue_name} </h5>}
          {<h5> Type of Field: {props.element.venue_surface} </h5>}

        </Typography>
        
      </CardContent>
      
    </Grid>
  );
  }
  if(props.type == "country"){
    return (
      <Grid item xs={12} md={4}>
         <Typography variant="h5" gutterBottom>
            More Information
           
          </Typography>
         <Divider /> 
        <CardContent>
          <Typography variant="h5" component="h2">
            {<h5> Country Flag:</h5>}
            <img src={props.element.flag} />
            {<h5> Code: {props.element.code} </h5>}
            {<h5> Demonym: {props.element.demonym} </h5>}
            {<h5> Capital: {props.element.capital} </h5>}
            {<h5> Area: {props.element.area} </h5>}
            {<h5> Population: {props.element.population} </h5>}
            {<h5> Region: {props.element.region} </h5>}
            {<h5> Sub-Region: {props.element.subregion} </h5>}
          </Typography>
          
        </CardContent>
        
      </Grid>
    );
    }
    if(props.type == "league"){
      return (
        <Grid item xs={12} md={4}>
           <Typography variant="h5" gutterBottom>
              More Information
             
            </Typography>
           <Divider /> 
          <CardContent>
            <Typography variant="h5" component="h2">
              {<h5> League Logo:</h5>}
              <img src={props.element.logo} />
              {<h5> Country: {props.element.country} </h5>}
              {<h5> Country Code: {props.element.country_code} </h5>}
              {<h5> League Type: {props.element.type} </h5>}
              {<h5> Number of Teams: {props.element.num_teams} </h5>}
              {<h5> Season Start Date: {props.element.season_start} </h5>}
              {<h5> Season End Date: {props.element.season_end} </h5>}
              
    
            </Typography>
            
          </CardContent>
          
        </Grid>
      );
      }
      
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  title: PropTypes.string,
};

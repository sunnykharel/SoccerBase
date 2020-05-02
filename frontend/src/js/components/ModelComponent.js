import { Link } from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import ButtonBase from "@material-ui/core/ButtonBase";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
      },
      card: {
        maxWidth: 345
      },
      cardButton: {
        display: "block",
        textAlign: "initial"
      },
      media: {
        height: 200
      }
  });

export default function ModelComponent(props) {
    const classes = useStyles();

    return(
        <Grid item xs={4}>
        <Card className={classes.card} >
        <ButtonBase className={classes.cardButton} component = {Link} to={props.info.modelPageLink}>
            <CardMedia
            className={classes.media}
            image={props.info.modelImage}
            title={props.info.modelName}
            />
            <CardContent>
            <Typography variant="headline" component="h2">
                {props.info.modelName}
            </Typography>
            </CardContent>
        </ButtonBase>
        <CardActions>
            <Button size="small" color="primary">
            {props.info.modelName1}
            </Button>
            <Button size="small" color="primary">
            {props.info.modelName2}
            </Button>
        </CardActions>
        </Card>
        </Grid>
        );   
}

ModelComponent.defaultProps = {
    modelPageLink : "",
    modelImage: "",
    modelName: "modelName",
    modelName1:"modelName1",
    modelName2:"modelName2",
    modelLink1:"Link1",
    modelLink2:"link2"    
}

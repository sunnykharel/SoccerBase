import Link from '@material-ui/core/Link'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
    //   maxWidth: 345,
    },
  });

export default function ModelComponent(props) {
    const classes = useStyles();
    
    return(
        <Card className={classes.root}>
        <Link to= {props.modelPageLink}>
        <CardActionArea>
            <CardMedia
            component="img"
            alt="image does not exist"
            height="140"
            image={props.modelImage}
            title={props.modelName}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {props.modelName}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Link>
        <CardActions>
            <Button size="small" color="primary">
            {props.modelLink1}
            </Button>
            <Button size="small" color="primary">
            {props.modelLink2}
            </Button>
        </CardActions>
        </Card>
        );
    
}

// ModelComponent.defaultProps = {
//     modelPageLink : "",
//     modelImage: "",
//     modelName: "",
//     modelName1:"",
//     modelName2:"",
//     modelLink1:"",
//     modelLink2:""    
// }




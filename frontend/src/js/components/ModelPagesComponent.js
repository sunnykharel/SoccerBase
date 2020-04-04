import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ModelComponent from './ModelComponent'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
//Props into this function should be the list of things you are Making components of and how many instances per row/ page
export default function ModelPagesComponent(props) {
  const classes = useStyles();
  //pass in the elements of the row into props
  function FormRow(props) {
    return (
      <React.Fragment>
        {props.modelInstancesSlice.map((modelInstance) => {
            return (
                <ModelComponent props = {
                    {
                        modelPageLink : modelInstance.modelPageLink,
                        modelImage: modelInstance.modelImage,
                        modelName: modelInstance.modelName,
                        modelLink1:modelInstance.modelLink1,
                        modelLink2:modelInstance.modelLink2
                    }
                }/>
            );
        })}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={4}>
          <FormRow modelInstancesSlice = {props.modelInstances.slice(0,4)}/>
        </Grid>
        <Grid container item xs={12} spacing={4}>
          <FormRow modelInstancesSlice ={props.modelInstances.slice(4,8)} />
        </Grid>
        <Grid container item xs={12} spacing={4}>
          <FormRow modelInstancesSlice = {props.modelInstances.slice(8,12)} />
        </Grid>
      </Grid>
    </div>
  );
}


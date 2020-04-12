import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InstancePage from './components/InstancePage/InstancePage';

// import './App.css';

class LeagueInstance extends Component {
    constructor(props){
        super(props)
        props.setIsHidden(true)
        this.state = {
            responses_arrays : Array(514).fill(""),
            i: 0, 
            function: props.setIsHidden,
        }
    }
    componentDidMount() {
        /*
        get news data here and update state

        */
        const id = this.props.match.params.id
        //var i;
        const scopez = this;
        axios.get('https://still-waters-10895.herokuapp.com/getallleagues')
        .then(function (res) {
            console.log(id)
            console.log(res)
            scopez.setState({
                responses_arrays: res.data.leagues_list.slice(0, res.data.leagues_list.length),
            }); 
        })
        
    }

    render(){

        //var i;
        for(let indx = 0; indx < this.state.responses_arrays.length; indx++ ){
            if(this.props.match.params.id == this.state.responses_arrays[indx].league_id){
                this.state.i = indx;
                break;
            }
        }
        const useStyles = makeStyles({
            root: {
              maxWidth: 345,
            },
          });

        let sections = [
            { title: 'Home', url: '#' },
            { title: 'Teams', url: '#' },
            { title: 'Schedule', url: '#' },
          ]

        /*
          update this with actual news
        */
        let title = this.state.responses_arrays[this.state.i].name

        let mainHeadline = {
            title: "Main news headline for "+ title ,
            description:
                "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
            image: 'https://source.unsplash.com/random',
            imgText: 'main image description',
            linkText: 'Continue reading…',
        }

        /*
            Update this with actual featured posts

        */

        let featuredHeadline = [
            {
              title: 'Featured post',
              date: 'Nov 12',
              description:
                'This is a wider card with supporting text below as a natural lead-in to additional content.',
              image: 'https://source.unsplash.com/random',
              imageText: 'Image Text',
            },
            {
              title: 'Post title',
              date: 'Nov 11',
              description:
                'This is a wider card with supporting text below as a natural lead-in to additional content.',
              image: 'https://source.unsplash.com/random',
              imageText: 'Image Text',
            },
          ];


        return (   
            <InstancePage featuredPosts = {featuredHeadline} mainFeaturedPost = {mainHeadline} title = {title}   
                sections = {sections} />


            //<h1>{this.state.i} </h1>
            
           // <h1>{this.state.responses_arrays[0].name}</h1>
    //         <Card id="LeagueCard">
    //      <CardActionArea>
    //      <Typography gutterBottom variant="h5" component="h2">
    //          League name: {this.state.responses_arrays[this.state.i].name}
    //       </Typography>
          
    //     <Typography gutterBottom variant="h5" component="h2">
    //          Country name: {this.state.responses_arrays[this.state.i].country}({this.state.responses_arrays[this.state.i].country_code})
    //       </Typography>
    //       <Typography gutterBottom variant="h5" component="h2">
    //          Season start date: {this.state.responses_arrays[this.state.i].season_start}
    //       </Typography>
    //       <Typography gutterBottom variant="h5" component="h2">
    //       League Logo:
    //       </Typography>
    //       <img src = {this.state.responses_arrays[this.state.i].logo} alt="no image found"/>
    //   </CardActionArea>
    // </Card>
            
        );
    }


    // componentWillUnmount() {
    //     this.state.setIsHidden(false)
    // }

  
}

export default withRouter(LeagueInstance);
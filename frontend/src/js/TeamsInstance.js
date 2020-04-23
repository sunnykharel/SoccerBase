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

class TeamsInstance extends Component {
    constructor(props){
        super(props)
        props.setIsHidden(true)
        this.state = {
            table_arrays: Array(4).fill({}),
            table_arrays1: Array(4).fill({}),
            table_arrays2: Array(4).fill({}),
            responses_arrays : Array(2000).fill(""),
            news_arrays: Array(3).fill(""),
            i: 0, 
            function: props.setIsHidden,
            identitooooo_lasagna_muthafucka: props.match.params.id,
        }
    }
    componentDidMount() {
        /*
        get news data here and update state

        */
        const id = parseInt(this.state.identitooooo_lasagna_muthafucka.split('_')[0])
        const team_name = this.state.identitooooo_lasagna_muthafucka.split('_')[1].replace("%20", " ");
        //var i;
        const scopez = this;
        axios.get('https://still-waters-10895.herokuapp.com/getallteams')
        .then(function (res) {
            console.log(id)
            console.log(res)
            scopez.setState({
                responses_arrays: res.data.teams_list.slice(0, res.data.teams_list.length),
            }); 
        })
        axios.get('https://still-waters-10895.herokuapp.com/getnews/' + team_name)
        .then(function (resp) {

            console.log(resp.data)
            //works until here
            scopez.setState({
                 news_arrays: resp.data.slice(0, resp.data.length),
            }); 
        })    
        axios.get("https://api-football-v1.p.rapidapi.com/v2/players/squad/"+id+"/2019-2020" , {
            headers:{
                'X-RapidAPI-Key-Host': "api-football-v1.p.rapidapi.com",
                'X-RapidAPI-Key': "c114e8403emsh6c4e6c8d45757cbp131072jsn941330efea5f"
            }
        })
        .then(function (respo) {

           // console.log(respo.data)
            //works until here
            scopez.setState({
                 table_arrays1: respo.data.api.players.slice(0, respo.data.api.players.length),
            }); 
        })
        axios.get("https://api-football-v1.p.rapidapi.com/v2/players/squad/"+id+"/2019" , {
                headers:{
                    'X-RapidAPI-Key-Host': "api-football-v1.p.rapidapi.com",
                    'X-RapidAPI-Key': "c114e8403emsh6c4e6c8d45757cbp131072jsn941330efea5f"
                }
            })
            .then(function (respo) {
    
               // console.log(respo.data)
                //works until here
                scopez.setState({
                     table_arrays2: respo.data.api.players.slice(0, respo.data.api.players.length),
                });
            });  

        
        }
    
    render(){

        //var i;
       // console.log(this.state.responses_arrays[0].team_name);
       // console.log(this.props.match.params.id)
        var key = (parseInt(this.props.match.params.id.split('_')[0]))
        for(let indx = 0; indx < this.state.responses_arrays.length; indx++ ){
            //console.log(this.state.id)
            if(key == this.state.responses_arrays[indx].team_id){
                this.state.i = indx;
               // console.log("yo")
                break;
                
            }
        }

        const useStyles = makeStyles({
            root: {
              maxWidth: 345,
            },
          });
        
        //   var titleX = this.state.responses_arrays[this.state.i].team_name
        //   console.log(titleX)

          const defaultheadline = {
            title: "No news found",
            description:"No description found",
            image: "No image found",
            imgText: '',
            linkText: "#",
          }
          let mainHeadline = defaultheadline;
          let featuredHeadline = [defaultheadline, defaultheadline];
          if(this.state.news_arrays.length >= 1){
            mainHeadline = {
              title:  this.state.news_arrays[0].title,
              description:this.state.news_arrays[0].description,
              image: this.state.news_arrays[0].urlToImage,
              imgText: 'main image description',
              linkText: this.state.news_arrays[0].url,
          }
        }
        if(this.state.news_arrays.length >= 2){
            featuredHeadline[0] ={
                title: this.state.news_arrays[1].title,
                date: this.state.news_arrays[1].publishedAt,
                description:this.state.news_arrays[1].description,
                image: this.state.news_arrays[1].urlToImage,
                imageText: 'Image Text',
                linkText: this.state.news_arrays[1].url,
            }
        }
        if(this.state.news_arrays.length >= 3){
            featuredHeadline[1] ={
                title: this.state.news_arrays[2].title,
                date: this.state.news_arrays[2].publishedAt,
                description:this.state.news_arrays[2].description,
                image: this.state.news_arrays[2].urlToImage,
                imageText: 'Image Text',
                linkText: this.state.news_arrays[2].url,
            }
        }
          
            let sections = [
                { title: ''},
                { title: 'Latest News', url: "#"},
                { title: '' },
              ]    
           
        var tablez= []
        if(this.state.table_arrays1>this.state.table_arrays2){
            tablez=this.state.table_arrays1
        }else{
            tablez=this.state.table_arrays2
        }
        //console.log(tablez)
        // console.log("hello")
        // console.log(this.state.i)

        return (   
            <InstancePage featuredPosts = {featuredHeadline} mainFeaturedPost = {mainHeadline} title = {this.props.match.params.id.split('_')[1]}   
                sections = {sections} table = {tablez} type = {"team"} element = {this.state.responses_arrays[this.state.i]} />
        );
    }


    // componentWillUnmount() {
    //     this.state.setIsHidden(false)
    // }

  
}

export default withRouter(TeamsInstance);

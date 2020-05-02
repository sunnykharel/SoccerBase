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
            league_json: {},
            news_arrays: Array(3).fill(""),
            table_arrays: Array(200).fill(""),
            function: props.setIsHidden,
            theId: props.match.params.id,
        }
    }
    componentDidMount() {
        /*
        get news data here and update state

        */

        const id = parseInt(this.state.theId.split('_')[0])
        const league_name = this.state.theId.split('_')[1].replace("%20", " ");
        const scopez = this;
        axios.get('https://still-waters-10895.herokuapp.com/getallleagues')
        .then(function (res) {

            scopez.setState({
                responses_arrays: res.data.leagues_list.slice(0, res.data.leagues_list.length),
            }); 
        })
        axios.get('https://still-waters-10895.herokuapp.com/getnews/' + league_name)
        .then(function (resp) {

   
            //works until here
            scopez.setState({
                 news_arrays: resp.data.slice(0, resp.data.length),
            }); 
        })
        axios.get('https://still-waters-10895.herokuapp.com/team', {
          params: {
            league_id:{
              "exact":  id
            }
          }
        })
        .then(function (respo) {


            scopez.setState({
                 table_arrays: respo.data.teams_list.slice(0, respo.data.teams_list.length),
            }); 
        })
    }

    render(){

      var key = (parseInt(this.props.match.params.id.split('_')[0]))
        for(let indx = 0; indx < this.state.responses_arrays.length; indx++ ){
          if(this.state.responses_arrays){
            if(key == this.state.responses_arrays[indx].league_id){
              this.state.i = indx;;
                break;
            }
          }
      }
       
        const useStyles = makeStyles({
            root: {
              maxWidth: 345,
            },
          });
          const defaultheadline = {
            title: "No news found",
            description:"No description found",
            image: "No image found",
            imgText: '',
            linkText: "#",
          }
           //change array size to match expected news article size
           let mainHeadline = defaultheadline;
           let featuredHeadline = new Array(2).fill(defaultheadline);
 
           for(let a = 0; a < this.state.news_arrays.length; a++){
             if(a == 0){
                 mainHeadline = {
                     title:  this.state.news_arrays[0].title,
                     description:this.state.news_arrays[0].description,
                     image: this.state.news_arrays[0].urlToImage,
                     imgText: 'main image description',
                     linkText: this.state.news_arrays[0].url,
             }
         }
             else{
                 featuredHeadline[a-1] = {
                     title: this.state.news_arrays[a-1].title,
                     date: this.state.news_arrays[a-1].publishedAt,
                     description:this.state.news_arrays[a-1].description,
                     image: this.state.news_arrays[a-1].urlToImage,
                     imageText: 'Image Text',
                     linkText: this.state.news_arrays[a-1].url,
                 }
             }
 
           }
        let sections = [
          { title: ''},
          { title: 'Latest News', url: "#"},
          { title: '' },
        ]    
        /*
          update this with actual news
        */

       return (   
        <InstancePage featuredPosts = {featuredHeadline} mainFeaturedPost = {mainHeadline} title = {this.props.match.params.id.split('_')[1]}   
            sections = {sections} table ={this.state.table_arrays} type = {"league"} element = {this.state.responses_arrays[this.state.i]} />
    );

    }
  
}

export default withRouter(LeagueInstance);

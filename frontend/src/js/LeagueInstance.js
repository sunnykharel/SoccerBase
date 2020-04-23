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
        var league_JSONNZ = {}
        console.log(this.props.fuckYeah)
        for(let indx = 0; indx < props.fuckYeah.length; indx++ ){
          if(props.match.params.id ==  props.fuckYeah[indx].league_id.toString(10)){
              league_JSONNZ = props.fuckYeah[indx];
              break;
          }
      }
      console.log(league_JSONNZ)
        
        this.state = {
            responses_arrays : Array(514).fill(""),
            i: 0, 
            league_JSON: league_JSONNZ,
            news_arrays: Array(3).fill(""),
            table_arrays: Array(200).fill(""),
            function: props.setIsHidden,
        }
    }
    componentDidMount() {
        /*
        get news data here and update state

        */
        const id = this.props.match.params.id
        const league_name = this.state.league_JSON.name;
        const scopez = this;
        // axios.get('https://still-waters-10895.herokuapp.com/getallleagues')
        // .then(function (res) {
        //     console.log(id)
        //     console.log(res)
        //     scopez.setState({
        //         responses_arrays: res.data.leagues_list.slice(0, res.data.leagues_list.length),
        //     }); 
        // })
        axios.get('https://still-waters-10895.herokuapp.com/getnews/' + league_name)
        .then(function (resp) {

            console.log(resp.data)
            //works until here
            scopez.setState({
                 news_arrays: resp.data.slice(0, resp.data.length),
            }); 
        })
        axios.get('https://still-waters-10895.herokuapp.com/team', {
          params: {
            league_id:{
              "exact": id
            }
          }
        })
        .then(function (respo) {

            console.log(respo.data)
            //works until here
            scopez.setState({
                 table_arrays: respo.data.leagues_list.slice(0, respo.data.length),
            }); 
        })
    }

    render(){

        //var i;
       
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
        /*
          update this with actual news
        */

       return (   
        <InstancePage featuredPosts = {featuredHeadline} mainFeaturedPost = {mainHeadline} title = {this.props.match.params.id}   
            sections = {sections} table ={this.state.table_arrays} type = {"league"} element = {this.state.league_JSON} />
    );

    }


    // componentWillUnmount() {
    //     this.state.setIsHidden(false)
    // }

  
}

export default withRouter(LeagueInstance);
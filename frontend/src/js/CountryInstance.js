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
import TeamTable from './TeamTable';


class CountryInstance extends Component {
    constructor(props){
        super(props)
        props.setIsHidden(true)
        this.state = {
            responses_arrays : Array(2000).fill(""),
            news_arrays: Array(3).fill(""),
            table_arrays: Array(100).fill(""),
            i: 0, 
            function: props.setIsHidden,
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        //var i;
        const scopez = this;
        axios.get('https://still-waters-10895.herokuapp.com/getallcountries')
        .then(function (res) {
            console.log(id)
            console.log(res)
            scopez.setState({
                responses_arrays: res.data.countries_list.slice(0, res.data.countries_list.length),
            }); 
        })
        axios.get('https://still-waters-10895.herokuapp.com/getnews/' + id)
        .then(function (resp) {

            console.log(resp.data)
            //works until here
            scopez.setState({
                 news_arrays: resp.data.slice(0, resp.data.length),
            }); 
        })
        axios.get('https://still-waters-10895.herokuapp.com/league?', {
          params: {
            country:{
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

      //var key = (parseInt(this.props.match.params.id.split('_')[0]))
        for(let indx = 0; indx < this.state.responses_arrays.length; indx++ ){
            if(this.props.match.params.id == this.state.responses_arrays[indx].name){
                this.state.i = indx;
                break;
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
            

              console.log(this.state.responses_arrays)

            console.log(this.state.i)

            console.log(this.state.responses_arrays[this.state.i])

            return (   
              <InstancePage featuredPosts = {featuredHeadline} mainFeaturedPost = {mainHeadline} title = {this.props.match.params.id}   
                  sections = {sections} table ={this.state.table_arrays} type = {"country"} element = {this.state.responses_arrays[this.state.i]} />
          );
    }

    // componentWillUnmount() {
    //     this.state.setIsHidden(false)
    // }

  
}

export default withRouter(CountryInstance);
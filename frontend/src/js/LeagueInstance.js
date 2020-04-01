import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
// import './App.css';

class LeagueInstance extends Component {
    constructor(props){
        super(props)
        props.setIsHidden(true)
        this.state = {
            responses_arrays: ["Saab", "Volvo", "BMW"]  
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        const scopez = this;
        axios.get('https://still-waters-10895.herokuapp.com/getallleagues')
        .then(function (res) {
            console.log(res.data.leagues_list)
            scopez.setState({
                responses_arrays: res.data.leagues_list.slice(0, res.data.leagues_list.length),
            }); 
        })

        // var httpCommits = new XMLHttpRequest();
        // var urlCommits = "https://api.github.com/repos/sunnykharel/SoccerBase/stats/commit_activity";  
        // httpCommits.open("GET",urlCommits, true);
        // httpCommits.setRequestHeader("Authorization", "Basic " + btoa("grewalparm:Verybadpassword1!"));
        // httpCommits.onload = function(){
        // if (this.status == 200){
        //     var commits = JSON.parse(httpCommits.responseText);
        //     var totalCommits_ = 0;
        //     for (let i = 0; i < commits.length; i++) {
        //         totalCommits_ += commits[i].total;
        //     }
        //     scope.setState({
        //     totalCommits: totalCommits_,
        //     });
        // }
        // else {
        //     console.warn("Let's assume this works");
        // }
        // }
        // httpCommits.send();


    }
    render(){
        return (   
            <h1> {this.state.responses_arrays[0].name}</h1>
        )
    }
  
}

export default withRouter(LeagueInstance);

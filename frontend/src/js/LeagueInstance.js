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
            responses_arrays : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "","", "", "", "", "", "", "", "", "", ""], 
            i: 0, 
            function: props.setIsHidden,
        }
    }
    componentDidMount() {
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
         for(this.state.i = 0; this.state.i < this.state.responses_arrays.length; this.state.i++ ){
             if(this.props.match.params.id == this.state.responses_arrays[this.state.i].league_id){
                 break;
             }
         }
        //console.log(typeof this.state.i);
        
        return (   
           // <h1>{this.state.i} </h1>
            <h1>{this.state.responses_arrays[this.state.i].name}</h1>
        )
    }


    // componentWillUnmount() {
    //     this.state.setIsHidden(false)
    // }

  
}

export default withRouter(LeagueInstance);

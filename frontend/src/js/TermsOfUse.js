import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import TeamsInstance from './TeamsInstance'
// import './App.css';


function TermsOfUse({match}) {
            return (
                <div style={{backgroundColor : "#BA55D3", paddingTop : "10px",  paddingBottom : "600px"}}>
                    
                   <h1>Terms Of Use </h1>
                   <hr/>
                   <p>
As developers of SoccerBase, we are proud to present all of our data and soccer statistics to fans of the sport. All of the data and statistics displayed on this webpage are not proprietary material; all data on this website is free of charge for personal usage and proprietary usage with reference to our original website.</p>
                </div>
            );
        }



export default TermsOfUse;
import React from 'react';
import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'

// import './aboutUs.css'
import Barcelona from './Barcelona'
import RealMadrid from './RealMadrid'
import AtleticoMadrid from './AtleticoMadrid'


const Teams = () => {
    return (
       <div style={{backgroundColor : "#90EE90", paddingTop: "10px" , paddingBottom : "600px"}}>
                 
        <h1> Teams here:</h1>
        
        <BrowserRouter>

            <ul>
            <li ><NavLink to='./Barcelona'>Barcelona</NavLink></li>
            <li><NavLink to='./RealMadrid'>Real Madrid</NavLink></li>
            <li><NavLink to='./AtleticoMadrid'>Atletico Madrid</NavLink></li>
            </ul>
            <Switch>
                <Route path="/Barcelona" component={Barcelona} exact />
                <Route path="/RealMadrid" component={RealMadrid} exact />
                <Route path="/AtleticoMadrid" component={AtleticoMadrid} exact />

            </Switch>
        
        </BrowserRouter>
        
        

       </div>
        
    );
}
 
export default Teams;
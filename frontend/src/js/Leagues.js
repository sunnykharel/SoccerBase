import React from 'react';
import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'

// import './aboutUs.css'
import LaLiga from './LaLiga'
import MLS from './MLS'
import BPL from './BPL'

const Leagues = () => {
    return (
       <div style={{backgroundColor : "#BA55D3", paddingTop : "10px",  paddingBottom : "600px"}}>
                 
            <h1> Leagues here:</h1>


            <BrowserRouter>

            <ul>
            <li ><NavLink to='./LaLiga'>La Liga</NavLink></li>
            <li><NavLink to='./MLS'>MLS</NavLink></li>
            <li><NavLink to='./BPL'>BPL</NavLink></li>
            </ul>
            <Switch>
                <Route path="/LaLiga" component={LaLiga} exact />
                <Route path="/MLS" component={MLS} exact />
                <Route path="/BPL" component={BPL} exact />

            </Switch>
        
        </BrowserRouter>
          
       </div>
        
    );
}
 
export default Leagues;
import React from 'react';
import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'

// import './aboutUs.css'
import Messi from './Messi'
import Ronaldo from './Ronaldo'
import Neymar from './Neymar'

const Players = () => {
    return (
       <div style={{backgroundColor : "#FF6347", paddingTop : "10px",  paddingBottom : "600px"}}>
                 
            <h1> Players here:</h1>
          
        <BrowserRouter>

            <ul>
            <li ><NavLink to='./Messi'>Messi</NavLink></li>
            <li><NavLink to='./Ronaldo'>Ronaldo </NavLink></li>
            <li><NavLink to='./Neymar'>Neymar</NavLink></li>
            </ul>
            <Switch>
                <Route path="/Messi" component={Messi} exact />
                <Route path="/Ronaldo" component={Ronaldo} exact />
                <Route path="/Neymar" component={Neymar} exact />

            </Switch>
        
        </BrowserRouter>

       </div>
        
    );
}
 
export default Players;
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Link} from 'react-router-dom'
import aboutUs from './aboutUs'
import Home from './Home'
import Teams from './Teams'
import Leagues from './Leagues'
import Players from "./Players"
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../css/App.css'
import { render } from '@testing-library/react';
import SoccerBaseNavBar from './components/Navbar';


class App extends Component {
  render() {
    return (
      
        <BrowserRouter>
          <div>
          <SoccerBaseNavBar /> 
             <Switch>
                <Route path="/" component={Home} exact/>
                <Route path ="/Teams" component={Teams}/>
                <Route path ="/Leagues" component={Leagues}/>
                <Route path ="/Players" component={Players}/>
                <Route path="/aboutUs" component={aboutUs}/>
            </Switch> 
          </div>  
        </BrowserRouter>
         
    );
  }
}

export default App;

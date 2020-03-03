import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Link} from 'react-router-dom'
import aboutUs from './aboutUs'
import Home from './Home'
import Teams from './Teams'
import Leagues from './Leagues'
import Players from "./Players"


import Navbar from './components/Navbar';
import { render } from '@testing-library/react';
import BackgroundCarousel from './backgroundCarousel'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="App">
          <Navbar />
          <Switch>
             <Route path="/" component={Home} exact/>
             <Route path ="/Teams" component={Teams}/>
             <Route path ="/Leagues" component={Leagues}/>
             <Route path ="/Players" component={Players}/>
             <Route path="/aboutUs" component={aboutUs}/>
             
            {/* <Route component={Error}/> */}
           </Switch>
        </div>
        {/* <BackgroundCarousel /> */}
      </BrowserRouter>
      
    );
  }
}

export default App;

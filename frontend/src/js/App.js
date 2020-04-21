import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Link} from 'react-router-dom'
import aboutUs from './aboutUs'
import Home from './Home'
import Teams from './Teams'
import Leagues from './Leagues'
import Countries from "./Countries"
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../css/App.css'
import { render } from '@testing-library/react';
import SoccerBaseNavBar from './components/Navbar';
import TermsOfUse from './TermsOfUse';
import CssBaseline from '@material-ui/core/CssBaseline';
import InstancePage from './components/InstancePage/InstancePage';
import Search from './components/Search'

class App extends Component {
  render() {
    return (
      
        <BrowserRouter>
          <React.Fragment>
            <CssBaseline />
          <SoccerBaseNavBar />
             <Switch>
                <Route path="/" component={Home} exact/>
                <Route path ="/Teams" component={Teams}/>
                <Route path ="/Leagues" component={Leagues}/>
                <Route path ="/Countries" component={Countries}/>
                <Route path ="/TermsOfUse" component={TermsOfUse}/>
                <Route path="/aboutUs" component={aboutUs}/>
                <Route path="/InstancePage" component={InstancePage}/>
                <Route path="/search" component={Search}/>
                {/* <Route path="/Leagues/:id" component={<PostPage/>}/> */}
                {/* <Route path="/result" component={Result}/> */}

            </Switch> 
          </React.Fragment> 
        </BrowserRouter>
         
    );
  }
}

export default App;

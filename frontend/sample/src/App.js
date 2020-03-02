import React, {Component} from 'react';
import {BrowserRouter } from 'react-router-dom'
import {Link} from 'react-router-dom'

// import logo from './logo.svg';
// import './App.css';

import Navbar from './components/Navbar';
import { render } from '@testing-library/react';
import BackgroundCarousel from './backgroundCarousel'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="App">
          <Navbar />
        </div>
        {/* <BackgroundCarousel /> */}
      </BrowserRouter>
      
    );
  }
}

export default App;

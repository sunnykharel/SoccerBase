import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import * as serviceWorker from './js/serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './js/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';


ReactDOM.render(
    <Router>
      {/* <ThemeProvider theme={theme}> */}
        <App />
        
      {/* </ThemeProvider> */}
    </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

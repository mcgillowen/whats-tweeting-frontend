import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../containers/Home/Home.jsx';
import Login from '../containers/Login/Login.jsx';
import Menu from '../containers/Menu/Menu.jsx';


export default class AppRouter extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={Menu}/>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login} />
        </div>
      </Router>
    );
  }
}

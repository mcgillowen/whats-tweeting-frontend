import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import isLoggedIn from './authorisation.js';

import Home from '../containers/Home/Home.jsx';
import Login from '../containers/Login/Login.jsx';


class AppRouter extends Component {

  checkAuthorized(nextState, replace) {
    if ( !isLoggedIn() ) {
      replace({pathname: '/login'});
    }
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/login' component={Login} />
      </Router>
    );
  }
}

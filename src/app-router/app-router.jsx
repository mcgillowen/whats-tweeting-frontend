import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import isLoggedIn from './authorisation.js';


class AppRouter extends Component {

  checkAuthorized(nextState, replace) {
    if ( !isLoggedIn() ) {
      replace({pathname: '/login'});
    }
  }

  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/'>
          <IndexRoute component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/app' onEnter={this.checkAuthorized}>
            <Route path='/profile/:id'>
              <IndexRoute component={Profile} />
              <Route path='/update-info' component={UpdateProfile} />
              <Route path='/word-clouds' component={WordcloudsProfile} />
            </Route>
            <Route path='/word-clouds'>
              <IndexRoute component={Wordclouds} />
              <Route path='/search' component={WordcloudsSearch} />
              <Route path='/:id' component={WordcloudsDisplay} />
              <Route path='/generate' component={WordcloudsGenerate} />
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
}

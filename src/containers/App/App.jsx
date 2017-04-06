import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
//import './App.css';

import Home from '../Home/Home.jsx';
import Login from '../Login/Login.jsx';
import ProfileClouds from '../ProfileClouds/ProfileClouds.jsx';

export default class App extends Component {

  state = {
    authenticated: true,
    id: 1
  }

  changeAuth = (e) => {
    this.setState({authenticated: !this.state.authenticated});
  };

  render() {
    return (
      <Router>
        <div id="logged-in-pond">
          <div id="menu">
            <div>
              <img alt="" src={'images/logo.png'} />
            </div>

            <ul className="parent-menu">
              <li> <a href="#">Word Clouds</a>
                <ul>
                  <li><a href="#" id="WordcloudsSearch">Search</a></li>
                  <li><a href="#" id="WordcloudsGenerate">Generate</a></li>
                </ul>
              </li>
              <li> <a href="#">About</a></li>
              <li> <a>My Profile</a>
                <ul>
                  <li><Link to={`/profile/${this.state.id}`}>View Saved</Link></li>
                </ul>
              </li>
              <li> <a href="#">Help</a></li>
              <li> <a href="#">Log Out</a></li>
            </ul>
            <button onClick={this.changeAuth}>Click me</button>
          </div>


          <div id="container">
            <Route exact path='/' render={(match) => {
              return this.state.authenticated ? (<Home/>) : (<Redirect to='/login'/>)
            }}/>
            <Route path='/login' component={Login}/>
            <Route path='/profile/:id' component={ProfileClouds} />
          </div>
        </div>
      </Router>
    );
  }
}

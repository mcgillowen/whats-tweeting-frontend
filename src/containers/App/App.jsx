import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import jwt from 'jwt-decode';

import Home from '../Home/Home.jsx';
import Login from '../Login/Login.jsx';
import Help from '../Help/Help.jsx';
import WordCloudsGenerate from '../WordCloudsGenerate/WordCloudsGenerate.jsx';
import WordCloudsSearch from '../WordCloudsSearch/WordCloudsSearch.jsx';
import ProfileClouds from '../ProfileClouds/ProfileClouds.jsx';
import ResultPage from '../ResultPage/ResultPage.jsx';

import './App.css';

export default class App extends Component {

  state = {
    authenticated: false,
    id: -1
  }

  constructor(props) {
    super(props);
    if (window.location.search.startsWith('?jwt=')) {
      const token = window.location.search.slice(5);
      //console.log(token);
      window.localStorage.setItem('whats-tweeting-jwt', token);
      const payload = jwt(token);
      //console.log(payload);
      const id = payload.id;
      window.history.pushState({id:id}, 'loggedIn', '/');
      this.state = {id: id, authenticated: true};
    } else if (!this.state.authenticated) {
      const token = window.localStorage.getItem('whats-tweeting-jwt');
      if (token) {
        const payload = jwt(token);
        const id = payload.id;
        this.state = {id: id, authenticated: true};
      }
    }
  }

  logOut() {
    this.setState({authenticated: false, id: -1});
  }


  render() {
    return (
      <Router>
        <div id="logged-in-pond">
          <div id="menu">
            <div>
              <img alt="" src={'images/logo.png'} />
            </div>

            <ul>
              <li className="parent-menu">
                <input type="checkbox" name="item" id="item1" />
                <label htmlFor="item1">Word Clouds</label>
                <ul className="sub-menu">
                  <li><Link to={`/searchWordClouds/${this.state.id}`}>Search</Link></li>
                  <li><Link to={`/generateWordClouds/${this.state.id}`}>Generate</Link></li>
                </ul>
              </li>
              <li className="parent-menu">
                <input type="checkbox" name="item" id="item2" />
                <label htmlFor="item2">My Profile</label>
                <ul className="sub-menu">
                  <li><Link to={`/profile/${this.state.id}`}>View Saved</Link></li>
                </ul>
              </li>
			  <li className="parent-menu">
                <input type="checkbox" name="item" id="item3" />
                <li><Link to={`/help`}><label htmlFor="item4">Help</label></Link></li>
              </li>
              <li className="parent-menu">
                <input type="checkbox" name="item" id="item4" />
                {this.state.authenticated ? (<Link to={`/logout`}><label htmlFor="item3">Log Out</label></Link>) : (<Link to={`/login`}><label htmlFor="item4">Log In</label></Link>)}
              </li>
            </ul>

          </div>

          <div id="container">
            <Route exact path='/' render={(props) => {
              return this.state.authenticated ? (<Home/>) : (<Redirect to='/login'/>)
            }} />
            <Route path='/login' component={Login}/>

            <Route path='/searchWordClouds/:id' render={(props) => {
              return this.state.authenticated ? (<WordCloudsSearch {...props}/>) : (<Redirect to='/login'/> )
            }} />
            <Route path='/generateWordClouds/:id' render={(props) => {
              return this.state.authenticated ? (<WordCloudsGenerate {...props}/>) : (<Redirect to='/login'/>)
            }} />
            <Route path='/profile/:id' render={(props) => {
              return this.state.authenticated ? (<ProfileClouds {...props}/>) : (<Redirect to='/login'/>)
            }} />
			<Route path='/help' render={() => {
              return this.state.authenticated ? (<Help />) : (<Redirect to='/login'/> )
            }} />
            <Route path='/wordcloud/:id' component={ResultPage} />
            <Route exact path='/logout' render={() => {
              this.logOut();
              return <Redirect to='/login'/>
            }}/>
          </div>
        </div>
      </Router>
    );
  }
}

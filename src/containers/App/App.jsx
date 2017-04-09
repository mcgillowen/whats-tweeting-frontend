import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import jwt from 'jwt-decode';

import Home from '../Home/Home.jsx';
import Login from '../Login/Login.jsx';
import WordCloudsGenerate from '../WordCloudsGenerate/WordCloudsGenerate.jsx';
import WordCloudsSearch from '../WordCloudsSearch/WordCloudsSearch.jsx';
import ProfileClouds from '../ProfileClouds/ProfileClouds.jsx';

import './App.css';

export default class App extends Component {

	state = {
		authenticated: true,
		id: 271179985
	}

  constructor(props) {
    super(props);
    if (window.location.search !== ""){
      const token = window.location.search.slice(5);
      console.log(token);
      const payload = jwt(token);
      console.log(payload);
      const id = payload.id;
      window.location.search = "";
      this.state = {id: id, authenticated: true};
    }
  }

	changeAuth = (e) => {
		this.setState({authenticated: !this.state.authenticated});
	};

  Authenticate = (props) => {
    const token = props.location.search.slice(5);
    console.log(token);
    const payload = jwt(token);
    console.log(payload);
    const id = payload.id;
    this.setState({id: id, authenticated: true});
    //return <Redirect to='/' />
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
									<li><Link to={`/searchWordClouds/${this.state.id}`}>Search</Link></li>
									<li><Link to={`/generateWordClouds/${this.state.id}`}>Generate</Link></li>
								</ul>
							</li>
							<li><a href="#">About</a></li>
							<li><a>My Profile</a>
								<ul>
									<li><Link to={`/profile/${this.state.id}`}>View Saved</Link></li>
								</ul>
							</li>
							<li><a href="#">Help</a></li>
							<li><Link to={`/logout`}>Log Out</Link></li>
						</ul>
					</div>

					<div id="container">
						<Route exact path='/' render={(props) => {
              //this.Authenticate(props);
              //<Redirect to='/login'/>
						  return this.state.authenticated ? (<Home/>) : (<Redirect to='/login'/>)
						}}/>
						<Route path='/login' component={Login}/>
						<Route path='/searchWordClouds/:id' component={WordCloudsSearch} />
						<Route path='/generateWordClouds/:id' component={WordCloudsGenerate} />
						<Route path='/profile/:id' component={ProfileClouds} />
            <Route strict path='/?jwt=:token' render={this.Authenticate} />
						<Route exact path='/logout' render={() => {
							return <Redirect to='/login'/>
						}}/>
					</div>
				</div>
			</Router>
		);
	}
}

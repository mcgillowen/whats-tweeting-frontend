import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import Home from '../Home/Home.jsx';
import Login from '../Login/Login.jsx';
import WordCloudsGenerate from '../WordCloudsGenerate/WordCloudsGenerate.jsx';
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
							
						<button onClick={this.changeAuth}>Click me</button>
					</div>

					<div id="container">
						<Route exact path='/' render={(match) => {
						  return this.state.authenticated ? (<Home/>) : (<Redirect to='/login'/>)
						}}/>
						<Route path='/login' component={Login}/>
						<Route path='/generateWordClouds/:id' component={WordCloudsGenerate} />
						<Route path='/profile/:id' component={ProfileClouds} />
						<Route exact path='/logout' render={() => {
						  return <Redirect to='/login'/>
						}}/>
					</div>
				</div>
			</Router>
		);
	}
}
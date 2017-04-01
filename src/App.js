import React, { Component } from 'react';

class App extends Component {
	render() {
      return (
         <div id="pond">
			<div>
				<img src={'images/logo.png'} className="img-responsive"/>
			</div>
			<form id="form" name="form" action="#" method="post">
				<div id="block">
					<label id="user" for="name">u</label>
					<input type="text" name="name" id="name" placeholder="Username" required/>
					<label id="pass" for="password">p</label>
					<input type="password" name="password" id="password" placeholder="Password" required />
					<input type="submit" id="submit" name="submit" value="a"/>
				</div>
				<div id="option"> 
					<p>What's Tweeting?</p> 
				</div>
			</form>
		</div>
      );
   }
}

export default App;

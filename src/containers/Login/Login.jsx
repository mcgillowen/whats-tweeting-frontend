import React, {Component} from 'react';
import './Login.css';

export default class Login extends Component {
	handleClick = (e) => {
		e.preventDefault();
		//console.log('The link was clicked. Time to deal with it.');
		window.location.href = `${window.location.origin}/request-token`;
		//window.location.href='https://whatstweeting.mybluemix.net/request-token';
	};

  render() {
    return (
		<div id="log-in-pond">
			<div>
				<h1>What's Tweeting?</h1>
			</div>

			<div>
				<button id="sign-in-with-twitter" onClick={this.handleClick}>
					<img alt="" src={'images/sign-in-with-twitter-gray.png'} />
				</button>
			</div>
		</div>
    );
  }
}

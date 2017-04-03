import React, {Component} from 'react';
import './Login.css';

export default class Login extends Component {

  render() {
    return (
      <div id="log-in-pond">
        <div>
          <img alt="" src={'images/logo.png'} />
        </div>
        <button id="sign-in-with-twitter">Sign in with Twitter</button>
        <div id="option">
            <p>What's Tweeting?</p>
        </div>
		  </div>
    );
  }


}

import React, {Component} from 'react';

import './Home.css';

export default class Home extends Component {

  render() {
    return (
      <div>
        <h1>Welcome to "What's Tweeting"</h1>
		<p><img alt="" src={'images/word-cloud.png'} className="home-image" /></p>
		<p>Using this web application, you will be able to generate Word Clouds from whichever Twitter account you wish to generate from. The Word Clouds will be graphical representations of word frequency that give greater prominence to words that appear more frequently in the tweets. The size of the font will be also determined by frequency. The Word Clouds will be able to be saved, and retrieved whenever needed. There is a way for you to discuss the Word Clouds with users. This application is also mobile accessible.</p>
		<p>Happy generating!</p>
      </div>
    );
  }
}

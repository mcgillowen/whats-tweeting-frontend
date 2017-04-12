import React, {Component} from 'react';
import ReactDisqusThread from 'react-disqus-thread';

export default class ResultPage extends Component {
	
	handleNewComment (comment) {
        console.log(comment.text);
    }
	
	render() {
		
		return (
		 <ReactDisqusThread
                shortname="whats-tweeting-1"
                identifier="whats-tweeting-result-page"
                title="What's Tweeting?"
                url="https://whats-tweeting-1.disqus.com/embed.js"
                onNewComment={this.handleNewComment}/>
		);
	}
}
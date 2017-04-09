import React, {Component} from 'react';
import Search from '../../components/SearchField/SearchField.jsx';
import SearchSlider from '../../components/SearchSlider/SearchSlider.jsx';
import GenerationResult from '../GenerationResult/GenerationResult.jsx';
import './WordCloudsGenerate.css';

export default class WordCloudsGenerate extends Component {

	state = {
		twitter_handle: '',
		time_scope: 400,
		result: null
	}

	updateTwitterHandle = (value) => {
		this.setState({twitter_handle: value});
	}

	updateTimeScope = (value) => {
		this.setState({time_scope: value});
	}

	generateWordCloud = (e) => {
		console.log(this.state);
		const userID = this.props.match.params.id;
		const numTweets = this.state.time_scope;
		const twitterHandle = this.state.twitter_handle;

		const url = 'https://whatstweeting.mybluemix.net/generateresults';
    const request = {
      method: 'POST',
      crossDomain: true,
      body: JSON.stringify({
        userID: userID,
				numTweets: numTweets,
				twitterHandle: twitterHandle
      }),
      headers: new Headers({
		    'Content-Type': 'text/plain'
	    })
    };

    fetch(url, request)
      .then(resp => {
        //console.log(resp);
        return resp.json();
      })
      .then(data => {
        //console.log(data);
        const result = JSON.parse(JSON.stringify(data));
        //console.log(clouds);
				this.setState({result: result});
      })
      .catch(err => {
        console.error(err);
      });


	}

	render() {

		let results = null;
		if (this.state.result) {
			results = <GenerationResult data={this.state.result} />;
		} else {
			results = <div className='results'></div>;
		}

		return (
			<div className='wcGenerate'>
				<div className='wcGenerate-header'>
					<h1>Generate New Word Cloud</h1>
				</div>

				<div className='wcGenerate-user'>
					<p>Twitter User</p>
					<Search cb={this.updateTwitterHandle}/>
				</div>

				<div className='wcGenerate-scope'>
					<p>Time Scope</p>
					<SearchSlider cb={this.updateTimeScope}/>
				</div>

				<button onClick={this.generateWordCloud}>
					Go
				</button>

				{results}
			</div>
		);
	};
}

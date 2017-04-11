import React, {Component} from 'react';
import Search from '../../components/SearchField/SearchField.jsx';
import SearchSlider from '../../components/SearchSlider/SearchSlider.jsx';
import GenerationResult from '../GenerationResult/GenerationResult.jsx';
import './WordCloudsGenerate.css';

export default class WordCloudsGenerate extends Component {

	state = {
		twitter_handle: '',
		time_scope: 400,
		result: null,
		displayResults: false
	}

	updateTwitterHandle = (value) => {
		this.setState({twitter_handle: value});
	}

	updateTimeScope = (value) => {
		this.setState({time_scope: value});
	}

	generateWordCloud = (e) => {
		const userID = this.props.match.params.id;
		const numTweets = this.state.time_scope;
		const twitterHandle = this.state.twitter_handle;

		const url = 'http://whatstweeting.mybluemix.net/generateresults';
    const request = {
      method: 'POST',
      body: JSON.stringify({
        userID: userID,
				numTweets: numTweets,
				twitterHandle: twitterHandle
      }),
      headers: new Headers({
		    'Content-Type': 'application/json'
	    })
    };

		console.log(request);

		this.setState({displayResults: true, result: null});
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
		if (this.state.displayResults) {
			console.log(this.state.result);
			results = <GenerationResult data={this.state.result} />;
		} else {
			results = <div className='results'></div>;
		}

		return (
			<div>
				<div className='wcGenerate-header'>
					<h1>Generate New Word Cloud</h1>
				</div>

				<div className='wcGenerate-user'>
					<p>Twitter User</p>
					<div className='wcGenerate'>
						<Search cb={this.updateTwitterHandle}/>
					</div>
				</div>

				<div className='wcGenerate-scope'>
					<p>Time Scope</p>
					<div className='wcGenerate'>
						<SearchSlider cb={this.updateTimeScope}/>
					</div>
				</div>

				<button onClick={this.generateWordCloud}>
						Go
				</button>

				{results}
			</div>
		);
	};
}

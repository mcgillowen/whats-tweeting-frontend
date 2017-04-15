import React, {Component} from 'react';

import Search from '../../components/SearchField/SearchField.jsx';
import WordCloudCard from '../../components/WordCloudCard/WordCloudCard.jsx'

//import {serverURL} from '../../config.js';

import './WordCloudsSearch.css';

export default class WordCloudsSearch extends Component {

  state = {
    searchHandle: '',
    results: null
  };

  searchCallback = (handle) => {
    this.setState({searchHandle: handle});
  };

  handleSearch = (e) => {

    //console.log("Starting search");

    const url = `${window.location.origin}/getcloudstwitter`;
    //const url = 'http://whatstweeting.mybluemix.net/getcloudstwitter';
    const request = {
      method: 'POST',
      body: JSON.stringify({
				twitterHandle: this.state.searchHandle
      }),
      headers: new Headers({
		    'Content-Type': 'application/json'
	    })
    };

    fetch(url, request)
      .then(resp => {
        console.log(resp);
        return resp.json();
      }).then(data => {
        console.log(data);
        this.setState({results: data.urls});
      }).catch(err => {
        console.error(err);
      });

    console.log("Finished searching");
  }

  render() {

    let result = <p>No results yet</p>;
    if (this.state.results) {
      result = this.state.results.map((url, index) => {
        return (<WordCloudCard key={index} path={url} />);
      });
    }

    return (
      <div>
        <div className='word-clouds-search'>
          <h1>Search Archives</h1>
          <div className='search'>
			      <p>Twitter User</p>
            <Search cb={this.searchCallback} />
          </div>

          <button onClick={this.handleSearch}>
					  Go
				  </button>

          <div className='search-results'>
            <h1>Search results</h1>
            <div className='results'>
              {result}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

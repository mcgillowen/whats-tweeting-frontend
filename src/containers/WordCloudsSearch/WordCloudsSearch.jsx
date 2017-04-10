import React, {Component} from 'react';

import Search from '../../components/SearchField/SearchField.jsx';

//import {serverURL} from '../../config.js';

import './WordCloudsSearch.css';

export default class WordCloudsSearch extends Component {

  state = {
    searchHandle: ''
  };

  searchCallback = (handle) => {
    this.setState({searchHandle: handle});
  };

  handleSearch = (e) => {

    console.log("Starting search");

    const url = 'https://whatstweeting.mybluemix.net/getcloudstwitter';
    const request = {
      method: 'POST',
      crossDomain: true,
      body: JSON.stringify({
				twitterHandle: this.state.searchHandle
      }),
      headers: new Headers({
		    'Content-Type': 'text/plain'
	    })
    };

    fetch(url, request)
      .then(resp => {
        console.log(resp);
        return resp.json();
      }).then(data => {
        console.log(data);
      }).catch(err => {
        console.error(err);
      });

    console.log("Finished searching");
  }

  render() {
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

          </div>
        </div>
      </div>
    );
  }

}

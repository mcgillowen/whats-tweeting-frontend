import React, {Component} from 'react';

import Search from '../../components/SearchField/SearchField.jsx';

import {serverURL} from '../../config.js';

import './WordCloudsSearch.css';

export default class WordCloudsSearch extends Component {

  state = {
    searchHandle: ''
  };

  searchCallback = (handle) => {
    this.setState({searchHandle: handle});
  };

  handleSearch = (e) => {

    const request = {
      method: 'POST',
      body: JSON.stringify({
        twitter_handle: this.state.searchHandle
      })
    };

    fetch(`${serverURL}/getcloudstwitter`, request).then(response => {
      console.log(response.json());
    });

  }

  render() {
    return (
      <div>
        <div className='word-clouds-search'>
          <h1>Search for Word Clouds</h1>
          <div className='search'>
            <Search cb={this.searchCallback} />
          </div>
        </div>
        <div className='search-results'>
          <h1>Search results</h1>
          <div className='results'>

          </div>
        </div>
      </div>
    );
  }

}

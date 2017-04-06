import React, {Component} from 'react';

import Search from '../../components/SearchField/SearchField.jsx';

import './WordCloudsSearch.css';

export default class WordCloudsSearch extends Component {


  render() {
    return (
      <div className='word-clouds-search'>
        <h1>Search for Word Clouds</h1>
        <div className='search'>
          <Search />
        </div>
      </div>
    );
  }

}

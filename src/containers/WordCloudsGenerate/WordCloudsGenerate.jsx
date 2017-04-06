import React, {Component} from 'react';

export default class WordCloudsGenerate extends Component {

  render() {
    return (
      <div>
        <div className='wcGenerate-header'>
          <h1>{this.props.headerName}</h1>
        </div>
      </div>
    );
  };
}

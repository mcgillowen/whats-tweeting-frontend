import React, {Component} from 'react';

export default class WordCloudCard extends Component {

  render() {
    console.log(this.props);
    return (
      <div className='word-cloud-card'>
        <h2>{this.props.username}</h2>
        <img src={this.props.path} alt={this.props.username}/>
      </div>
    );
  };
}

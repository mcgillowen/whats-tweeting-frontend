import React, {Component} from 'react';
import WordCloudCard from '../../components/WordCloudCard/WordCloudCard.jsx';

export default class ProfileClouds extends Component {

  render() {
    return (
      <div className='profile-view'>
        <div className='profile-header'>
          <h1>{this.props.headerName}</h1>
        </div>
        <div>
          {this.props.clouds.map(cloud => <WordCloudCard path={cloud.path} username={cloud.username} />)}
        </div>
      </div>
    );
  };
}

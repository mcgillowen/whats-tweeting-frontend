import React, {Component} from 'react';
import WordCloudCard from '../../components/WordCloudCard/WordCloudCard.jsx';

export default class ProfileClouds extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: props.match.params.id,
      clouds: []
    };

    this.getClouds();

  }

  getClouds() {

    const url = 'https://whatstweeting.mybluemix.net/getResultsUser';
    const request = {
      method: 'POST',
      crossDomain: true,
      body: JSON.stringify({
        userID: this.state.userID
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
        const clouds = JSON.parse(JSON.stringify(data));
        //console.log(clouds);
        this.setState({ clouds: clouds});
      })
      .catch(err => {
        console.error(err);
      });

  }

  render() {
    return (
      <div className='profile-view'>
        <div className='profile-header'>
          <h1>{this.state.userID}</h1>
        </div>
        <div>
          {this.state.clouds.map((cloud, index) => {
            const cloudValue = JSON.parse(cloud);
            //console.log(cloudValue);
            return <WordCloudCard key={index} path={cloudValue.resultsURL} username={cloudValue.twitterHandle} />
          })}
        </div>
      </div>
    );
  };
}

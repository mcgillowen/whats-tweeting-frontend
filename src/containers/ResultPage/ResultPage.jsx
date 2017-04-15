import React, {Component} from 'react';
import Disqus from 'react-disqus-comments';
import WordCloudCard from '../../components/WordCloudCardNoLink/WordCloudCardNoLink.jsx';

export default class ResultPage extends Component {

  constructor(props) {
    super(props);
    this.state = {id: props.match.params.id};
  }

  componentDidMount() {
    const url = `${window.location.origin}/getresults`;
    //const url = 'http://whatstweeting.mybluemix.net/getresults';
    const request = {
      method: 'POST',
      body: JSON.stringify({
        resultsID: this.state.id
      }),
      headers: new Headers({
		    'Content-Type': 'application/json'
	    })
    };

    fetch(url, request)
      .then(resp => {
        return resp.json()
      })
      .then(data => {
        this.setState({path: data.resultsURL})
      });
  }

  handleNewComment (comment) {
    console.log(comment.text);
  }

  render() {

    return (
      <div>
        <WordCloudCard path={this.state.path} />

        <Disqus
          shortname="whats-tweeting-1"
          identifier={`${this.state.id}`}
          title="What's Tweeting?"
          onNewComment={this.handleNewComment}/>
      </div>
    );
  }
}

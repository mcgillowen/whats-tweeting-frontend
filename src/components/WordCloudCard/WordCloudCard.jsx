import React, {Component} from 'react';

export default class WordCloudCard extends Component {

  state = {
    url: '',
    svg: '',
    profile: null
  }

  constructor(props) {
    super(props);
    const url = `${props.path}.json`;

    this.state = {
      url: url,
      svg: '',
      profile: null
    }

  }

  componentDidMount() {

    fetch(this.state.url, {method: 'GET'})
      .then(resp => {
        return resp.json();
      }).then(data => {
        console.log(data);
        this.setState({svg: data.wordcloud, profile: data.profile});
      });

  }


  render() {
    return (
      <div className='word-cloud-card'>
        <h2>{this.props.username}</h2>
        <div dangerouslySetInnerHTML={{__html: this.state.svg}}></div>
      </div>
    );
  };
}

import React, {Component} from 'react';
import ProfileText from '../ProfileText/ProfileText.jsx';

export default class WordCloudCard extends Component {

  state = {
    svg: '',
    profile: [],
    display: false
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const url = `${nextProps.path}.json`;

    console.log(url);
    fetch(url, {method: 'GET'})
      .then(resp => {
        return resp.json();
      }).then(data => {
        console.log(data);
        if (data.code === 404) {
          this.setState({display: false});
        } else {
          this.setState({svg: data.wordcloud, profile: data.profile, display: true});
        }
      }).catch(err => {
        this.setState({display: false});
      });
  }


  render() {

    let element = null;
    if (this.state.display) {
      element = (<div>
                    <div dangerouslySetInnerHTML={{__html: this.state.svg}}></div>
                    <ProfileText data={this.state.profile} />
                </div>);
    } else {
      element = (<p style={{display: 'none'}}></p>);
    }

    return (
      <div>
        {element}
      </div>
    );
  };
}

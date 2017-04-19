import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ProfileText from '../ProfileText/ProfileText.jsx';

export default class WordCloudCard extends Component {

  state = {
    svg: '',
    profile: [],
    display: false
  }

  componentDidMount() {
    const url = `${this.props.path}.json`;

    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 1].split('.')[0];
    console.log(id);

    this.setState({id: id});

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
                  <Link to={`/wordcloud/${this.state.id}`}>
                    <h2>{this.props.twitter}</h2>
                    <div dangerouslySetInnerHTML={{__html: this.state.svg}}></div>
                  </Link>
                  <ProfileText data={this.state.profile} />
                </div>
                );
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

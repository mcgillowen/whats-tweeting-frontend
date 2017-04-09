import React, {Component} from 'react';

export default class GenerationResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: props.data.profile,
      svg: props.data.wordcloud
    }
  }


  render() {
    return (
      <div className='results' dangerouslySetInnerHTML={{__html: this.state.svg}}></div>
    );
  }
}

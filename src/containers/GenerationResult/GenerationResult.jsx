import React, {Component} from 'react';

import Loading from '../../../public/images/loading.gif';

export default class GenerationResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      svg: '',
      displayLoading: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== null && nextProps.data.wordcloud !== this.state.svg) {
      this.setState({
        profile: nextProps.data.profile,
        svg: nextProps.data.wordcloud,
        displayLoading: false
      });
    } else {
      this.setState({displayLoading: true});
    }
  }


  render() {

    let display = null;
    if (this.state.displayLoading) {
      display = <div className='results'><img src={Loading} alt='Loading'></img></div>;
    } else {
      display = <div className='results' dangerouslySetInnerHTML={{__html: this.state.svg}}></div>;
    }

    return (
      <div>
        {display}
      </div>
    );
  }
}

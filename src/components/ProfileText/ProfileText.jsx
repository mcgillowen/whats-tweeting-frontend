import React, {Component} from 'react';
import textSummary from '../../textsummary.js';


export default class ProfileText extends Component {

  state = {
    paragraphs: []
  }

  componentDidMount() {
    const data = this.props.data;
    console.log(data);
    textSummary.init();
    const paragraphs = textSummary.assemble(data.tree);
    console.log(paragraphs);
    this.setState({paragraphs: paragraphs});
  }

  render() {

    return(
      <div className='summaryDiv'>
        {this.state.paragraphs.map((sentences, index) => {
          return (<p key={index}>{sentences.join(' ')}</p>);
        })}
      </div>
    );
  }


}
